import { parseUser } from '@/functions/parseUser'
import { getAppByOwnerId } from '@/services/Prisma/app/getByOwnerId'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import type { ReactElement } from 'react'

const Apps = async (): Promise<ReactElement> => {
	const user = await parseUser()

	if (!user?.ok || !user.data) return <></>

	const apps = await getAppByOwnerId(user?.data?.id)

	return (
		<div>
			<Title1>Ваши приложения</Title1>
			<Button appearance="primary" href="/apps/new">Создать новое</Button>
			<Button appearance="secondary">О приложениях</Button>

			{apps.data?.map((app) => <Card key={app.id}>
				<h3>{app.title}</h3>
				<p>{app.description}</p>
				<p>{app.url}</p>
				<p>Ссылка: https://link.fb24m.ru/app/{app.id}</p>
			</Card>)}
		</div>
	)
}

export default Apps
