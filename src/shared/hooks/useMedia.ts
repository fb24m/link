import { useEffect, useState } from 'react'

export const useMedia = (media: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const request = window.matchMedia(media)

    setMatches(request.matches)

    request.addEventListener('change', () => {
      setMatches(request.matches)
    })

    return () => {
      request.removeEventListener('change', () => {
        setMatches(request.matches)
      })
    }
  }, [])

  return matches
}
