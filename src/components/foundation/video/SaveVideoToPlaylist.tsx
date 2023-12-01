'use client'

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Skeleton,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import {
  addVideoToPlaylist,
  createPlaylist,
  removeVideoFromPlaylist,
} from '@services/API'
import { fetcher } from '@utils/fetcher.utils'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import useSWR from 'swr'
import type {
  CreatePlaylistRequest,
  PlaylistDetails,
  VideoExistResponse,
} from 'types'

const CreatePlaylistForm = ({
  userEmail,
  videoId,
  onPress,
}: {
  userEmail: string
  videoId: string
  onPress?: () => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreatePlaylistRequest>({ mode: 'onChange' })

  // Handle form submission
  const onSubmit: SubmitHandler<CreatePlaylistRequest> = async (
    formData: CreatePlaylistRequest
  ) => {
    const data: CreatePlaylistRequest = {
      ...formData,
      userEmail,
      videoId,
    }

    // Login onSubmit
    const res = await createPlaylist(data)

    if (res && res.error) {
      toast.error('An error ocurred while creating the playlist.')
    } else {
      toast.success('Playlist was created successfully.')

      if (onPress) onPress()
    }
  }

  return (
    <form
      id="playlist-creation-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 md:space-y-6"
    >
      <Input
        id="name"
        isRequired
        variant="underlined"
        label="Name"
        type="text"
        fullWidth
        placeholder="Enter playlist title"
        isInvalid={Boolean(errors.playlist?.name)}
        errorMessage={errors.playlist?.name?.message}
        {...register('playlist.name', {
          required: {
            value: true,
            message: 'Playlist name is required.',
          },
          minLength: {
            value: 2,
            message: 'Playlist name must be at least 2 characters long.',
          },
          maxLength: {
            value: 20,
            message: 'Playlist name must be less than 20 characters.',
          },
        })}
      />
      <Input
        id="description"
        label="Description"
        variant="underlined"
        type="text"
        fullWidth
        placeholder="Enter playlist description"
        isInvalid={Boolean(errors.playlist?.description)}
        errorMessage={errors.playlist?.description?.message}
        {...register('playlist.description', {
          maxLength: {
            value: 150,
            message: 'Playlist description must be less than 150 characters.',
          },
        })}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        fullWidth
        color="primary"
      >
        Create
      </Button>
    </form>
  )
}

const SaveToPlaylistButton = ({
  name,
  videoId,
  playlistId,
}: {
  name: string
  videoId: string
  playlistId: string
}) => {
  const { data, error, isLoading, mutate } = useSWR<VideoExistResponse>(
    `/api/user/playlist/videos/is_video_in_playlist?videoId=${videoId}&playlistId=${playlistId}`,
    fetcher
  )

  if (error) return null
  if (isLoading) {
    // Show loader while data is loading
    return (
      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="w-5 h-5 rounded-md" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
    )
  }
  if (!data) return null

  const handleCheckboxChange = async () => {
    // Optimistically update UI
    mutate({ ...data, videoExists: !data.videoExists }, false)

    try {
      if (data.videoExists) {
        // If video is in playlist, remove it
        await removeVideoFromPlaylist(playlistId, videoId)
        toast.success('Video removed from playlist')
      } else {
        // If video is not in playlist, add it
        await addVideoToPlaylist(playlistId, videoId)
        toast.success('Video added to playlist')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred')
      // Revert optimistic update in case of error
      mutate({ ...data, videoExists: data.videoExists }, false)
    }
  }

  return (
    <Checkbox
      defaultChecked={data.videoExists}
      isSelected={data.videoExists}
      onValueChange={handleCheckboxChange}
    >
      {name}
    </Checkbox>
  )
}

interface SaveVideoToPlaylistProps {
  userEmail: string
  videoId: string
  userPlaylists: PlaylistDetails[]
}

export const SaveVideoToPlaylist = ({
  userEmail,
  videoId,
  userPlaylists,
}: SaveVideoToPlaylistProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [openCreatePlaylistForm, setOpenCreatePlaylistForm] = useState(false)

  return (
    <>
      <Tooltip
        color="foreground"
        delay={0}
        closeDelay={0}
        content="Save video to playlist"
      >
        <Button
          color="primary"
          radius="full"
          startContent={<AiOutlinePlusSquare />}
          variant={'solid'}
          onPress={onOpen}
        >
          Save
        </Button>
      </Tooltip>

      <Modal
        size="xs"
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Save video to playlist
              </ModalHeader>
              <ModalBody>
                {/* Checkbox to add video to playlist */}
                <ScrollShadow
                  hideScrollBar
                  className="flex flex-col gap-4 h-[150px]"
                >
                  {userPlaylists.map((playlist) => (
                    <SaveToPlaylistButton
                      key={playlist.id}
                      name={playlist.name}
                      videoId={videoId}
                      playlistId={playlist.id}
                    />
                  ))}
                </ScrollShadow>
              </ModalBody>
              <ModalFooter className="justify-center">
                {openCreatePlaylistForm ? (
                  <CreatePlaylistForm
                    userEmail={userEmail}
                    videoId={videoId}
                    onPress={() => {
                      onClose()
                      setOpenCreatePlaylistForm(false)
                    }}
                  />
                ) : (
                  <Button
                    color="primary"
                    fullWidth
                    startContent={<BsPlusLg />}
                    onPress={() => {
                      setOpenCreatePlaylistForm(true)
                    }}
                  >
                    Create new playlist
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

// Display name
SaveVideoToPlaylist.displayName = 'SaveVideoToPlaylist'
