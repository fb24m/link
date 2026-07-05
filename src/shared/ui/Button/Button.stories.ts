import { Button as ButtonComponent } from './Button.component'

export default { title: 'UI/Button', component: ButtonComponent, argTypes: { as: { control: false } } }

export const Button = {
  args: { children: 'Button', appearance: 'primary', size: 'md', loader: 'spinner', isLoading: false },
}
