import { ToolbarItem } from '../ToolbarItem/ToolbarItem'
import { Toolbar as ToolbarComponent } from './Toolbar'

export default { title: 'UI/Toolbar', component: ToolbarComponent, argTypes: { children: { control: false } } }

export const Toolbar = {
  args: {
    children: (
      <>
        <ToolbarItem icon="format_bold" active></ToolbarItem>
        <ToolbarItem icon="format_italic"></ToolbarItem>
        <ToolbarItem icon="format_underlined"></ToolbarItem>
        <ToolbarItem icon="strikethrough_s"></ToolbarItem>
      </>
    ),
  },
}
