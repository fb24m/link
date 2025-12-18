import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaMariaDb({ host: process.env.DATABASE_HOST, port: 3306, connectionLimit: 1500 })

  prisma = new PrismaClient({ adapter })
  console.log('Production: Created DB connection.')
} else {
  //@ts-ignore
  if (!global.prisma) {
    const adapter = new PrismaMariaDb({ host: process.env.DATABASE_HOST, port: 3306, connectionLimit: 1500 })
    //@ts-ignore
    global.prisma = new PrismaClient({ adapter })
  }

  //@ts-ignore
  prisma = global.prisma
}

export { prisma }
