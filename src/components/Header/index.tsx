import { useEffect, useState } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import { Calendar1, CalendarDays, CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react'
import { HeaderProps } from '../../types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function Header({ groupingMode, enablePeriodChange = true }: HeaderProps) {
  const { startDate, calendarRefs, type, handleSetHeaderRef, handleSetGroupingMode } =
    useDatePicker()
  const [date, setDate] = useState(dayjs(startDate))
  const month = dayjs.monthsShort()[date.get('M')]
  const [monthRangeText, setMonthRangeText] = useState(month)

  const calendarIcon =
    type === 'single' ? <Calendar1 /> : type === 'multiple' ? <CalendarDays /> : <CalendarRange />

  const handleChangeCalendarRange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setDate((prev) => prev.add(1, 'month'))
    } else {
      setDate((prev) => prev.subtract(1, 'month'))
    }
  }

  const handleChangeCalendarStartPeriod = (field: 'month' | 'year', value: string) => {
    const newDate = dayjs(date).set(field, Number(value))
    setDate(newDate)
  }

  const yearRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  useEffect(() => {
    let newDate = date
    calendarRefs.forEach((ref, index) => {
      ref.updateMonthTable(newDate.toISOString())
      if (index < calendarRefs.length - 1) {
        newDate = newDate.add(1, 'month')
      }
    })
    if (newDate.isAfter(date) && newDate.diff(date, 'month') >= 1) {
      setMonthRangeText(
        `${dayjs.monthsShort()[date.get('M')]} - ${dayjs.monthsShort()[newDate.get('M')]}`
      )
    } else {
      setMonthRangeText(`${dayjs.monthsShort()[newDate.get('M')]}`)
    }
  }, [calendarRefs, date])

  useEffect(() => {
    if (groupingMode) {
      handleSetGroupingMode(groupingMode)
    }
  }, [groupingMode, handleSetGroupingMode])

  return (
    <div className='rounded-lg bg-white shadow-md'>
      <div className='text-label flex items-center justify-between gap-8 p-4 text-sm font-bold'>
        <div className='flex items-center gap-2'>
          {calendarIcon}
          <div className='flex items-center gap-4'>
            {enablePeriodChange ? (
              <Popover>
                <PopoverTrigger className='hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out'>
                  {monthRangeText} {date.year()}
                </PopoverTrigger>
                <PopoverContent className='flex w-auto gap-2 p-2'>
                  <Select
                    defaultValue={String(date.get('M'))}
                    onValueChange={(value) => handleChangeCalendarStartPeriod('month', value)}
                  >
                    <SelectTrigger className='text-label rounded'>
                      <SelectValue placeholder={month} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Month</SelectLabel>
                        {Array.from(Array(12).keys()).map((month) => (
                          <SelectItem
                            key={month}
                            value={String(month)}
                          >
                            {dayjs.months()[month]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={String(date.year())}
                    onValueChange={(value) => handleChangeCalendarStartPeriod('year', value)}
                  >
                    <SelectTrigger className='text-label rounded'>
                      <SelectValue placeholder={date.year()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        {yearRange(
                          dayjs(startDate).year() + 10,
                          dayjs(startDate).year() - 40,
                          -1
                        ).map((year) => (
                          <SelectItem
                            key={year}
                            value={String(year)}
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
            ) : (
              <div className='px-2 py-1'>
                {monthRangeText} {date.year()}
              </div>
            )}
          </div>
        </div>
        {enablePeriodChange && (
          <div className='flex gap-4'>
            <button
              className='hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out'
              onClick={() => handleChangeCalendarRange('decrement')}
            >
              <ChevronLeft className='text-label' />
            </button>
            <button
              className={
                'hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out'
              }
              onClick={() => handleChangeCalendarRange('increment')}
            >
              <ChevronRight className='text-label' />
            </button>
          </div>
        )}
      </div>
      <div
        className={
          'grid grid-cols-3 items-end gap-x-4 gap-y-2 [&:has(>*:nth-child(2)):not(:has(>*:nth-child(3)))]:grid-cols-2 [&:has(>*:only-child)]:grid-cols-1'
        }
        id='rmdp-header'
        ref={(ref) => handleSetHeaderRef(ref)}
      ></div>
    </div>
  )
}
