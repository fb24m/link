import type { User } from '@prisma/client'

export interface IUser extends User {
	pronouns?: string
}

export interface ISetUser extends Partial<IUser> { }
