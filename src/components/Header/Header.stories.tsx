import { Meta, StoryObj } from '@storybook/react'
import { Header } from '.'
import { DatePickerProvider } from '../DatePickerProvider'
import { Calendar } from '../Calendar'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithGroupOfCalendars: Story = {
  args: {},
  decorators: [
    (Story) => (
      <DatePickerProvider>
        <Story />
        <Calendar />
        <Calendar />
        <Calendar />
      </DatePickerProvider>
    ),
  ],
}
