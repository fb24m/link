import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
})

const preview: Preview = {
  parameters: { controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } } },
  decorators: [
    Story => (
      <div className={montserrat.className}>
        <Story />
      </div>
    ),
  ],
}

export default preview
