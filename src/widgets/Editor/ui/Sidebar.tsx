import { BackButton } from '@/components/BackButton'
import { User } from '../../../../generated/prisma/client'
import { Button } from '@/shared/ui/Button/Button.component'
import { exists } from '@/shared/utils/exists'
import { Post } from '../../../../generated/prisma/browser'
import { Card } from '@/ui/components/Card/Card.component'
import { twMerge } from 'tailwind-merge'
import { unbounded } from '@/shared/styles/fonts'

export interface SidebarProps {
  isNew: boolean
  me: User
  post?: Post
  publishDate?: Date
}

export const Sidebar = ({ isNew, me, post, publishDate }: SidebarProps) => {
  const now = typeof post?.publishDate !== 'undefined' ? post?.publishDate : publishDate
  const date = `${now?.getDate()}.${exists(now?.getMonth()) + 1}.${now?.getFullYear()}`

  return (
    <div className="max-w-75 w-full p-6 flex flex-col items-start gap-2 border-r-outline-variant border-r">
      <BackButton type="button" className="-mt-3 -ml-3" appearance="transparent" icon="arrow_back">
        Назад
      </BackButton>
      <span className="text-xl font-medium block mb-0.5">{isNew ? 'Создать' : 'Изменить'} пост</span>
      <div className={'styles.sidebarBlock'}>Автор: {me.username}</div>
      <div className={'styles.sidebarBlock'}>Дата публикации: {date}</div>

      {/*<Button loader="spinner" appearance="primary" className={'mt-2'} icon={isNew ? 'add_circle' : 'update'}>
        {isNew ? 'Создать' : 'Изменить'}
      </Button>*/}

      <div className="grow"></div>

      <Card className="-m-3">
        <strong className={twMerge(unbounded.className, 'text-md')}>Начните писать с Gemini</strong>
        <p className="text-sm mt-2">
          Gemini проанализирует ваши посты и подскажет идеи. Доступно в одном из следующих обновлений NextLink
        </p>
      </Card>
    </div>
  )
}
