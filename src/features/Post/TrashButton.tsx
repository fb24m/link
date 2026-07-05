'use client'

import { Button } from '@/shared/ui/Button/Button.component'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const TrashButton = ({ id, restore }: { id: number; restore: boolean }) => {
  const router = useRouter()

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ['delete_post'],
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleted: true }),
      })

      const json = await response.json()

      console.log(json)

      setTimeout(() => {
        router.refresh()
      }, 100)
    },
  })

  const { mutate: res, isPending: isRestoring } = useMutation({
    mutationKey: ['restore_post'],
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleted: false }),
      })

      const json = await response.json()

      console.log(json)

      setTimeout(() => {
        router.refresh()
      }, 100)
    },
  })

  return restore ? (
    <Button
      size="sm"
      onClick={() => res()}
      appearance="primary"
      icon="restore_from_trash"
      isLoading={isRestoring}
      loader="spinner"
    />
  ) : (
    <Button
      size="sm"
      onClick={() => mutate()}
      appearance="outlined"
      icon="delete"
      isLoading={isDeleting}
      loader="spinner"
    ></Button>
  )
}
