import { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'
import { CalendarProps, DayButtonClassNames } from '../../types'
import { DatePickerProvider } from '../DatePickerProvider'
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
      <div className='space-y-6'>
        <div className='mb-6 rounded-lg bg-slate-50 p-6 text-sm'>
          <h3 className='mb-4 text-lg font-bold text-slate-900'>📋 Day Button Props Reference</h3>

          <div className='space-y-6'>
            <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
              <h4 className='mb-3 font-bold text-blue-900'>
                🎨 dayButtonClassNames Object Properties
              </h4>
              <div className='space-y-3 text-xs'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <div>
                      <strong className='text-blue-800'>base:</strong> Foundation styles for all day
                      buttons
                    </div>
                    <div>
                      <strong className='text-blue-800'>selected:</strong> Styles for chosen dates
                      (overrides hover/weekend/today)
                    </div>
                    <div>
                      <strong className='text-blue-800'>today:</strong> Styles for current date
                      (suppressed in betweenRange)
                    </div>
                    <div>
                      <strong className='text-blue-800'>hovered:</strong> Styles for mouse hover
                      (blocked when selected/in range)
                    </div>
                    <div>
                      <strong className='text-blue-800'>weekend:</strong> Styles for Sat/Sun (hidden
                      when hovered/selected/in range)
                    </div>
                    <div>
                      <strong className='text-blue-800'>differentMonth:</strong> Styles for
                      prev/next month dates shown in calendar grid (always applies)
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div>
                      <strong className='text-blue-800'>monthBoundary:</strong> Styles for 1st/last
                      day of month
                    </div>
                    <div>
                      <strong className='text-blue-800'>rangeStart:</strong> Range start date
                      (type="range" only)
                    </div>
                    <div>
                      <strong className='text-blue-800'>rangeEnd:</strong> Range end date
                      (type="range" only)
                    </div>
                    <div>
                      <strong className='text-blue-800'>betweenRange:</strong> Dates between range
                      (type="range" only)
                    </div>
                    <div>
                      <strong className='text-blue-800'>disabled:</strong> Disabled dates (highest
                      priority)
                    </div>
                    <div>
                      <strong className='text-blue-800'>disabledInRange:</strong> Disabled dates
                      within selected range
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
              <h4 className='mb-3 font-bold text-amber-900'>
                ⚠️ Critical Behaviors & Dependencies
              </h4>
              <div className='space-y-3 text-xs text-amber-800'>
                <div>
                  <strong>Priority System:</strong> disabled {`>`} selected {`>`} range states {`>`}{' '}
                  hover {`>`} today {`>`} weekend {`>`} differentMonth {`>`} base
                </div>
                <div>
                  <strong>Calendar Type Dependencies:</strong>
                  <ul className='mt-1 ml-4 list-disc space-y-1'>
                    <li>
                      <code>rangeStart</code>, <code>rangeEnd</code>, <code>betweenRange</code> only
                      work with <code>type="range"</code>
                    </li>
                    <li>
                      <code>selected</code> behavior changes: single date vs multiple dates vs range
                      endpoints
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Context Dependencies:</strong>
                  <ul className='mt-1 ml-4 list-disc space-y-1'>
                    <li>
                      <code>monthBoundary</code> applies only to first/last days of current month
                    </li>
                    <li>Multi-calendar setups affect cross-calendar interactions</li>
                    <li>
                      Header + multi-calendar setup prevents <code>selected</code> styling on
                      different-month dates to avoid visual confusion
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>State Suppressions:</strong>
                  <ul className='mt-1 ml-4 list-disc space-y-1'>
                    <li>
                      <code>weekend</code> styles hidden when hovered, selected, or in range
                    </li>
                    <li>
                      <code>today</code> outline suppressed when in <code>betweenRange</code>
                    </li>
                    <li>
                      <code>hover</code> blocked on selected dates and dates in range
                    </li>
                    <li>
                      <code>differentMonth</code> hidden when date is selected
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Accessibility:</strong> All buttons include ARIA labels with full date
                  format and proper disabled states
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
              <h4 className='mb-3 font-bold text-green-900'>🎯 Implementation Tips</h4>
              <div className='space-y-2 text-xs text-green-800'>
                <div>
                  <strong>Layering:</strong> Use base styles for common properties, specific states
                  for overrides
                </div>
                <div>
                  <strong>Visual Hierarchy:</strong> Higher priority states should have more
                  prominent styling
                </div>
                <div>
                  <strong>Consistency:</strong> Maintain consistent color schemes across related
                  states
                </div>
                <div>
                  <strong>Testing:</strong> Test all combinations with different calendar types and
                  configurations
                </div>
              </div>
            </div>
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
    dayButtonClassNames: {
      base: 'rounded-md border transition-all duration-150 px-2 py-1.5 text-sm cursor-pointer flex items-center justify-center font-medium hover:shadow-sm',

      disabled: 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400',
      disabledInRange: 'bg-red-50 text-red-400 border-red-200 cursor-not-allowed opacity-50',

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
  } as CalendarProps,
}
