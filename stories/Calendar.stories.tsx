import { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '../src/components/Calendar'
import { CalendarProps, DayButtonClassNames } from '../src/types'
import { DatePickerProvider } from '../src/components/DatePickerProvider'
import { Calendar1, CalendarDays } from 'lucide-react'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Calendar component displays a monthly calendar view with customizable day buttons and styling options.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DatePickerProvider>
        <Story />
      </DatePickerProvider>
    ),
  ],
  argTypes: {
    showWeekdays: {
      control: 'boolean',
      description: 'Whether to show weekday labels at the top of the calendar',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    footerSlot: {
      control: false,
      description:
        'Render prop for custom footer content. Receives {currentDate} as parameter with full dayjs object for flexible formatting',
      table: {
        type: { summary: '(data: {currentDate: Dayjs}) => ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    weekdayLabels: {
      control: 'object',
      description:
        'Custom labels for weekdays. Array of 7 strings starting with Sunday. If not provided, uses locale default.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
    },
    weekdayClassName: {
      control: 'text',
      description: 'CSS classes for styling weekday labels',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    dayButtonClassNames: {
      control: 'object',
      description:
        'Advanced styling system for day buttons with state-based priority rules. Includes base styles, state-specific overrides (selected, today, hovered), calendar-type dependent styles (rangeStart, rangeEnd, betweenRange), and contextual modifiers (weekend, differentMonth, disabled). Higher priority states override lower ones - disabled states have highest priority, followed by selected, then range states, hover, today, weekend, and differentMonth.',
      table: {
        type: { summary: 'DayButtonClassNames' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for the main calendar container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the calendar component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
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
    footerSlot: ({ currentDate }) => (
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
    ),
  } as CalendarProps,
}

export const DocumentationExample: Story = {
  decorators: [
    (Story) => (
      <div className='space-y-4'>
        <div className='rounded-lg bg-slate-50 p-4 text-xs'>
          <h3 className='mb-3 text-sm font-bold text-slate-900'>Day Button Style Props</h3>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div>
                <strong>base</strong> - Foundation for all buttons
              </div>
              <div>
                <strong>selected</strong> - Selected dates
              </div>
              <div>
                <strong>today</strong> - Current date
              </div>
              <div>
                <strong>hovered</strong> - Hover state
              </div>
              <div>
                <strong>weekend</strong> - Saturday/Sunday
              </div>
              <div>
                <strong>differentMonth</strong> - Prev/next month dates
              </div>
            </div>
            <div className='space-y-2'>
              <div>
                <strong>monthBoundary</strong> - 1st/last day of month
              </div>
              <div>
                <strong>rangeStart</strong> - Range start (range mode)
              </div>
              <div>
                <strong>rangeEnd</strong> - Range end (range mode)
              </div>
              <div>
                <strong>betweenRange</strong> - Dates in range (range mode)
              </div>
              <div>
                <strong>disabled</strong> - Disabled dates
              </div>
              <div>
                <strong>disabledInRange</strong> - Disabled in selected range
              </div>
            </div>
          </div>

          <div className='mt-3 rounded border border-amber-200 bg-amber-50 p-2 text-amber-800'>
            <strong>Priority:</strong> disabled → selected → range → hover → today → weekend →
            differentMonth → base
          </div>
        </div>

        <div className='mx-auto max-w-sm'>
          <DatePickerProvider
            type='range'
            defaultSelected={{ start: '2025-08-10', end: '2025-08-15' }}
            disabledDates={{ days: ['2025-08-12', '2025-08-20'] }}
          >
            <Story />
          </DatePickerProvider>
        </div>
      </div>
    ),
  ],
  args: {
    footerSlot: ({ currentDate }) => (
      <div className='flex justify-between rounded p-2 text-xs'>
        <span className='flex items-center gap-1'>
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
    ),
    weekdaysContainerClassName: 'grid grid-cols-7 gap-1 mb-2 px-1',
    weekdayClassName: 'text-xs font-semibold text-gray-600 text-center py-1',
    daysContainerClassName: 'space-y-1',
    dayButtonClassNames: {
      base: 'rounded-md border transition-all px-2 py-1.5 text-sm font-medium hover:shadow-sm',
      disabled: 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400',
      disabledInRange: 'bg-red-50 text-red-400 border-red-200 opacity-50',
      selected: 'bg-blue-500 text-white border-blue-500 font-semibold shadow-sm',
      rangeStart: 'bg-blue-500 text-white border-blue-500 rounded-r-sm font-semibold',
      rangeEnd: 'bg-blue-500 text-white border-blue-500 rounded-l-sm font-semibold',
      betweenRange: 'bg-blue-100 text-blue-800 border-blue-200 rounded-none',
      hovered: 'bg-blue-50 border-blue-300 shadow-sm',
      today: 'bg-orange-50 text-orange-800 border-orange-300 font-semibold',
      weekend: 'text-red-600 border-red-100 bg-red-50',
      differentMonth: 'opacity-30 text-gray-400 border-gray-100',
      monthBoundary: 'font-bold border-green-300 bg-green-50 text-green-700',
    } as DayButtonClassNames,
    className: 'border border-gray-200 rounded-lg p-3 bg-white shadow-sm',
  } as CalendarProps,
}
