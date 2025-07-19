import { getAppById } from '@/services/Prisma/app/getById'
import type { ReactElement } from 'react'
import styles from './page.module.scss'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Button } from '@/ui/components/Button/Button.component'

const App = async (props: {
  params: Promise<{ id: number }>
}): Promise<ReactElement> => {
  const params = await props.params
  const app = await getAppById(+params.id)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title1>{app.data?.title}</Title1>
        <Button icon='star' appearance='primary'>
          Сохранить
        </Button>
      </div>
      <iframe
        className={styles.app}
        src={app.data?.url}
        frameBorder='0'
      ></iframe>
    </div>
  )
}

export default App
