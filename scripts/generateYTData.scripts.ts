import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
import { getEnvVariable } from '../src/utils/getEnvVariable.utils'
import { VIDEO_CATEGORIES } from '../src/constants/videoCategories.constants'
import type { youtube_v3 } from 'googleapis'
import type { Category } from '../src/constants/videoCategories.constants'
import type { Video, Channel } from '@prisma/client'

interface YouTubeData {
  videos: Video[]
  channels: Channel[]
}

// YouTube Data Retriever class for fetching data from YouTube API
class YoutubeDataRetriever {
  private youtube: youtube_v3.Youtube
  private videos_data: Video[] = []
  private channels_data: Record<string, Channel> = {}

  // Constructor
  constructor(apiKey: string) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: apiKey,
    })
  }

  // Private methods
  private getHighestResThumbnailUrl(
    thumbnailData: youtube_v3.Schema$ThumbnailDetails
  ): string {
    const preferredOrder: (keyof youtube_v3.Schema$ThumbnailDetails)[] = [
      'maxres',
      'high',
      'medium',
      'standard',
      'default',
    ]

    for (const res of preferredOrder) {
      if (thumbnailData[res]) {
        return thumbnailData[res]!.url!
      }
    }

    return ''
  }

  private parseVideoData(
    videoDetails: youtube_v3.Schema$Video,
    categoryId: string
  ): Video {
    const videoId = videoDetails.id!
    const videoSnippet = videoDetails.snippet!
    const videoStatistics = videoDetails.statistics!

    return {
      videoId: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: videoSnippet.title!,
      categoryId: categoryId,
      duration: videoDetails.contentDetails!.duration!,
      description: videoSnippet.description!,
      publishedAt: new Date(videoSnippet.publishedAt!),
      channelId: videoSnippet.channelId!,
      channelTitle: videoSnippet.channelTitle!,
      thumbnailUrl: this.getHighestResThumbnailUrl(videoSnippet.thumbnails!),
      viewsCount: Number(videoStatistics.viewCount!) | 0,
      likesCount: Number(videoStatistics.likeCount!) | 0,
      commentsCount: Number(videoStatistics.commentCount) | 0,
    }
  }

  private parseChannelData(channelDetails: youtube_v3.Schema$Channel): Channel {
    const channelId = channelDetails.id!
    const channelSnippet = channelDetails.snippet!
    const channelStatistics = channelDetails.statistics!

    return {
      channelId: channelId,
      url: `https://www.youtube.com/channel/${channelId}`,
      title: channelSnippet.title!,
      description: channelSnippet.description!,
      publishedAt: new Date(channelSnippet.publishedAt!),
      thumbnailUrl: channelSnippet.thumbnails!.high!.url!,
      viewsCount: Number(channelStatistics.viewCount!),
      subscribersCount: Number(channelStatistics.subscriberCount!),
    }
  }

  private async fetchVideoDetails(
    video_id: string
  ): Promise<youtube_v3.Schema$Video> {
    const response = await this.youtube.videos.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: [video_id],
    })

    const items = response.data.items
    if (!items || items.length === 0) {
      throw new Error(`Video with ID ${video_id} not found.`)
    }

    return items[0]
  }

  private async fetchAndProcessVideo(
    categoryKey: string,
    categoryValue: string,
    maxResultsPerCategory: number
  ): Promise<Video[]> {
    try {
      // Fetch videos
      const response = await this.youtube.search.list({
        part: ['snippet'],
        maxResults: maxResultsPerCategory,
        q: `${categoryValue} full course for computer science students`,
        type: ['video'],
        videoCaption: 'closedCaption',
        videoDefinition: 'high',
        videoDimension: '2d',
        topicId: '/m/01k8wb', // Knowledge
        relevanceLanguage: 'en',
        videoEmbeddable: 'true',
        videoDuration: 'long',
      })

      const videos = (
        await Promise.all(
          (response.data.items ?? []).map(async (item) => {
            const videoId = item.id?.videoId
            if (
              videoId &&
              !this.videos_data.some((v) => v.videoId === videoId)
            ) {
              // Fetch video details
              const videoDetails = await this.fetchVideoDetails(videoId)
              const parsedVideoData = this.parseVideoData(
                videoDetails,
                categoryKey
              )

              // Fetch channel data
              await this.fetchAndStoreChannelData(
                videoDetails.snippet!.channelId!
              )

              // Push video data to local cache
              this.videos_data.push(parsedVideoData)

              // Parse the video data
              return parsedVideoData
            }
            return undefined
          })
        )
      ).filter((video): video is Video => video !== undefined) // Filter out undefined items

      return videos
    } catch (error) {
      console.error(
        `Failed to fetch videos for category ${categoryKey}:`,
        error
      )
      return []
    }
  }

  private async fetchChannel(channelId: string): Promise<Channel> {
    const response = await this.youtube.channels.list({
      part: ['snippet', 'statistics'],
      id: [channelId],
    })

    const items = response.data.items
    if (!items || items.length === 0) {
      throw new Error(`Channel with ID ${channelId} not found.`)
    }

    return this.parseChannelData(items[0])
  }

  private async fetchAndStoreChannelData(channelId: string): Promise<Channel> {
    // If the channel data is already fetched, return it.
    if (this.channels_data[channelId]) {
      return this.channels_data[channelId]
    }

    // Fetch channel details from YouTube API.
    const channelData = await this.fetchChannel(channelId)

    // Store the channel data in the local cache.
    this.channels_data[channelId] = channelData

    return channelData
  }

  // Public methods
  public async fetchYTDataByCategories(
    categories: Category,
    maxResultsPerCategory: number = 10
  ): Promise<YouTubeData> {
    const categoryPromises = Object.entries(categories).map(
      ([categoryKey, categoryValue]) =>
        this.fetchAndProcessVideo(
          categoryKey,
          categoryValue as string,
          maxResultsPerCategory
        )
    )

    const results = await Promise.allSettled(categoryPromises)
    const videos = results.flatMap((result) =>
      result.status === 'fulfilled' ? result.value : []
    )

    const uniqueVideos: Video[] = []
    const videoIds = new Set<string>()
    for (const video of videos) {
      if (!videoIds.has(video.videoId)) {
        uniqueVideos.push(video)
        videoIds.add(video.videoId)
      }
    }

    return {
      videos: uniqueVideos,
      channels: Object.values(this.channels_data),
    }
  }
}

// Helper functions for writing data to a file
function writeDataToFile(filePath: string, data: YouTubeData) {
  // Convert the data to a string
  const jsonData = JSON.stringify(data, null, 2)

  // Ensure the directory exists
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Write the data to a new file
  fs.writeFileSync(filePath, jsonData, 'utf-8')

  // Log the data
  console.log(`Data written to ${filePath}`)
  console.log('Data:', jsonData)
  console.log('\n')
  console.log('Total Data:')
  console.log('Total videos:', data.videos.length)
  console.log('Total channels:', data.channels.length)
}

async function main() {
  const API_KEY = getEnvVariable('GOOGLE_API_KEY')
  const youtubeDataRetriever = new YoutubeDataRetriever(API_KEY)

  // Define your categories
  const categories = VIDEO_CATEGORIES

  // Fetch videos
  const youtubeData = await youtubeDataRetriever.fetchYTDataByCategories(
    categories,
    10
  )
  if (!youtubeData) {
    console.error('Failed to fetch YouTube data.')
    return
  }

  // Write the data to a file
  const filePath = './gen/youtube_data.gen.json'
  writeDataToFile(filePath, youtubeData)
}

main()
