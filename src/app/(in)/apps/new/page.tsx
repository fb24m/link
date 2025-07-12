import { createApp } from '@/actions/app/create.action'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import type { ReactElement } from 'react'

const Apps = async (): Promise<ReactElement> => {
	return (
		<div>
			<Title1>Новое приложение</Title1>
			<Card>
				<form action={createApp}>
					<div>
						<label htmlFor="">Название приложения</label>
						<input name="name" placeholder="Название" maxLength={80} required />
					</div>
					<div>
						<label htmlFor="">Описание приложения</label>
						<textarea name="description" placeholder="О чем ваше приложение? (от 80 до 2000 символов)" minLength={80} maxLength={2000} required></textarea>
					</div>
					<div>
						<label htmlFor="">Ссылка на приложение</label>
						<input name="url" type="url" placeholder="Название" required />
					</div>
					<SubmitButton appearance="primary">Создать приложение</SubmitButton>
				</form>
			</Card>
		</div>
	)
}

export default Apps
