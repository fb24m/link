import type { ButtonProps } from '@/ui/components/Button/Button.props'

export interface ActionButtonProps extends ButtonProps {
  action: (formData: FormData) => Promise<void>
  fields?: Array<{ name: string; value: number | string }>
}
