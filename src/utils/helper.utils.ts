import type { Playlist } from "@prisma/client"

export function getPlaylistId(playlists: Playlist[], name: string) : string {
  for (const playlist of playlists) {
    if(playlist.name == name) return playlist.id
  }
  return ""
}