import { Meta, StoryObj } from '@storybook/react'
import { DatePickerProvider } from '.'
import { DatePickerProviderProps } from '../../types'
import { Calendar } from '../Calendar'
import { Header } from '../Header'

const meta = {
  title: 'Components/DatePickerProvider',
  component: DatePickerProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePickerProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Calendar />,
  } as DatePickerProviderProps,
}

export const SelectMultipleDates: Story = {
  args: {
    children: <Calendar />,
    type: 'multiple',
  } as DatePickerProviderProps,
}

export const SelectDateRange: Story = {
  args: {
    children: <Calendar />,
    type: 'range',
  } as DatePickerProviderProps,
}

export const CustomInitialDate: Story = {
  args: {
    initialDate: '2025-01-01',
    children: (
      <>
        <Header />
        <Calendar />
      </>
    ),
  } as DatePickerProviderProps,
}

export const NormalizedMultipleCalendarsHeight: Story = {
  args: {
    children: (
      <>
        <Header />
        <Calendar />
        <Calendar />
        <Calendar />
      </>
    ),
    type: 'range',
    normalizeMultipleCalendarsHeight: true,
  } as DatePickerProviderProps,
}
