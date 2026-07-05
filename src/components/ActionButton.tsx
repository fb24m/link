import type { ElementType, ReactNode } from 'react'
import { Button, ButtonProps } from '@/shared/ui/Button/Button.component'

export type ActionButtonProps = ButtonProps<'button'> & {
  action: (formData: FormData) => Promise<void>
  fields?: Array<{ name: string; value: number | string }>
}

export const ActionButton = ({ action, fields, ...props }: ActionButtonProps): ReactNode => {
  return (
    <form action={action}>
      {fields?.map(field => (
        <input key={field.name} type="hidden" name={field.name} value={field.value} readOnly />
      ))}
      <Button loader="spinner" {...(props as ButtonProps<E>)} />
    </form>
  )
}
