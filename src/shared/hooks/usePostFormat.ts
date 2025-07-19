import { useMarked } from '@/hooks/useMarked'
import { useEffect, useState } from 'react'

export const usePostFormat = (content: string): string => {
  const [post, setPost] = useState<string | null | undefined>(null)
  const marked = useMarked(content)

  useEffect(() => {
    let prePost = marked
      ?.split('<table>')
      .join('<div><table>')
      .split('</table>')
      .join('</div></table>')

    const usernames = prePost?.match(/@\w+/gm)

    usernames?.forEach((username) => {
      prePost = prePost
        ?.split(username)
        .join(`<a href="/user/${username.split('@')[1]}">${username}</a>`)
    })

    setPost(prePost)
  }, [marked])

  return post ?? ''
}
