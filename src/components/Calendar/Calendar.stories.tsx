import { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'
import { CalendarProps } from '../../types'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as CalendarProps,
}

export const WithoutWeekdaysLabel: Story = {
  args: {
    showWeekdays: false,
  } as CalendarProps,
}

export const CustomLabels: Story = {
  args: {
    showWeekdays: true,
    weekdayLabels: ['🌞', '🌜', '🔥', '💧', '🌳', '🌈', '⭐'],
  } as CalendarProps,
}
