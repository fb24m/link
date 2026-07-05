'use client'

import { Box } from '@/ui/components/Box/Box.component'
import { Input } from '@/shared/ui/Input/Input'
import styles from '@/shared/styles/forms.module.scss'
import { Button } from '@/shared/ui/Button/Button.component'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'

const schema = z.object({ password: z.string() })
type Data = z.infer<typeof schema>

export const PasswordForm = ({ email }: { email: string }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: 'post',
      body: JSON.stringify({ password: data.password }),
    })

    if (response.status === 403) {
      setError('password', { type: 'value', message: 'Неверный пароль' })
    }

    if (response.status === 200) {
      redirect('/profile')
    }
  }

  return (
    <form className={twMerge(styles.box, '')} onSubmit={handleSubmit(onSubmit)}>
      <Box alignItems="stretch" className="h-full">
        <div className="mb-4">
          Вы входите в аккаунт <span className="font-semibold">{email}</span>
        </div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Введите пароль"
          name="password"
          autoComplete="password"
        />
        <div className="text-sm mb-4">{errors.password?.message}</div>
        <div className="grow"></div>
        <div className="flex justify-end">
          <Button appearance="primary" loader="spinner">
            Продолжить
          </Button>
        </div>
      </Box>
    </form>
  )
}
