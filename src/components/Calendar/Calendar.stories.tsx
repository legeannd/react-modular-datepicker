import { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'
import { CalendarProps } from '../../types'
import { DatePickerProvider } from '../DatePickerProvider'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DatePickerProvider>
        <Story />
      </DatePickerProvider>
    ),
  ],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as CalendarProps,
}

export const WithoutWeekdayLabels: Story = {
  args: {
    showWeekdays: false,
  } as CalendarProps,
}

export const CustomWeekdayLabels: Story = {
  args: {
    showWeekdays: true,
    weekdayLabels: ['🌞', '🌜', '🔥', '💧', '🌳', '🌈', '⭐'],
  } as CalendarProps,
}

export const WithCalendarInfoLabels: Story = {
  args: {
    showWeekdays: true,
    weekdayLabels: ['🌞', '🌜', '🔥', '💧', '🌳', '🌈', '⭐'],
    showLabel: true,
  } as CalendarProps,
}
