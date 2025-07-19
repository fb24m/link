import type { ReactNode } from 'react'
import styles from './ActionButton.module.scss'
import type { ActionButtonProps } from './ActionButton.props'
import { Button } from '@/ui/components/Button/Button.component'

export const ActionButton = ({ action, fields, ...props }: ActionButtonProps): ReactNode => {
  return (
    <form action={action}>
      {fields?.map(field => (
        <input key={field.name} className={styles.field} type='text' name={field.name} value={field.value} readOnly />
      ))}
      <Button loader='spinner' {...props} />
    </form>
  )
}
