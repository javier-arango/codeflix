'use client'

import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'

interface FormValues {
  searchQuery: string
}

export const SearchBar = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    const { searchQuery } = data

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`/results?search_query=${encodedSearchQuery}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        classNames={{
          base: 'max-w-full max-w-[30rem] h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        radius="full"
        placeholder="Search"
        size="sm"
        startContent={<AiOutlineSearch size={24} />}
        type="search"
        {...register('searchQuery')}
      />
    </form>
  )
}

// Display name
SearchBar.displayName = 'SearchBar'
