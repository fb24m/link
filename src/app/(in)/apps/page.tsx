import { getAppByOwnerId } from '@/services/Prisma/app/getByOwnerId'
import { users } from '@/shared/api/users'
import { LButton } from '@/shared/ui/LButton/LButton'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import type { ReactElement } from 'react'

const Apps = async (): Promise<ReactElement> => {
  const { userId } = await users.getId()

  const apps = await getAppByOwnerId(userId)

  return (
    <div>
      <Title1>Ваши приложения</Title1>
      <LButton appearance='primary' href='/apps/new'>
        Создать новое
      </LButton>
      <Button appearance='secondary'>О приложениях</Button>

      {apps.data?.map(app => (
        <Card key={app.id}>
          <h3>{app.title}</h3>
          <p>{app.description}</p>
          <p>{app.url}</p>
          <p>Ссылка: https://link.fb24m.ru/app/{app.id}</p>
        </Card>
      ))}
    </div>
  )
}

export default Apps
