import { Meta, StoryObj } from '@storybook/react'
import * as DatePicker from '../src/main'
import { DateSelectExample } from '../.storybook/components/DateSelectExample'
import { ChevronLeft, ChevronRight, Calendar1, CalendarDays, CalendarRange } from 'lucide-react'

const meta = {
  title: 'Components/Header',
  component: DatePicker.Header,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Header component that wraps calendar navigation controls and manages calendar grouping. Contains date selection controls, navigation buttons, and renders multiple calendars in a responsive grid layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Navigation controls and date selection components',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    groupingMode: {
      description:
        'Controls how calendars are grouped together. "all" groups all calendars, "disabled" shows individual calendars, or array of specific calendar IDs to group',
      control: { type: 'select' },
      options: ['all', 'disabled', ['second', 'third']],
      table: {
        type: { summary: '"all" | "disabled" | string[]' },
        defaultValue: { summary: '"all"' },
      },
    },
    className: {
      description: 'CSS classes for styling the header container',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"rounded-lg bg-white shadow-md"' },
      },
    },
    calendarGridClassName: {
      description: 'CSS classes for styling the calendar grid layout container',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    childrenClassName: {
      description: 'CSS classes for styling the header container',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  decorators: [
    (Story) => (
      <DatePicker.Provider normalizeHeight={true}>
        <Story />
      </DatePicker.Provider>
    ),
  ],
} satisfies Meta<typeof DatePicker.Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DateSelectExample iconSlot={<Calendar1 />} />
        <div className='flex gap-4'>
          <DatePicker.Button type='previous'>
            <ChevronLeft className='text-label' />
          </DatePicker.Button>
          <DatePicker.Button type='next'>
            <ChevronRight className='text-label' />
          </DatePicker.Button>
        </div>
      </>
    ),
  },
}

export const WithGroupOfCalendars: Story = {
  args: {
    children: (
      <>
        <DateSelectExample iconSlot={<CalendarDays />}>
          <DatePicker.Label type='long' />
        </DateSelectExample>
        <div className='flex gap-4'>
          <DatePicker.Button type='previous'>
            <ChevronLeft className='text-label' />
          </DatePicker.Button>
          <DatePicker.Button type='next'>
            <ChevronRight className='text-label' />
          </DatePicker.Button>
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className='flex items-start gap-4 rounded-xl bg-red-100 p-8'>
        <Story />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </div>
    ),
  ],
}

export const CustomLabelChildren: Story = {
  args: {
    children: (
      <>
        <DateSelectExample
          iconSlot={<CalendarRange />}
          yearRangeEndOffset={20}
          yearRangeStartOffset={20}
        >
          <DatePicker.Label>
            {({ start, end }) => (
              <div className='flex flex-col gap-2 rounded-lg border-2 border-red-400 bg-red-100 p-4 shadow-lg'>
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-red-700'>Start Month</span>
                    <span className='text-lg font-semibold text-red-900'>{start.month}</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-red-700'>Start Year</span>
                    <span className='text-lg font-semibold text-red-900'>{start.year}</span>
                  </div>
                  <span className='mx-2 text-2xl text-red-400'>
                    <Calendar1 className='mr-1 inline-block' />
                    <ChevronRight className='inline-block' />
                    <CalendarDays className='ml-1 inline-block' />
                  </span>
                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-red-700'>End Month</span>
                    <span className='text-lg font-semibold text-red-900'>{end.month}</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-red-700'>End Year</span>
                    <span className='text-lg font-semibold text-red-900'>{end.year}</span>
                  </div>
                </div>
                <div className='mt-2 text-sm text-red-800'>
                  <span className='font-bold'>Selected Range:</span> {start.month} {start.year} to{' '}
                  {end.month} {end.year}
                </div>
              </div>
            )}
          </DatePicker.Label>
        </DateSelectExample>
        <div className='flex gap-4'>
          <DatePicker.Button type='previous'>
            <ChevronLeft className='text-label' />
          </DatePicker.Button>
          <DatePicker.Button type='next'>
            <ChevronRight className='text-label' />
          </DatePicker.Button>
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className='flex items-start gap-4 rounded-xl bg-red-100 p-8'>
        <Story />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </div>
    ),
  ],
}

export const WithGroupingDisabled: Story = {
  args: {
    groupingMode: 'disabled',
    children: (
      <>
        <DateSelectExample iconSlot={<Calendar1 />}>
          <DatePicker.Label type='long' />
        </DateSelectExample>
        <div className='flex gap-4'>
          <DatePicker.Button type='previous'>
            <ChevronLeft className='text-label' />
          </DatePicker.Button>
          <DatePicker.Button type='next'>
            <ChevronRight className='text-label' />
          </DatePicker.Button>
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className='flex flex-col items-center gap-4 rounded-xl bg-red-100 p-8'>
        <div className='flex'>
          <Story />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <DatePicker.Calendar />
          <DatePicker.Calendar />
          <DatePicker.Calendar />
          <DatePicker.Calendar />
        </div>
      </div>
    ),
  ],
}

export const WithPartialGrouping: Story = {
  args: {
    groupingMode: ['second', 'third'],
    children: (
      <>
        <DateSelectExample iconSlot={<CalendarDays />}>
          <DatePicker.Label type='long' />
        </DateSelectExample>
        <div className='flex gap-4'>
          <DatePicker.Button type='previous'>
            <ChevronLeft className='text-label' />
          </DatePicker.Button>
          <DatePicker.Button type='next'>
            <ChevronRight className='text-label' />
          </DatePicker.Button>
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className='flex w-full items-start gap-4 rounded-xl bg-red-100 p-8'>
        <DatePicker.Calendar />
        <DatePicker.Calendar id='second' />
        <Story />
        <DatePicker.Calendar id='third' />
        <DatePicker.Calendar />
      </div>
    ),
  ],
}
