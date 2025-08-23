import { Meta, StoryObj } from '@storybook/react'
import * as DatePicker from '../src/main'
import { DatePickerProviderProps } from '../src/types'
import { DateSelectExample } from '../.storybook/components/DateSelectExample'
import { ChevronLeft, ChevronRight, Calendar1, CalendarDays, CalendarRange } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const portugueseDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('pt-br')

const meta = {
  title: 'Components/DatePickerProvider',
  component: DatePicker.Provider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The DatePickerProvider is the root component that provides context and state management for all date picker components. It must wrap all other date picker components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
      description: 'The selection type for the date picker',
      defaultValue: 'single',
      table: {
        type: { summary: "'single' | 'multiple' | 'range'" },
        defaultValue: { summary: "'single'" },
      },
    },
    initialMonth: {
      control: 'date',
      description: 'The initial month to display in the calendar',
      table: {
        type: { summary: 'Date | string' },
        defaultValue: { summary: 'new Date()' },
      },
    },
    normalizeHeight: {
      control: 'boolean',
      description: 'Whether to normalize the calendar height to always show 6 weeks',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dayjs: {
      control: false,
      description: 'Custom dayjs factory function for date formatting and localization',
      table: {
        type: { summary: '(date?: ConfigType) => Dayjs' },
        defaultValue: { summary: 'undefined' },
      },
    },
    defaultSelected: {
      control: 'object',
      description: 'Initial dates configuration for pre-selecting dates',
      table: {
        type: { summary: 'InitialDatesObject' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabledDates: {
      control: 'object',
      description: 'Configuration for disabling specific dates or patterns',
      table: {
        type: { summary: 'DisabledDatesObject' },
        defaultValue: { summary: '{}' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for the provider wrapper',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: false,
      description:
        'The child components (Calendar, Header, etc.) that will use the date picker context',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof DatePicker.Provider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DatePicker.Header />
        <DatePicker.Calendar
          footerSlot={({ currentDate }) => (
            <div className='text-footer-label flex justify-between rounded p-2 text-center text-xs font-light'>
              <span className='flex items-center gap-1 capitalize'>
                <CalendarDays
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.format('MMMM, YYYY')}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar1
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.daysInMonth()}
              </span>
            </div>
          )}
        />
      </>
    ),
  } as DatePickerProviderProps,
}

export const CustomLocale: Story = {
  args: {
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample>
            <DatePicker.Label type='long' />
          </DateSelectExample>
        </DatePicker.Header>
        <DatePicker.Calendar
          footerSlot={({ currentDate }) => (
            <div className='text-footer-label flex justify-between rounded p-2 text-center text-xs font-light'>
              <span className='flex items-center gap-1 capitalize'>
                <CalendarDays
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.format('MMMM, YYYY')}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar1
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.daysInMonth()}
              </span>
            </div>
          )}
        />
      </>
    ),
    dayjs: portugueseDayjs,
  } as DatePickerProviderProps,
}

export const SelectMultipleDates: Story = {
  args: {
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample iconSlot={<CalendarDays />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
      </>
    ),
    type: 'multiple',
  } as DatePickerProviderProps,
}

export const SelectDateRange: Story = {
  args: {
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample iconSlot={<CalendarRange />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
      </>
    ),
    type: 'range',
  } as DatePickerProviderProps,
}

export const CustomStartDate: Story = {
  args: {
    initialMonth: '2025-01-01',
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
      </>
    ),
  } as DatePickerProviderProps,
}

export const InitialSelectedDates: Story = {
  args: {
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </>
    ),
    type: 'range',
    normalizeHeight: true,
    initialMonth: '2025-05-01',
    defaultSelected: {
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
        <DatePicker.Header>
          <DateSelectExample iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </>
    ),
    type: 'range',
    normalizeHeight: true,
    initialMonth: '2025-05-01',
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
        <DatePicker.Header>
          <DateSelectExample iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <DatePicker.Button type='previous'>
              <ChevronLeft className='text-label' />
            </DatePicker.Button>
            <DatePicker.Button type='next'>
              <ChevronRight className='text-label' />
            </DatePicker.Button>
          </div>
        </DatePicker.Header>
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </>
    ),
    type: 'range',
    normalizeHeight: true,
  } as DatePickerProviderProps,
}

export const CustomProviderStyling: Story = {
  args: {
    className: 'font-mono',
    children: (
      <>
        <DatePicker.Header>
          <DateSelectExample>
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
        </DatePicker.Header>
        <DatePicker.Calendar
          footerSlot={({ currentDate }) => (
            <div className='text-footer-label flex justify-between rounded p-2 text-center text-xs font-light'>
              <span className='flex items-center gap-1 capitalize'>
                <CalendarDays
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.format('MMMM, YYYY')}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar1
                  size={12}
                  strokeWidth={1}
                />
                {currentDate.daysInMonth()}
              </span>
            </div>
          )}
        />
      </>
    ),
  } as DatePickerProviderProps,
}
