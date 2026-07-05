import z from 'zod'
import { authorize } from './authorize'

export const route = <T extends z.ZodTypeAny, E>(
  schema: T,
  handler: (req: Request, data: z.infer<T>, userId: number, props: E) => Promise<Response>
) => {
  return async (request: Request, props: E) => {
    const authorization = await authorize()
    if (authorization instanceof Response) return authorization

    const body = await request.json().catch(() => ({}))

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ errors: parsed.error.flatten() }, { status: 404 })
    }
    return handler(request, parsed.data, authorization, props)
  }
}

export const routeWithoutBody = <E>(handler: (req: Request, userId: number, props: E) => Promise<Response>) => {
  return async (request: Request, props: E) => {
    const authorization = await authorize()
    if (authorization instanceof Response) return authorization

    return handler(request, authorization, props)
  }
}
