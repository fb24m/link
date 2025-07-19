import { Post, User } from '@prisma/client'

export interface PostProps {
  author?: User
  authorAvatarUrl?: string | undefined
  imageUrl?: string | undefined
  controls?: boolean | undefined
  full?: boolean | undefined
  restore?: boolean | undefined
  likes?: number | undefined
  // self?: User
  post: Post
}
