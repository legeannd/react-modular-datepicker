import { Meta, StoryObj } from '@storybook/react'
import { Button, DateSelect, Header, MonthLabel } from '.'
import { DatePickerProvider } from '../DatePickerProvider'
import { Calendar } from '../Calendar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const meta = {
  title: 'Components/Header',
  component: Header,
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
      description:
        'Navigation controls and date selection components (DateSelect, Button, MonthLabel)',
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
  },
  decorators: [
    (Story) => (
      <DatePickerProvider normalizeHeight={true}>
        <Story />
      </DatePickerProvider>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DateSelect />
        <div className='flex gap-4'>
          <Button type='previous'>
            <ChevronLeft className='text-label' />
          </Button>
          <Button type='next'>
            <ChevronRight className='text-label' />
          </Button>
        </div>
      </>
    ),
  },
}

export const WithGroupOfCalendars: Story = {
  args: {
    children: (
      <>
        <DateSelect>
          <MonthLabel type='full' />
        </DateSelect>
        <div className='flex gap-4'>
          <Button type='previous'>
            <ChevronLeft className='text-label' />
          </Button>
          <Button type='next'>
            <ChevronRight className='text-label' />
          </Button>
        </div>
      </>
    ),
  },
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

export const CustomDateSelectRange: Story = {
  args: {
    children: (
      <>
        <DateSelect
          yearRangeStartOffset={20}
          yearRangeEndOffset={20}
        />
        <div className='flex gap-4'>
          <Button type='previous'>
            <ChevronLeft className='text-label' />
          </Button>
          <Button type='next'>
            <ChevronRight className='text-label' />
          </Button>
        </div>
      </>
    ),
  },
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
  args: {
    groupingMode: 'disabled',
    children: (
      <>
        <DateSelect>
          <MonthLabel type='full' />
        </DateSelect>
        <div className='flex gap-4'>
          <Button type='previous'>
            <ChevronLeft className='text-label' />
          </Button>
          <Button type='next'>
            <ChevronRight className='text-label' />
          </Button>
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
  args: {
    groupingMode: ['second', 'third'],
    children: (
      <>
        <DateSelect>
          <MonthLabel type='full' />
        </DateSelect>
        <div className='flex gap-4'>
          <Button type='previous'>
            <ChevronLeft className='text-label' />
          </Button>
          <Button type='next'>
            <ChevronRight className='text-label' />
          </Button>
        </div>
      </>
    ),
  },
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
