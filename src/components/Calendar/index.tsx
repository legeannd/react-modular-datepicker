import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps } from '../../types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { DayButton } from './DayButton'

dayjs.extend(isToday)

export function Calendar({ showWeekdays = true, weekdayLabels, id }: CalendarProps) {
  const calendarRef = useRef<{ updateMonthTable: (newDate?: string | Date) => void } | null>(null)
  const { header, groupingMode, handleAddCalendarRef, createMonthTable } = useDatePicker()
  const [monthTable, setMonthTable] = useState(createMonthTable())
  const weekdays = dayjs.weekdaysShort()
  const calendarLabel = dayjs(monthTable.get(1)?.[0].day.date).format('MMMM, YYYY')
  const shouldRenderInsideHeader = groupingMode === 'all' || (!!id && groupingMode.includes(id))
  const renderOnPortal = !!header && shouldRenderInsideHeader

  const getCustomWeekdayLabel = (index: number) => {
    if (weekdayLabels && weekdayLabels[index]) {
      return weekdayLabels[index]
    }
    return weekdays[index]
  }

  useEffect(() => {
    if (header && calendarRef.current) {
      handleAddCalendarRef({ current: calendarRef.current })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header])

  useImperativeHandle(
    calendarRef,
    () => ({
      updateMonthTable: (newDate?: string | Date) => {
        const updatedMonthTable = createMonthTable(newDate)
        setMonthTable(updatedMonthTable)
      },
    }),
    [createMonthTable]
  )

  const body = (
    <div
      id={id}
      aria-label={calendarLabel}
      className={twMerge(
        'flex flex-col gap-1 rounded-lg bg-white p-1',
        (!header || !shouldRenderInsideHeader) && 'shadow-md'
      )}
    >
      {showWeekdays && (
        <span className={twMerge('text-label grid grid-cols-7 text-xs')}>
          {weekdays.map((_, index) => (
            <span
              className={twMerge('flex items-center justify-center px-0 py-2')}
              key={index}
            >
              {getCustomWeekdayLabel(index)}
            </span>
          ))}
        </span>
      )}
      <div className={twMerge('flex flex-col gap-1')}>
        {Array.from(monthTable.keys()).map((week) => (
          <div
            key={week}
            className={twMerge('grid grid-cols-7 gap-0.5')}
          >
            {monthTable.get(week)?.map((currentDay) => (
              <DayButton
                key={currentDay.day.date}
                currentDay={currentDay}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return renderOnPortal ? createPortal(body, header) : body
}
