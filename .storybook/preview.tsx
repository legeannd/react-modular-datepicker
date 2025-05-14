import '../src/styles/main.css'

import type { Preview } from '@storybook/react'
import { DatePickerProvider } from '../src/components/DatePickerProvider'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <DatePickerProvider>
        <Story />
      </DatePickerProvider>
    ),
  ],
}

export default preview
