'use server'

import { prisma } from '../Prisma.service'
import type { IUser } from '@/interfaces/IUser.interface'
import type { IResponse } from '@/interfaces/IResponse.interface'
import { gravatar } from '../gravatar.service'

interface IGetById {
	id: number
}

interface IGetByUsername {
	username: string
}

interface IGetByEmail {
	email: string
	password: string
}

export const getUser = async (where: IGetById | IGetByUsername | IGetByEmail, log?: string): Promise<IResponse<IUser>> => {
	log && console.log(`[${log}]`)
	const user: IUser | null = await prisma.user.findUnique({ where })

	if (user !== null) {
		return {
			ok: true,
			code: 200,
			message: 'success',
			data: { ...user, avatar: (await gravatar.getAvatar(user.email))?.entry?.[0].thumbnailUrl }
		}
	} else {
		return {
			ok: false,
			code: 404,
			message: 'user not found'
		}
	}
}
