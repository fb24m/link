'use server'

import { prisma } from '@/services/Prisma.service'
import { request } from '@/shared/api/helpers/request'
import { Subscription } from '@prisma/client'
import { cookies } from 'next/headers'

export const subscribe = async (_: unknown, formData: FormData) => {
  'use server'

  const cookie = await cookies()

  const from = +formData.get('from')!
  const to = +formData.get('to')!

  if (from && to) {
    const subscription = await prisma.subscription.findFirst({ where: { from, to } })

    if (subscription) {
      await prisma.subscription.delete({ where: { id: subscription.id } })
    } else {
      await prisma.subscription.create({ data: { from, to } })
    }

    const subscriptions = await prisma.subscription.findMany({ where: { from, to }, select: { id: true, to: true } })

    cookie.set('subscriptions', JSON.stringify(subscriptions))
    cookie.set('last_update', new Date().toISOString())

    return request<Subscription>('subscriptions')
  }
}
