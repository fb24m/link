'use client'
import { useRouter } from 'next/navigation'
import { AllHTMLAttributes } from 'react'

export const Link = (props: AllHTMLAttributes<HTMLHyperlinkElementUtils>) => {
  const { push, prefetch } = useRouter()

  return (
    <a
      {...props}
      onClick={(e) => {
        e.preventDefault()

        if ('startViewTransition' in document) {
          document
            .startViewTransition(() => {
              document.body.style.opacity = '0'
              push(props.href ?? '')
            })
            .finished.then(() => {
              document.body.style.opacity = '1'
            })
        } else {
          push(props.href ?? '')
        }
      }}
      onMouseEnter={() => {
        prefetch(props.href ?? '')
      }}
    ></a>
  )
}
