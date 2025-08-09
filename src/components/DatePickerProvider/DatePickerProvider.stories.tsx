import { Meta, StoryObj } from '@storybook/react'
import { DatePickerProvider } from '.'
import { DatePickerProviderProps } from '../../types'
import { Calendar } from '../Calendar'
import { Header, Button, DateSelect, MonthLabel } from '../Header'
import { ChevronLeft, ChevronRight, Calendar1, CalendarDays, CalendarRange } from 'lucide-react'

const meta = {
  title: 'Components/DatePickerProvider',
  component: DatePickerProvider,
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
    locale: {
      control: 'text',
      description: 'Locale string for internationalization (e.g., "en", "pt-BR", "es")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disablePeriodChange: {
      control: 'boolean',
      description: 'Whether to disable navigation between months/years',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
} satisfies Meta<typeof DatePickerProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Header />
        <Calendar
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
        <Header>
          <DateSelect>
            <MonthLabel type='full' />
          </DateSelect>
        </Header>
        <Calendar
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
    locale: 'pt-br',
  } as DatePickerProviderProps,
}

export const SelectMultipleDates: Story = {
  args: {
    children: (
      <>
        <Header>
          <DateSelect iconSlot={<CalendarDays />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
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
        <Header>
          <DateSelect iconSlot={<CalendarRange />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
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
        <Header>
          <DateSelect iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
      </>
    ),
  } as DatePickerProviderProps,
}

export const InitialSelectedDates: Story = {
  args: {
    children: (
      <>
        <Header>
          <DateSelect iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
        <Calendar />
        <Calendar />
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
        <Header>
          <DateSelect iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
        <Calendar />
        <Calendar />
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

export const DisabledPeriodChange: Story = {
  args: {
    children: (
      <>
        <Header>
          <DateSelect iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
        <Calendar />
        <Calendar />
      </>
    ),
    disablePeriodChange: true,
  } as DatePickerProviderProps,
}

export const NormalizedMultipleCalendarsHeight: Story = {
  args: {
    children: (
      <>
        <Header>
          <DateSelect iconSlot={<Calendar1 />} />
          <div className='flex gap-4'>
            <Button type='previous'>
              <ChevronLeft className='text-label' />
            </Button>
            <Button type='next'>
              <ChevronRight className='text-label' />
            </Button>
          </div>
        </Header>
        <Calendar />
        <Calendar />
        <Calendar />
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
        <Header>
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
        </Header>
        <Calendar
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
