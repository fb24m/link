import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
	console.log('Production: Created DB connection.')
}
else {
	//@ts-ignore
	if (!global.prisma) {
		//@ts-ignore
		global.prisma = new PrismaClient()
	}

	//@ts-ignore
	prisma = global.prisma
}

export { prisma }