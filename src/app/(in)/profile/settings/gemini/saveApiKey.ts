'use server'

import { request } from '@/shared/api/helpers/request'
import { GoogleGenAI } from '@google/genai/web'
import { revalidateTag } from 'next/cache'

export const saveGeminiKey = async (message: string, formData: FormData): Promise<string> => {
  const key = formData.get('key')

  const ai = new GoogleGenAI({ apiKey: key?.toString() ?? 'api-key' })

  try {
    await ai.models.list()
    request('user/gemini', { method: 'POST', body: JSON.stringify({ key: key }) })
    message = 'ok'
    revalidateTag('user/gemini', 'max')
  } catch {
    message = 'Неправильный API-ключ!'
  }

  return message
}
