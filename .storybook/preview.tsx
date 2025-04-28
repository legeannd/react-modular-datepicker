import type { Preview } from '@storybook/react'
import React from 'react'
import { DatePickerProvider } from '../src/components/DatePickerProvider' // Adjust the path as needed

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
