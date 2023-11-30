'use client'

import { Button, Input, Textarea } from '@nextui-org/react'
import { updateUserProfile } from '@services/API'
import { useSession } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import type { UpdatedProfile } from 'types'
import { EditAvatar } from './foundation'

interface EditProfileFormProps extends UpdatedProfile {
  userEmail: string
}

export const EditProfileForm = ({
  userEmail,
  firstName,
  lastName,
  bio,
  avatar,
}: EditProfileFormProps) => {
  const { update } = useSession()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<UpdatedProfile>({ mode: 'onChange' })

  // Handle form submission
  const onSubmit: SubmitHandler<UpdatedProfile> = async (
    data: UpdatedProfile
  ) => {
    try {
      // Update user profile
      await updateUserProfile(userEmail, data)
      toast.success('Profile updated successfully.')
      update()
    } catch (err) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-6 pb-12"
    >
      {/* Inputs container */}
      <div className="flex flex-col items-center w-full gap-8">
        {/* Avatar */}
        <Controller
          name="avatar"
          control={control}
          defaultValue={avatar}
          render={({ field }) => (
            <EditAvatar
              avatar={field.value}
              onChange={(avatar) => field.onChange(avatar)}
            />
          )}
        />

        {/* First and Last name input */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-6 w-full">
          <Input
            id="firstName"
            type="text"
            autoComplete="given-name"
            size="lg"
            variant="bordered"
            placeholder="Enter First Name"
            defaultValue={firstName}
            label="First Name"
            labelPlacement="outside"
            isInvalid={Boolean(errors.firstName)}
            errorMessage={errors.firstName?.message}
            {...register('firstName', {
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters long.',
              },
              maxLength: {
                value: 20,
                message: 'First name must be less than 20 characters.',
              },
            })}
          />
          <Input
            id="lastName"
            type="text"
            autoComplete="family-name"
            size="lg"
            variant="bordered"
            placeholder="Enter Last Name"
            defaultValue={lastName}
            label="Last Name"
            labelPlacement="outside"
            isInvalid={Boolean(errors.lastName)}
            errorMessage={errors.lastName?.message}
            {...register('lastName', {
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters long.',
              },
              maxLength: {
                value: 20,
                message: 'Last name must be less than 20 characters.',
              },
            })}
          />
        </div>

        {/* Bio */}
        <Textarea
          id="bio"
          variant="bordered"
          label="Bio"
          size="lg"
          labelPlacement="outside"
          placeholder="Enter your bio"
          defaultValue={bio || ''}
          // className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          isInvalid={Boolean(errors.bio)}
          errorMessage={errors.bio?.message}
          {...register('bio', {
            maxLength: {
              value: 250,
              message: 'Bio must be less than 250 characters.',
            },
          })}
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        fullWidth
        color="primary"
      >
        Save
      </Button>
    </form>
  )
}

// Display Name
EditProfileForm.displayName = 'EditProfileForm'
