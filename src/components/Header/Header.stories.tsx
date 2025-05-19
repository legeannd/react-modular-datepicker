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
  decorators: [
    (Story) => (
      <DatePickerProvider>
        <Story />
      </DatePickerProvider>
    ),
  ],
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
      <div className='flex items-start gap-4 rounded-xl bg-red-100 p-8'>
        <Story />
        <Calendar />
        <Calendar />
        <Calendar />
      </div>
    ),
  ],
}

export const WithGroupingDisabled: Story = {
  args: { groupingMode: 'disabled' },
  decorators: [
    (Story) => (
      <div className='flex flex-col items-center gap-4 rounded-xl bg-red-100 p-8'>
        <div className='flex'>
          <Story />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Calendar />
          <Calendar />
          <Calendar />
          <Calendar />
        </div>
      </div>
    ),
  ],
}

export const WithPartialGrouping: Story = {
  args: { groupingMode: ['second', 'third'] },
  decorators: [
    (Story) => (
      <div className='flex w-full items-start gap-4 rounded-xl bg-red-100 p-8'>
        <Calendar />
        <Calendar id='second' />
        <Story />
        <Calendar id='third' />
        <Calendar />
      </div>
    ),
  ],
}

export const WithDisabledPeriodChange: Story = {
  args: { enablePeriodChange: false },
  decorators: [
    (Story) => (
      <div className='flex items-start gap-4 rounded-xl bg-red-100 p-8'>
        <Story />
        <Calendar />
        <Calendar />
        <Calendar />
      </div>
    ),
  ],
}
