import { useEffect, useState } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HeaderProps } from '../../types'

export function Header({ groupingMode }: HeaderProps) {
  const { initialDate, calendarRefs, handleSetHeaderRef, handleSetGroupingMode } = useDatePicker()
  const [date, setDate] = useState(dayjs(initialDate))
  const [monthRangeText, setMonthRangeText] = useState(dayjs.monthsShort()[date.get('M')])

  const handleChangeCalendarRange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setDate((prev) => prev.add(1, 'month'))
    } else {
      setDate((prev) => prev.subtract(1, 'month'))
    }
  }

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
      <div className='text-label flex items-center justify-between gap-8 p-4 font-bold'>
        <div className='flex gap-4'>
          <span>{date.year()}</span>
          <span>{monthRangeText}</span>
        </div>
        <div className='flex gap-4'>
          <button
            className='hover:bg-hover cursor-pointer rounded-lg px-2 py-1 transition-colors duration-200 ease-in-out'
            onClick={() => handleChangeCalendarRange('decrement')}
          >
            <ChevronLeft className='text-label' />
          </button>
          <button
            className={
              'hover:bg-hover cursor-pointer rounded-lg px-2 py-1 transition-colors duration-200 ease-in-out'
            }
            onClick={() => handleChangeCalendarRange('increment')}
          >
            <ChevronRight className='text-label' />
          </button>
        </div>
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
