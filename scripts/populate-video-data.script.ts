import { google } from 'googleapis'
import { getEnvVariable } from '../src/utils/get-env-variable.utils'
import { VIDEO_CATEGORIES } from '../src/constants/video-categories.constants'
import type { youtube_v3 } from 'googleapis'
import type { Category } from '../src/constants/video-categories.constants'
import type { Video, Channel } from '@prisma/client'

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
    video_details: youtube_v3.Schema$Video,
    categoryId: string
  ): Video {
    const videoId = video_details.id!
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const videoSnippet = video_details.snippet!
    const videoStatistics = video_details.statistics!
    const videoThumbnail_url = this.getHighestResThumbnailUrl(
      videoSnippet.thumbnails!
    )

    return {
      videoId: videoId,
      url: videoUrl,
      title: videoSnippet.title!,
      categoryId: categoryId,
      description: videoSnippet.description!,
      publishedAt: new Date(videoSnippet.publishedAt!),
      channelId: videoSnippet.channelId!,
      channelTitle: videoSnippet.channelTitle!,
      thumbnailUrl: videoThumbnail_url,
      viewsCount: Number(videoStatistics.viewCount!),
      likesCount: Number(videoStatistics.likeCount!),
      commentsCount: Number(videoStatistics.commentCount),
    }
  }

  private async fetchVideoDetails(
    video_id: string
  ): Promise<youtube_v3.Schema$Video> {
    const response = await this.youtube.videos.list({
      part: ['snippet', 'statistics'],
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
        q: categoryValue,
        type: ['video'],
        videoCaption: 'closedCaption',
        videoDefinition: 'high',
        videoDimension: '2d',
        videoEmbeddable: 'true',
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

    const channel = items[0]
    const channelSnippet = channel.snippet!
    const channelStatistics = channel.statistics!

    return {
      channelId: channelId,
      url: `https://www.youtube.com/channel/${channelId}`,
      title: channelSnippet.title!,
      videosCount: 0,
      description: channelSnippet.description!,
      publishedAt: new Date(channelSnippet.publishedAt!),
      thumbnailUrl: channelSnippet.thumbnails!.high!.url!,
      viewsCount: Number(channelStatistics.viewCount!),
      subscribersCount: Number(channelStatistics.subscriberCount!),
    }
  }

  private async fetchAndStoreChannelData(channelId: string): Promise<Channel> {
    // If the channel data is already fetched, return it.
    if (this.channels_data[channelId]) {
      this.channels_data[channelId].videosCount++
      return this.channels_data[channelId]
    }

    // Fetch channel details from YouTube API.
    const channelData = await this.fetchChannel(channelId)

    // Store the channel data in the local cache.
    this.channels_data[channelId] = channelData

    return channelData
  }

  // Public methods
  public async fetchVideosByCategories(
    categories: Category,
    maxResultsPerCategory: number = 10
  ): Promise<Video[]> {
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

    return uniqueVideos
  }

  public getData(): { videos: Video[]; channels: Channel[] } {
    return {
      videos: this.videos_data,
      channels: Object.values(this.channels_data),
    }
  }
}

async function main() {
  const API_KEY = getEnvVariable('GOOGLE_API_KEY')
  const youtubeData = new YoutubeDataRetriever(API_KEY)

  // Define your categories
  const categories = VIDEO_CATEGORIES

  // Fetch videos
  await youtubeData.fetchVideosByCategories(categories, 1)
  console.log(youtubeData.getData())
}

main()
