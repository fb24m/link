'use client'

import { useEffect, useRef, type ReactElement } from 'react'

import styles from './Markdown.module.scss'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { clsx } from '@/functions/clsx'
import { usePostFormat } from '@/shared/hooks/usePostFormat'

export const Markdown = ({ children, className }: { children: string; className?: string }): ReactElement => {
  const post = usePostFormat(children)

  // const videos = post?.match(/&gt;\[.+\..+\/.+\.mp4\]/gm)

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toggleImage = (image: HTMLImageElement, type?: 'close' | 'open') => {
      image.style.opacity = '0'

      if (image.parentElement) {
        image.parentElement.style.height = image.clientHeight + 'px'
      }

      setTimeout(() => {
        if (type === 'close') {
          image.classList.remove('active')
        } else if (type === 'open') {
          image.classList.add('active')
        } else {
          image.classList.toggle('active')
        }

        image.style.opacity = '1'
      }, 300)
    }

    const callback = (e: MouseEvent) => {
      const target: HTMLImageElement = e.target as HTMLImageElement

      toggleImage(target)
    }

    if (post) {
      const images = container.current?.querySelectorAll('img')

      if (images && images.length > 0) {
        document.addEventListener('click', e => {
          if (!(e.target as HTMLElement)?.closest?.('img')) {
            images.forEach(img => {
              img.classList.remove('active')
            })
          }
        })

        images.forEach(img => {
          img.addEventListener('click', callback)
        })
      }
    }

    return () => {
      if (post) {
        const images = container.current?.querySelectorAll('img')

        if (images && images.length > 0) {
          images.forEach(img => {
            img.removeEventListener('click', callback)
          })

          document.removeEventListener('click', e => {
            if (!(e.target as HTMLElement)?.closest('img')) {
              images.forEach(img => {
                if (img.classList.contains('active')) {
                  toggleImage(img as HTMLImageElement)
                }
              })
            }
          })
        }
      }
    }
  }, [post, container.current])

  return post ? (
    <div ref={container} className={clsx(styles.markdown, className)} dangerouslySetInnerHTML={{ __html: post }}></div>
  ) : (
    <>
      <Skeleton width='100%' height={20} />
      <Skeleton width='100%' height={20} />
      <Skeleton width='100%' height={20} />
    </>
  )
}
