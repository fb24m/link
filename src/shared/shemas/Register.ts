import z from 'zod'

export const registerSchema = z
  .object({
    login: z.string().min(3, 'Имя пользователя слишком короткое').max(20, 'Имя пользователя слишком длинное'),
    password: z
      .string()
      .min(8, 'Пароль должен быть не менее 8 символов')
      .regex(/[A-Z]/, 'Нужна хотя бы одна заглавная буква'),
    repeatPassword: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, { message: 'Пароли не совпадают', path: ['repeatPassword'] })

export type RegisterSchema = z.infer<typeof registerSchema>
