'use server'

import { cookies } from 'next/headers'

export const closeForm = async () => {
  const cookie = await cookies()

  cookie.set('2024_short_form_state', 'closed')
}
