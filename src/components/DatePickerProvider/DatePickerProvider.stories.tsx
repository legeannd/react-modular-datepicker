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
    children: (
      <>
        <Header />
        <Calendar />
      </>
    ),
  } as DatePickerProviderProps,
}

export const SelectMultipleDates: Story = {
  args: {
    children: (
      <>
        <Header />
        <Calendar />
      </>
    ),
    type: 'multiple',
  } as DatePickerProviderProps,
}

export const SelectDateRange: Story = {
  args: {
    children: (
      <>
        <Header />
        <Calendar />
      </>
    ),
    type: 'range',
  } as DatePickerProviderProps,
}

export const CustomStartDate: Story = {
  args: {
    startDate: '2025-01-01',
    children: (
      <>
        <Header />
        <Calendar />
      </>
    ),
  } as DatePickerProviderProps,
}

export const InitialSelectedDates: Story = {
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
    normalizeHeight: true,
    initialDates: {
      days: [
        '2025-6-05',
        '2025-7-09',
        '2025-5-07',
        '2025-6-10',
        '2025-7-11',
        '2025-7-2',
        '2025-5-20',
      ],
      start: '2025-6-05',
      end: '2025-6-30',
    },
  } as DatePickerProviderProps,
}

export const DisabledDates: Story = {
  args: {
    children: (
      <>
        <Header />
        <Calendar />
        <Calendar />
        <Calendar />
      </>
    ),
    type: 'multiple',
    normalizeHeight: true,
    disabledDates: {
      every: 'weekdays',
      weekdays: [1, 6],
      days: [
        '2025-6-05',
        '2025-7-09',
        '2025-5-07',
        '2025-5-08',
        '2025-5-16',
        '2025-5-22',
        '2025-5-29',
        '2025-6-10',
        '2025-7-11',
        '2025-7-2',
      ],
      start: '2025-6-4',
      end: '2025-6-20',
    },
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
    normalizeHeight: true,
  } as DatePickerProviderProps,
}
