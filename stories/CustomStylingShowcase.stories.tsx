import { Meta } from '@storybook/react'
import * as DatePicker from '../src/main'
import { DateSelectExample } from '../.storybook/components/DateSelectExample'
import { useDateSelect } from '../src/hooks/useDateSelect'
import { ChevronLeft, ChevronRight, Calendar1, CalendarDays } from 'lucide-react'

const meta = {
  title: 'Examples/Custom Styling Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'This showcase demonstrates various styling possibilities for the date picker components. For detailed component documentation and props, see the individual component stories in the Components section.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const MinimalistDesign = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-4 rounded border border-gray-300 bg-white px-4 py-2 shadow-sm'>
          <select
            value={currentMonth}
            onChange={(e) => onMonthChange(parseInt(e.target.value))}
            className='cursor-pointer rounded border border-gray-200 px-2 py-1 text-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none'
          >
            {months.map((month, index) => (
              <option
                key={index}
                value={index}
              >
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className='cursor-pointer rounded border border-gray-200 px-2 py-1 text-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none'
          >
            {years.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
          <DatePicker.Label
            type='long'
            className='text-sm font-medium text-gray-700'
          />
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
            <DatePicker.Provider
              initialMonth={new Date('2025-06-15')}
              normalizeHeight={true}
            >
              <DatePicker.Header
                className='rounded border border-gray-300 bg-white text-gray-800 shadow-sm'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-2'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50'
                  >
                    <ChevronLeft size={16} />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50'
                  >
                    <ChevronRight size={16} />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='border border-gray-200 bg-white'
                  weekdayClassName='flex justify-center text-gray-600 font-medium text-xs'
                  footerSlot={({ currentDate }) => (
                    <div className='flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-600'>
                      <span>Clean • Simple</span>
                      <span className='flex items-center gap-2'>
                        <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                        <span>
                          Week{' '}
                          {Math.ceil((currentDate.date() + currentDate.startOf('month').day()) / 7)}{' '}
                          • Q{Math.ceil((currentDate.month() + 1) / 3)}
                        </span>
                      </span>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center border border-transparent px-3 py-2 text-sm transition-colors text-gray-700',
                    selected: 'bg-gray-900 text-white border-gray-900',
                    today: 'border-gray-400 font-semibold',
                    weekend: 'text-gray-500',
                    hovered: 'bg-gray-50 border-gray-300',
                  }}
                />
                <DatePicker.Calendar
                  className='border border-l-0 border-gray-200 bg-white'
                  weekdayClassName='flex justify-center text-gray-600 font-medium text-xs'
                  footerSlot={({ currentDate }) => (
                    <div className='flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-600'>
                      <span>{currentDate.daysInMonth()} days in month</span>
                      <span className='flex items-center gap-2'>
                        <span>
                          Q{Math.ceil((currentDate.month() + 1) / 3)} • {currentDate.format('dddd')}
                        </span>
                        <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                      </span>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center border border-transparent px-3 py-2 text-sm transition-colors text-gray-700',
                    selected: 'bg-gray-900 text-white border-gray-900',
                    today: 'border-gray-400 font-semibold',
                    weekend: 'text-gray-500',
                    hovered: 'bg-gray-50 border-gray-300',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const GradientGlassStyle = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md'>
          <div className='flex flex-col items-center gap-1'>
            <DatePicker.Label
              type='long'
              className='text-lg font-bold text-white drop-shadow-lg'
            />
            <div className='mt-2 flex items-center gap-3'>
              <select
                value={currentMonth}
                onChange={(e) => onMonthChange(parseInt(e.target.value))}
                className='cursor-pointer rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none'
              >
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={index}
                    className='bg-gray-900 text-white'
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={currentYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                className='cursor-pointer rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none'
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className='bg-gray-900 text-white'
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl'>
            <DatePicker.Provider
              type='range'
              normalizeHeight={true}
            >
              <DatePicker.Header
                className='rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 text-white shadow-xl backdrop-blur-lg'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-3'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded-full border border-white/30 bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30'
                  >
                    <ChevronLeft size={18} />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded-full border border-white/30 bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30'
                  >
                    <ChevronRight size={18} />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-lg'
                  weekdayClassName='flex justify-center text-white/80 font-bold text-sm'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-2xl border border-white/30 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 p-4 backdrop-blur-md'>
                      <div className='flex items-center justify-between text-xs font-semibold text-white/90'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-2 w-2 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]'></div>
                          <span className='bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
                            Glass • Range
                          </span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='text-white/70'>
                            {currentDate.format('ddd, MMM DD')} • Day {currentDate.date()}
                          </span>
                          <div className='flex h-2 w-2 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-sm transition-all border border-transparent',
                    selected: 'bg-white text-purple-600 font-bold shadow-lg border-white',
                    rangeStart:
                      'bg-gradient-to-r from-white to-white/80 text-purple-600 font-bold shadow-lg rounded-l-xl rounded-r-none border-white',
                    rangeEnd:
                      'bg-gradient-to-l from-white to-white/80 text-purple-600 font-bold shadow-lg rounded-r-xl rounded-l-none border-white',
                    betweenRange:
                      'bg-white/30 text-white font-semibold backdrop-blur-sm rounded-none shadow-[0_0_8px_rgba(255,255,255,0.3)] border-white/40',
                    today:
                      'bg-yellow-400/30 text-yellow-100 font-bold border-yellow-300/50 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
                    weekend: 'text-pink-200 font-semibold border-transparent',
                    hovered:
                      'bg-white/20 backdrop-blur-sm text-white shadow-[0_0_12px_rgba(255,255,255,0.3)] border-white/20',
                  }}
                />
                <DatePicker.Calendar
                  className='rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-lg'
                  weekdayClassName='flex justify-center text-white/80 font-bold text-sm'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-2xl border border-white/30 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 p-4 backdrop-blur-md'>
                      <div className='flex items-center justify-between text-xs font-semibold text-white/90'>
                        <div className='flex items-center gap-3'>
                          <span className='text-white/70'>
                            Q{Math.ceil((currentDate.month() + 1) / 3)} •{' '}
                            {currentDate.daysInMonth()} days
                          </span>
                          <div className='flex h-2 w-2 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'></div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-2 w-2 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]'></div>
                          <span className='bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent'>
                            Dreamy • UI
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-sm transition-all border border-transparent',
                    selected: 'bg-white text-purple-600 font-bold shadow-lg border-white',
                    rangeStart:
                      'bg-gradient-to-r from-white to-white/80 text-purple-600 font-bold shadow-lg rounded-l-xl rounded-r-none border-white',
                    rangeEnd:
                      'bg-gradient-to-l from-white to-white/80 text-purple-600 font-bold shadow-lg rounded-r-xl rounded-l-none border-white',
                    betweenRange:
                      'bg-white/30 text-white font-semibold backdrop-blur-sm rounded-none shadow-[0_0_8px_rgba(255,255,255,0.3)] border-white/40',
                    today:
                      'bg-yellow-400/30 text-yellow-100 font-bold border-yellow-300/50 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
                    weekend: 'text-pink-200 font-semibold border-transparent',
                    hovered:
                      'bg-white/20 backdrop-blur-sm text-white shadow-[0_0_12px_rgba(255,255,255,0.3)] border-white/20',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const DarkTheme = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-4 rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-3 shadow-xl'>
          <div className='flex items-center gap-2'>
            <Calendar1
              size={20}
              className='text-emerald-400'
            />
            <div className='h-6 w-px bg-slate-600' />
          </div>
          <div className='flex flex-col items-center gap-1'>
            <DatePicker.Label
              type='long'
              className='text-xl font-bold text-white drop-shadow-lg'
            />
            <div className='mt-2 flex items-center gap-3'>
              <select
                value={currentMonth}
                onChange={(e) => onMonthChange(parseInt(e.target.value))}
                className='cursor-pointer rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-emerald-400 transition-all hover:border-emerald-500 hover:bg-slate-700 focus:border-emerald-400 focus:outline-none'
              >
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={index}
                    className='bg-slate-800 text-emerald-400'
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={currentYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                className='cursor-pointer rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-emerald-400 transition-all hover:border-emerald-500 hover:bg-slate-700 focus:border-emerald-400 focus:outline-none'
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className='bg-slate-800 text-emerald-400'
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-sm'>
            <DatePicker.Provider
              type='single'
              normalizeHeight={true}
            >
              <DatePicker.Header
                className='rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-3'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  >
                    <ChevronLeft size={18} />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  >
                    <ChevronRight size={18} />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='rounded-xl border border-slate-700 bg-slate-800/30 p-4 backdrop-blur-sm'
                  weekdayClassName='flex justify-center text-emerald-300 font-semibold text-sm'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-xl border border-slate-700 bg-gradient-to-r from-emerald-900/20 to-slate-800/20 p-3 backdrop-blur-sm'>
                      <div className='flex items-center justify-between text-xs font-semibold text-slate-300'>
                        <div className='flex items-center gap-3'>
                          <div className='h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'></div>
                          <span className='text-emerald-300'>Dark • Modern</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='text-slate-400'>
                            {currentDate.format('ddd, MMM DD')} • Day {currentDate.date()}
                          </span>
                          <div className='h-2 w-2 rounded-full bg-slate-500'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm transition-all text-slate-300 hover:bg-slate-700 hover:shadow-md border border-transparent',
                    selected:
                      'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/25 border-emerald-400',
                    today:
                      'bg-slate-700 text-emerald-300 font-bold border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
                    weekend: 'text-slate-400 font-medium',
                    hovered: 'bg-slate-600 text-white shadow-md border-slate-500',
                    differentMonth: 'text-slate-500',
                  }}
                />
                <DatePicker.Calendar
                  className='rounded-xl border border-l-0 border-slate-700 bg-slate-800/30 p-4 backdrop-blur-sm'
                  weekdayClassName='flex justify-center text-emerald-300 font-semibold text-sm'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800/20 to-emerald-900/20 p-3 backdrop-blur-sm'>
                      <div className='flex items-center justify-between text-xs font-semibold text-slate-300'>
                        <div className='flex items-center gap-3'>
                          <span className='text-slate-400'>
                            Q{Math.ceil((currentDate.month() + 1) / 3)} •{' '}
                            {currentDate.daysInMonth()} days
                          </span>
                          <div className='h-2 w-2 rounded-full bg-slate-500'></div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'></div>
                          <span className='text-emerald-300'>Elegant • UI</span>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm transition-all text-slate-300 hover:bg-slate-700 hover:shadow-md border border-transparent',
                    selected:
                      'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/25 border-emerald-400',
                    today:
                      'bg-slate-700 text-emerald-300 font-bold border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
                    weekend: 'text-slate-400 font-medium',
                    hovered: 'bg-slate-600 text-white shadow-md border-slate-500',
                    differentMonth: 'text-slate-500',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const DarkCyberpunkTheme = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-4 rounded border border-cyan-400/50 bg-black/80 px-6 py-3 shadow-[0_0_20px_rgba(34,211,238,0.3)]'>
          <div className='flex items-center gap-2'>
            <Calendar1
              size={20}
              className='text-cyan-400'
            />
            <div className='h-6 w-px bg-cyan-400/50' />
          </div>
          <div className='relative'>
            <select
              value={currentMonth}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
              className='cursor-pointer rounded border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 font-mono text-cyan-400 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] focus:outline-none'
            >
              {months.map((month, index) => (
                <option
                  key={index}
                  value={index}
                  className='bg-gray-900 text-cyan-400'
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col items-center'>
            <DatePicker.Label
              type='long'
              className='font-mono text-lg font-bold tracking-wider text-cyan-400'
            />
          </div>
          <div className='relative'>
            <select
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className='cursor-pointer rounded border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 font-mono text-cyan-400 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] focus:outline-none'
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className='bg-gray-900 text-cyan-400'
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-black p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-lg border border-cyan-400/30 bg-gray-900/90 p-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]'>
            <DatePicker.Provider
              initialMonth={new Date('2025-12-25')}
              normalizeHeight={true}
              disabledDates={{
                days: ['2025-12-01', '2025-12-08', '2025-12-15', '2025-12-22', '2025-12-29'],
                every: 'weekend',
              }}
            >
              <DatePicker.Header
                className='rounded border border-cyan-400/50 bg-black/80 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-3'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 text-cyan-400 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                  >
                    <ChevronLeft size={16} />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 text-cyan-400 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                  >
                    <ChevronRight size={16} />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='border border-cyan-400/30 bg-gray-900/50'
                  weekdayClassName='flex justify-center text-cyan-300 font-mono font-bold text-xs'
                  footerSlot={({ currentDate }) => (
                    <div className='border-t border-cyan-400/50 bg-black/90 p-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]'>
                      <div className='flex items-center justify-between font-mono text-xs'>
                        <div className='flex items-center gap-3 text-cyan-400'>
                          <span className='animate-pulse'>[</span>
                          <span className='font-bold tracking-wider'>SYS_GUARD</span>
                          <span className='animate-pulse'>]</span>
                        </div>
                        <div className='flex items-center gap-2 text-cyan-300/80'>
                          <span>
                            MAINT_{currentDate.date()}:{currentDate.daysInMonth()}
                          </span>
                          <div className='h-1 w-1 animate-ping rounded-full bg-red-400 shadow-[0_0_4px_rgba(239,68,68,0.8)]'></div>
                          <span>ACCESS_DENIED</span>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center border border-transparent px-3 py-2 text-sm transition-all text-cyan-100  font-mono',
                    selected:
                      'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(34,211,238,0.8)]',
                    today:
                      'border-cyan-400 text-cyan-400 font-bold shadow-[0_0_5px_rgba(34,211,238,0.5)]',
                    weekend: 'text-cyan-300/70',
                    hovered:
                      'border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.3)]',
                    disabled:
                      'bg-red-900/30 text-red-400 border-red-500/30 cursor-not-allowed shadow-[0_0_8px_rgba(239,68,68,0.3)] relative after:content-["X"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-red-300 after:font-bold after:animate-pulse',
                  }}
                />
                <DatePicker.Calendar
                  className='border border-l-0 border-cyan-400/30 bg-gray-900/50'
                  weekdayClassName='flex justify-center text-cyan-300 font-mono font-bold text-xs'
                  footerSlot={({ currentDate }) => (
                    <div className='border-t border-cyan-400/50 bg-black/90 p-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]'>
                      <div className='flex items-center justify-between font-mono text-xs'>
                        <div className='flex items-center gap-2 text-cyan-300/80'>
                          <span>Q{Math.ceil((currentDate.month() + 1) / 3)}_</span>
                          <div className='h-1 w-1 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.8)]'></div>
                          <span>
                            WK_
                            {Math.ceil(
                              (currentDate.date() + currentDate.startOf('month').day()) / 7
                            )
                              .toString()
                              .padStart(2, '0')}
                          </span>
                        </div>
                        <div className='flex items-center gap-3 text-cyan-400'>
                          <span className='animate-pulse'>&gt;</span>
                          <span className='font-bold tracking-wider'>NEURAL_NET</span>
                          <span className='animate-pulse'>&lt;</span>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center border border-transparent px-3 py-2 text-sm transition-all text-cyan-100  font-mono',
                    selected:
                      'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(34,211,238,0.8)]',
                    today:
                      'border-cyan-400 text-cyan-400 font-bold shadow-[0_0_5px_rgba(34,211,238,0.5)]',
                    weekend: 'text-cyan-300/70',
                    hovered:
                      'border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.3)]',
                    disabled:
                      'bg-red-900/30 text-red-400 border-red-500/30 cursor-not-allowed shadow-[0_0_8px_rgba(239,68,68,0.3)] relative after:content-["X"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-red-300 after:font-bold after:animate-pulse',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>

          <div className='rounded-lg border border-cyan-400/30 bg-gray-900/90 p-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'></div>
              <h3 className='font-mono font-bold tracking-wider text-cyan-400'>
                SYSTEM_FEATURES.EXE
              </h3>
              <div className='h-2 w-2 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]'></div>
            </div>
            <div className='grid grid-cols-1 gap-4 font-mono text-sm md:grid-cols-2'>
              <div className='rounded border border-cyan-400/30 bg-black/50 p-3'>
                <div className='mb-2 flex items-center gap-2'>
                  <span className='font-bold text-cyan-400'>[STATUS]</span>
                  <div className='h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent'></div>
                </div>
                <div className='text-cyan-100/80'>
                  <div className='flex justify-between'>
                    <span>DISABLED_DATES:</span>
                    <span className='animate-pulse text-red-400'>ACTIVE</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>WEEKEND_LOCK:</span>
                    <span className='animate-pulse text-red-400'>ENABLED</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>MAINT_DAYS:</span>
                    <span className='text-red-400'>1,8,15,22,29</span>
                  </div>
                </div>
              </div>
              <div className='rounded border border-cyan-400/30 bg-black/50 p-3'>
                <div className='mb-2 flex items-center gap-2'>
                  <span className='font-bold text-cyan-400'>[PROTOCOL]</span>
                  <div className='h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent'></div>
                </div>
                <div className='text-xs text-cyan-100/80'>
                  <div>• System maintenance on specified dates</div>
                  <div>• Weekend access restricted</div>
                  <div>• X marks indicate blocked access</div>
                  <div>• Red glow indicates security lockdown</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const NeumorphismStyle = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-3 rounded-2xl bg-gray-200 px-6 py-3 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(0,0,0,0.1)]'>
          <div className='relative'>
            <select
              value={currentMonth}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
              className='cursor-pointer rounded-xl border-0 bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,1)] transition-all hover:shadow-[3px_3px_8px_rgba(0,0,0,0.15),-3px_-3px_8px_rgba(255,255,255,1)] focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none'
            >
              {months.map((month, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className='relative'>
            <select
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className='cursor-pointer rounded-xl border-0 bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,1)] transition-all hover:shadow-[3px_3px_8px_rgba(0,0,0,0.15),-3px_-3px_8px_rgba(255,255,255,1)] focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none'
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
          <DatePicker.Label
            type='long'
            className='text-sm font-semibold text-gray-700'
          />
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-gray-200 p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-3xl bg-gray-200 p-8 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,1)]'>
            <DatePicker.Provider normalizeHeight={true}>
              <DatePicker.Header
                className='rounded-2xl bg-gray-200 text-gray-700 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,1),inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-3'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-gray-700 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,1)] transition-all hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15)]'
                  >
                    <ChevronLeft size={18} />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-gray-700 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,1)] transition-all hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15)]'
                  >
                    <ChevronRight size={18} />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='rounded-2xl bg-gray-200 p-4 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,1),inset_8px_8px_15px_rgba(0,0,0,0.1)]'
                  weekdayClassName='flex justify-center text-gray-600 font-semibold'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-xl bg-gray-200 p-3 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1),inset_-2px_-2px_8px_rgba(255,255,255,1)]'>
                      <div className='flex items-center justify-center gap-4 text-xs font-semibold text-gray-700'>
                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-[1px_1px_3px_rgba(0,0,0,0.2)]'></div>
                          <span>Day {currentDate.date()}</span>
                        </div>
                        <div className='h-3 w-px bg-gray-400 shadow-[inset_1px_0px_1px_rgba(0,0,0,0.1)]'></div>
                        <span>
                          {currentDate.format('MMM YYYY')} • Q
                          {Math.ceil((currentDate.month() + 1) / 3)}
                        </span>
                        <div className='h-3 w-px bg-gray-400 shadow-[inset_1px_0px_1px_rgba(0,0,0,0.1)]'></div>
                        <div className='flex items-center gap-2'>
                          <span>Soft UI</span>
                          <div className='h-2 w-2 rounded-full bg-gradient-to-br from-pink-400 to-orange-500 shadow-[1px_1px_3px_rgba(0,0,0,0.2)]'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: ' shadow-[inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(0,0,0,0.1)] rounded-lg transition-all px-3 py-2 text-sm cursor-pointer text-gray-700',
                    selected:
                      'bg-blue-400 text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] font-semibold',
                    today:
                      'bg-orange-300 text-orange-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] font-semibold',
                    weekend: 'text-red-500 font-medium',
                  }}
                />
                <DatePicker.Calendar
                  className='rounded-2xl bg-gray-200 p-4 shadow-[inset_-8px_-8px_15px_rgba(255,255,255,1),inset_8px_8px_15px_rgba(0,0,0,0.1)]'
                  weekdayClassName='flex justify-center text-gray-600 font-semibold'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded-xl bg-gray-200 p-3 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1),inset_-2px_-2px_8px_rgba(255,255,255,1)]'>
                      <div className='flex items-center justify-center gap-4 text-xs font-semibold text-gray-700'>
                        <span>{currentDate.format('dddd')}</span>
                        <div className='h-3 w-px bg-gray-400 shadow-[inset_1px_0px_1px_rgba(0,0,0,0.1)]'></div>
                        <span>
                          Week{' '}
                          {Math.ceil((currentDate.date() + currentDate.startOf('month').day()) / 7)}
                        </span>
                        <div className='h-3 w-px bg-gray-400 shadow-[inset_1px_0px_1px_rgba(0,0,0,0.1)]'></div>
                        <div className='flex items-center gap-2'>
                          <span>Depth</span>
                          <div className='h-2 w-2 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-[1px_1px_3px_rgba(0,0,0,0.2)]'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'shadow-[inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(0,0,0,0.1)] rounded-lg transition-all px-3 py-2 text-sm cursor-pointer text-gray-700',
                    selected:
                      'bg-blue-400 text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] font-semibold',
                    today:
                      'bg-orange-300 text-orange-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] font-semibold',
                    weekend: 'text-red-500 font-medium',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const RetroVintageStyle = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='flex items-center gap-4 rounded-lg border-2 border-amber-600 bg-gradient-to-b from-amber-100 to-amber-200 px-6 py-4 shadow-lg'>
          <CalendarDays
            size={24}
            className='text-amber-700'
          />
          <div className='flex flex-col items-center'>
            <DatePicker.Label
              type='long'
              className='font-serif text-xl font-bold text-amber-800'
            />
            <div className='mt-2 flex items-center gap-3'>
              <div className='relative'>
                <select
                  value={currentMonth}
                  onChange={(e) => onMonthChange(parseInt(e.target.value))}
                  className='cursor-pointer rounded border-2 border-amber-600 bg-amber-300 px-3 py-2 font-serif font-bold text-amber-800 shadow-md transition-all hover:bg-amber-400 focus:outline-none active:translate-y-px active:shadow-sm'
                >
                  {months.map((month, index) => (
                    <option
                      key={index}
                      value={index}
                      className='bg-amber-100'
                    >
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className='relative'>
                <select
                  value={currentYear}
                  onChange={(e) => onYearChange(parseInt(e.target.value))}
                  className='cursor-pointer rounded border-2 border-amber-600 bg-amber-300 px-3 py-2 font-serif font-bold text-amber-800 shadow-md transition-all hover:bg-amber-400 focus:outline-none active:translate-y-px active:shadow-sm'
                >
                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                      className='bg-amber-100'
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='rounded-2xl border-4 border-amber-600 bg-gradient-to-b from-amber-100 to-orange-200 p-8 shadow-2xl'>
            <DatePicker.Provider
              initialMonth={new Date('2025-07-04')}
              normalizeHeight={true}
            >
              <DatePicker.Header
                className='rounded-lg border-2 border-amber-600 bg-gradient-to-r from-amber-200 to-orange-300 text-amber-900 shadow-lg'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-4'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer rounded-full border-2 border-amber-600 bg-amber-300 px-4 py-3 text-amber-800 shadow-lg transition-all hover:bg-amber-400 active:translate-y-px active:shadow-md'
                  >
                    <ChevronLeft
                      size={20}
                      strokeWidth={3}
                    />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer rounded-full border-2 border-amber-600 bg-amber-300 px-4 py-3 text-amber-800 shadow-lg transition-all hover:bg-amber-400 active:translate-y-px active:shadow-md'
                  >
                    <ChevronRight
                      size={20}
                      strokeWidth={3}
                    />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='border-2 border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 p-4'
                  weekdayClassName='flex justify-center text-amber-700 font-serif font-bold'
                  footerSlot={({ currentDate }) => (
                    <div className='mt-4 rounded border-2 border-amber-600 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 p-3 shadow-lg'>
                      <div className='flex items-center justify-between font-serif text-xs font-bold text-amber-800'>
                        <div className='flex items-center gap-2'>
                          <div className='h-3 w-3 rounded-full border-2 border-amber-700 bg-amber-400 shadow-md'></div>
                          <span className='tracking-wide'>VINTAGE EST. 1924</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent'>
                            {currentDate.format('dddd, MMMM, YYYY')}
                          </span>
                          <div className='h-3 w-3 rounded-full border-2 border-orange-700 bg-orange-400 shadow-md'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded border-2 border-transparent px-3 py-2 text-sm transition-all text-amber-800 hover:border-amber-500 hover:bg-amber-200 hover:shadow-md font-serif font-medium active:translate-y-px',
                    selected: 'bg-amber-600 text-white border-amber-700 font-bold shadow-lg',
                    today: 'border-orange-500 bg-orange-200 text-orange-800 font-bold',
                    weekend: 'text-red-700 font-bold',
                  }}
                />
                <DatePicker.Calendar
                  className='border-2 border-l-0 border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 p-4'
                  weekdayClassName='flex justify-center text-amber-700 font-serif font-bold'
                  footerSlot={() => (
                    <div className='mt-4 rounded border-2 border-amber-600 bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200 p-3 shadow-lg'>
                      <div className='flex items-center justify-between font-serif text-xs font-bold text-amber-800'>
                        <div className='flex items-center gap-2'>
                          <span className='bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent'>
                            CLASSIC CALENDAR
                          </span>
                          <div className='h-3 w-3 rounded-full border-2 border-red-700 bg-red-400 shadow-md'></div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='h-3 w-3 rounded-full border-2 border-amber-700 bg-yellow-400 shadow-md'></div>
                          <span className='tracking-wide'>HERITAGE DESIGN</span>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center rounded border-2 border-transparent px-3 py-2 text-sm transition-all text-amber-800 hover:border-amber-500 hover:bg-amber-200 hover:shadow-md font-serif font-medium active:translate-y-px',
                    selected: 'bg-amber-600 text-white border-amber-700 font-bold shadow-lg',
                    today: 'border-orange-500 bg-orange-200 text-orange-800 font-bold',
                    weekend: 'text-red-700 font-bold',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const ModernBrutalistStyle = {
  render: () => {
    const CustomDateSelect = () => {
      const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } =
        useDateSelect()

      return (
        <div className='border-4 border-black bg-white p-4'>
          <div className='flex items-center justify-center gap-6'>
            <div className='relative'>
              <select
                value={currentMonth}
                onChange={(e) => onMonthChange(parseInt(e.target.value))}
                className='cursor-pointer border-4 border-black bg-yellow-400 px-4 py-2 font-mono text-xl font-black text-black transition-all hover:bg-yellow-300 focus:outline-none active:translate-x-1 active:translate-y-1 active:shadow-none'
                style={{ boxShadow: '4px 4px 0px 0px black' }}
              >
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={index}
                    className='bg-white text-black'
                  >
                    {month.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col items-center border-4 border-black bg-white px-6 py-3'>
              <DatePicker.Label
                type='long'
                className='font-mono text-2xl font-black tracking-wider text-black uppercase'
              />
            </div>
            <div className='relative'>
              <select
                value={currentYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                className='cursor-pointer border-4 border-black bg-yellow-400 px-4 py-2 font-mono text-xl font-black text-black transition-all hover:bg-yellow-300 focus:outline-none active:translate-x-1 active:translate-y-1 active:shadow-none'
                style={{ boxShadow: '4px 4px 0px 0px black' }}
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className='bg-white text-black'
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='min-h-screen bg-white p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div
            className='border-8 border-black bg-white p-8'
            style={{ boxShadow: '12px 12px 0px 0px black' }}
          >
            <DatePicker.Provider normalizeHeight={true}>
              <DatePicker.Header
                className='border-4 border-black bg-red-500 text-black'
                calendarGridClassName='gap-x-0'
              >
                <CustomDateSelect />
                <div className='flex gap-4'>
                  <DatePicker.Button
                    type='previous'
                    className='cursor-pointer border-4 border-black bg-blue-400 px-4 py-2 text-black transition-all hover:bg-blue-300 active:translate-x-1 active:translate-y-1 active:shadow-none'
                    style={{ boxShadow: '4px 4px 0px 0px black' }}
                  >
                    <ChevronLeft
                      size={20}
                      strokeWidth={4}
                    />
                  </DatePicker.Button>
                  <DatePicker.Button
                    type='next'
                    className='cursor-pointer border-4 border-black bg-blue-400 px-4 py-2 text-black transition-all hover:bg-blue-300 active:translate-x-1 active:translate-y-1 active:shadow-none'
                    style={{ boxShadow: '4px 4px 0px 0px black' }}
                  >
                    <ChevronRight
                      size={20}
                      strokeWidth={4}
                    />
                  </DatePicker.Button>
                </div>
              </DatePicker.Header>
              <div className='flex gap-0'>
                <DatePicker.Calendar
                  className='border-4 border-black bg-white'
                  weekdayClassName='flex justify-center text-black font-mono font-black text-sm'
                  footerSlot={({ currentDate }) => (
                    <div
                      className='mt-2 border-4 border-black bg-red-500 p-3'
                      style={{ boxShadow: '6px 6px 0px 0px black' }}
                    >
                      <div className='flex items-center justify-between font-mono text-sm font-black text-black'>
                        <div className='flex items-center gap-3'>
                          <div className='h-4 w-4 border-2 border-black bg-yellow-400'></div>
                          <span className='tracking-wider uppercase'>
                            DAY {currentDate.date()}/{currentDate.daysInMonth()}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='border-2 border-black bg-white px-2 py-1 uppercase'>
                            Q{Math.ceil((currentDate.month() + 1) / 3)}
                          </span>
                          <div className='h-4 w-4 border-2 border-black bg-blue-400'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center box-border border-2 border-black px-2 py-2 text-sm font-mono font-bold text-black transition-all hover:bg-gray-200 active:translate-x-1 active:translate-y-1 active:shadow-none',
                    selected: 'bg-black text-white font-black',
                    today: 'bg-yellow-400 text-black font-black',
                    weekend: 'bg-red-200 font-black',
                  }}
                />
                <DatePicker.Calendar
                  className='border-4 border-l-0 border-black bg-white'
                  weekdayClassName='flex justify-center text-black font-mono font-black text-sm'
                  footerSlot={({ currentDate }) => (
                    <div
                      className='mt-2 border-4 border-black bg-yellow-400 p-3'
                      style={{ boxShadow: '6px 6px 0px 0px black' }}
                    >
                      <div className='flex items-center justify-between font-mono text-sm font-black text-black'>
                        <div className='flex items-center gap-3'>
                          <div className='h-4 w-4 border-2 border-black bg-red-500'></div>
                          <span className='tracking-wider uppercase'>
                            WK{' '}
                            {Math.ceil(
                              (currentDate.date() + currentDate.startOf('month').day()) / 7
                            )}{' '}
                            • {currentDate.format('dddd').toUpperCase()}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='border-2 border-black bg-white px-2 py-1 uppercase'>
                            {currentDate.format('YYYY')}
                          </span>
                          <div className='h-4 w-4 border-2 border-black bg-blue-400'></div>
                        </div>
                      </div>
                    </div>
                  )}
                  dayButtonClassNames={{
                    base: 'flex w-full cursor-pointer items-center justify-center box-border border-2 border-black px-2 py-2 text-sm font-mono font-bold text-black transition-all hover:bg-gray-200 active:translate-x-1 active:translate-y-1 active:shadow-none',
                    selected: 'bg-black text-white font-black',
                    today: 'bg-yellow-400 text-black font-black',
                    weekend: 'bg-red-200 font-black',
                  }}
                />
              </div>
            </DatePicker.Provider>
          </div>
        </div>
      </div>
    )
  },
}

export const MobileResponsiveTheme = {
  render: () => (
    <div className='min-h-screen bg-gray-50 p-3 sm:p-8'>
      <div className='mx-auto max-w-sm space-y-6 sm:max-w-lg'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <DatePicker.Provider
            type='single'
            normalizeHeight={true}
          >
            <DatePicker.Header
              className='mb-6 rounded-xl bg-gray-900 p-4 text-white shadow-sm'
              calendarGridClassName='gap-x-0'
            >
              <DateSelectExample
                className='flex items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-gray-100'
                popoverTriggerProps={{
                  className:
                    'bg-white hover:bg-gray-50 cursor-pointer rounded-lg px-4 py-3 transition-colors duration-200 font-medium text-gray-800 shadow-sm border border-gray-200 hover:border-gray-300',
                }}
                popoverContentProps={{
                  className: 'bg-white shadow-lg rounded-xl p-4 border border-gray-200',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-gray-700 border-gray-300 rounded-lg px-4 py-3 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-colors duration-200 hover:border-gray-400',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-gray-300 text-gray-700 rounded-xl shadow-lg',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-gray-700 border-gray-300 rounded-lg px-4 py-3 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-colors duration-200 hover:border-gray-400',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-gray-300 text-gray-700 rounded-xl shadow-lg',
                }}
              >
                <DatePicker.Label
                  type='short'
                  className='font-medium text-gray-700 sm:hidden'
                />
                <DatePicker.Label
                  type='long'
                  className='hidden font-medium text-gray-700 sm:block'
                />
              </DateSelectExample>
              <div className='flex gap-3'>
                <DatePicker.Button
                  type='previous'
                  className='cursor-pointer rounded-lg bg-gray-700 p-3 text-gray-200 transition-colors duration-200 hover:bg-gray-600'
                >
                  <ChevronLeft className='h-5 w-5 stroke-2' />
                </DatePicker.Button>
                <DatePicker.Button
                  type='next'
                  className='cursor-pointer rounded-lg bg-gray-700 p-3 text-gray-200 transition-colors duration-200 hover:bg-gray-600'
                >
                  <ChevronRight className='h-5 w-5 stroke-2' />
                </DatePicker.Button>
              </div>
            </DatePicker.Header>
            <DatePicker.Calendar
              className='rounded-xl bg-white'
              weekdayClassName='flex justify-center text-gray-600 font-medium text-sm text-center py-3'
              footerSlot={({ currentDate }) => (
                <div className='flex justify-between rounded-b-xl border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-700'>
                  <span className='flex items-center gap-2 capitalize'>
                    <CalendarDays
                      size={14}
                      strokeWidth={2}
                      className='text-gray-500'
                    />
                    {currentDate.format('MMMM, YYYY')}
                  </span>
                  <span className='flex items-center gap-2'>
                    <Calendar1
                      size={14}
                      strokeWidth={2}
                      className='text-gray-500'
                    />
                    {currentDate.daysInMonth()}
                  </span>
                </div>
              )}
              dayButtonClassNames={{
                base: 'flex w-full cursor-pointer items-center justify-center rounded-lg h-12 text-base transition-colors duration-200 text-gray-700 hover:bg-gray-100 font-medium touch-manipulation border border-transparent hover:border-gray-300',
                selected: 'bg-gray-900 hover:bg-gray-800 text-white font-medium border-gray-900',
                today: 'bg-gray-100 font-medium text-gray-900 border-2 border-gray-300',
                hovered: 'bg-gray-50 text-gray-800 font-medium border-gray-300',
                weekend: 'text-gray-500 font-medium',
                differentMonth: 'text-gray-300 opacity-50',
              }}
            />
          </DatePicker.Provider>
        </div>
      </div>
    </div>
  ),
}

export const PurpleGradientTheme = {
  render: () => (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='rounded-2xl bg-white p-6 shadow-xl'>
          <DatePicker.Provider normalizeHeight={true}>
            <DatePicker.Header
              className='border-2 border-purple-400 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl'
              calendarGridClassName='gap-x-0'
            >
              <DateSelectExample
                className='bg-opacity-20 flex items-center justify-center gap-2 border-2 border-purple-400 bg-purple-600 text-white backdrop-blur-sm'
                popoverTriggerProps={{
                  className:
                    'bg-white bg-opacity-90 hover:bg-opacity-100 cursor-pointer rounded-lg px-4 py-2 transition-all duration-150 ease-out font-bold text-purple-800 shadow-md hover:shadow-lg',
                }}
                popoverContentProps={{
                  className: 'bg-white border-2 border-purple-400 shadow-2xl rounded-xl p-4',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-white text-purple-800 border-purple-400 rounded-lg px-3 py-2 font-bold cursor-pointer hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-150 ease-out',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-purple-400 text-purple-800 rounded-lg shadow-2xl',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-white text-purple-800 border-purple-400 rounded-lg px-3 py-2 font-bold cursor-pointer hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-150 ease-out',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-purple-400 text-purple-800 rounded-lg shadow-2xl',
                }}
              >
                <DatePicker.Label
                  type='long'
                  className='bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-lg font-extrabold tracking-wide text-transparent drop-shadow-sm'
                />
              </DateSelectExample>
              <div className='flex gap-4'>
                <DatePicker.Button
                  type='previous'
                  className='hover:bg-opacity-30 border-opacity-50 bg-opacity-10 cursor-pointer rounded-full border-2 border-white bg-white px-4 py-2 text-white shadow-lg transition-all duration-150 ease-out hover:bg-white hover:shadow-xl'
                >
                  <ChevronLeft
                    className='text-purple-600'
                    strokeWidth={3}
                  />
                </DatePicker.Button>
                <DatePicker.Button
                  type='next'
                  className='hover:bg-opacity-30 border-opacity-50 bg-opacity-10 cursor-pointer rounded-full border-2 border-white bg-white px-4 py-2 text-white shadow-lg transition-all duration-150 ease-out hover:bg-white hover:shadow-xl'
                >
                  <ChevronRight
                    className='text-purple-600'
                    strokeWidth={3}
                  />
                </DatePicker.Button>
              </div>
            </DatePicker.Header>
            <div className='flex gap-0'>
              <DatePicker.Calendar
                className='bg-purple-100 p-4'
                weekdayClassName='flex justify-center text-purple-700 font-semibold'
                footerSlot={({ currentDate }) => (
                  <div className='flex justify-between rounded border-2 border-purple-300 bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-center text-xs font-semibold text-white shadow-lg'>
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
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-purple-900 hover:bg-purple-200 hover:shadow-sm font-medium',
                  selected:
                    'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg outline-1 outline-purple-700',
                  today: 'outline-purple-500 outline -outline-offset-1 font-bold bg-purple-200',
                  hovered: 'bg-purple-200 shadow-md',
                  weekend: 'text-purple-700 font-semibold',
                }}
              />
              <DatePicker.Calendar
                className='bg-purple-100 p-4'
                weekdayClassName='flex justify-center text-purple-700 font-semibold'
                footerSlot={({ currentDate }) => (
                  <div className='flex justify-between rounded border-2 border-purple-300 bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-center text-xs font-semibold text-white shadow-lg'>
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
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-purple-900 hover:bg-purple-200 hover:shadow-sm font-medium',
                  selected:
                    'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg outline-1 outline-purple-700',
                  today: 'outline-purple-500 outline -outline-offset-1 font-bold bg-purple-200',
                  hovered: 'bg-purple-200 shadow-md',
                  weekend: 'text-purple-700 font-semibold',
                }}
              />
            </div>
          </DatePicker.Provider>
        </div>
      </div>
    </div>
  ),
}

export const MaterialDesignTheme = {
  render: () => (
    <div className='min-h-screen bg-blue-50 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='rounded-3xl border border-blue-100 bg-blue-500 p-8'>
          <DatePicker.Provider
            type='range'
            normalizeHeight={true}
          >
            <DatePicker.Header
              className='rounded-2xl bg-blue-500 text-white'
              calendarGridClassName='gap-x-0'
            >
              <DateSelectExample
                className='flex items-center justify-center gap-3 rounded-xl bg-blue-600/90 px-6 py-3 text-white backdrop-blur-sm'
                popoverTriggerProps={{
                  className:
                    'bg-white hover:bg-blue-50 cursor-pointer rounded-xl px-4 py-3 transition-all duration-200 ease-out font-semibold text-blue-700 shadow-lg border border-blue-200 hover:shadow-xl hover:border-blue-300',
                }}
                popoverContentProps={{
                  className: 'bg-white shadow-2xl rounded-2xl p-4 border border-blue-100',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-blue-50 text-blue-700 border-blue-200 rounded-xl px-4 py-3 font-semibold cursor-pointer hover:bg-blue-100 shadow-lg transition-all duration-200 ease-out hover:shadow-xl hover:border-blue-400',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-blue-200 text-blue-700 rounded-xl shadow-2xl',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-blue-50 text-blue-700 border-blue-200 rounded-xl px-4 py-3 font-semibold cursor-pointer hover:bg-blue-100 shadow-lg transition-all duration-200 ease-out hover:shadow-xl hover:border-blue-400',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-blue-200 text-blue-700 rounded-xl shadow-2xl',
                }}
              >
                <DatePicker.Label
                  type='long'
                  className='font-semibold tracking-wide text-blue-600 drop-shadow-lg'
                />
              </DateSelectExample>
              <div className='flex gap-4'>
                <DatePicker.Button
                  type='previous'
                  className='cursor-pointer rounded-full bg-white/20 px-4 py-4 text-white shadow-xl transition-all duration-200 ease-out hover:bg-white/30 hover:shadow-2xl'
                >
                  <ChevronLeft
                    size={20}
                    strokeWidth={3}
                    className='text-white'
                  />
                </DatePicker.Button>
                <DatePicker.Button
                  type='next'
                  className='cursor-pointer rounded-full bg-white/20 px-4 py-4 text-white shadow-xl transition-all duration-200 ease-out hover:bg-white/30 hover:shadow-2xl'
                >
                  <ChevronRight
                    size={20}
                    strokeWidth={3}
                    className='text-white'
                  />
                </DatePicker.Button>
              </div>
            </DatePicker.Header>
            <div className='flex gap-0'>
              <DatePicker.Calendar
                className='rounded-2xl rounded-r-none border border-r-0 border-blue-100 bg-white p-6'
                weekdayClassName='flex justify-center text-blue-600 font-bold tracking-widest text-sm'
                footerSlot={({ currentDate }) => (
                  <div className='mt-4 flex justify-between rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 text-center text-sm font-bold text-blue-700 shadow-lg'>
                    <span className='flex items-center gap-2 capitalize'>
                      <CalendarDays
                        size={16}
                        strokeWidth={2}
                        className='text-blue-500'
                      />
                      {currentDate.format('MMMM, YYYY')}
                    </span>
                    <span className='flex items-center gap-2'>
                      <Calendar1
                        size={16}
                        strokeWidth={2}
                        className='text-blue-500'
                      />
                      Range Selection
                    </span>
                  </div>
                )}
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-2xl aspect-square px-2 py-2 text-sm transition-all duration-200 ease-out text-gray-700 hover:bg-blue-50 hover:shadow-lg font-semibold border border-transparent hover:border-blue-200',
                  selected:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400',
                  rangeStart:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400 rounded-l-2xl rounded-r-md',
                  rangeEnd:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400 rounded-r-2xl rounded-l-md',
                  betweenRange:
                    'bg-blue-100 text-blue-700 font-semibold border-blue-200 rounded-none shadow-md',
                  today:
                    'bg-blue-50 font-bold text-blue-600 ring-2 ring-blue-300 ring-offset-2 shadow-lg',
                  hovered: 'bg-blue-100 text-blue-800 shadow-lg font-bold border-blue-300',
                  weekend: 'text-gray-500 font-bold',
                  differentMonth: 'text-blue-300 opacity-60',
                }}
              />
              <DatePicker.Calendar
                className='rounded-2xl rounded-l-none border border-l-0 border-blue-100 bg-white p-6'
                weekdayClassName='flex justify-center text-blue-600 font-bold tracking-widest text-sm'
                footerSlot={({ currentDate }) => (
                  <div className='mt-4 flex justify-between rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-100 to-blue-50 p-4 text-center text-sm font-bold text-blue-700 shadow-lg'>
                    <span className='flex items-center gap-2'>Material Design</span>
                    <span className='flex items-center gap-2'>
                      <Calendar1
                        size={16}
                        strokeWidth={2}
                        className='text-blue-500'
                      />
                      {currentDate.daysInMonth()} Days
                    </span>
                  </div>
                )}
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-2xl aspect-square px-2 py-2 text-sm transition-all duration-200 ease-out text-gray-700 hover:bg-blue-50 hover:shadow-lg font-semibold border border-transparent hover:border-blue-200',
                  selected:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400',
                  rangeStart:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400 rounded-l-2xl rounded-r-md',
                  rangeEnd:
                    'bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-xl border-blue-400 rounded-r-2xl rounded-l-md',
                  betweenRange:
                    'bg-blue-100 text-blue-700 font-semibold border-blue-200 rounded-none shadow-md',
                  today:
                    'bg-blue-50 font-bold text-blue-600 ring-2 ring-blue-300 ring-offset-2 shadow-lg',
                  hovered: 'bg-blue-100 text-blue-800 shadow-lg font-bold border-blue-300',
                  weekend: 'text-gray-500 font-bold',
                  differentMonth: 'text-blue-300 opacity-60',
                }}
              />
            </div>
          </DatePicker.Provider>
        </div>
      </div>
    </div>
  ),
}
