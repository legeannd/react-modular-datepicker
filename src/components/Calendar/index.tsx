import { useDatePicker } from '@/hooks/useDatePicker'
import type { CalendarProps } from '@/types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { DayButton } from './DayButton'

export function Calendar({
  showWeekdays = true,
  weekdayLabels,
  weekdayClassName,
  id,
  footerSlot,
  dayButtonClassNames,
  className,
  ...props
}: CalendarProps) {
  const calendarRef = useRef<{ updateMonthTable: (newDate?: string | Date) => void } | null>(null)
  const { header, groupingMode, handleAddCalendarRef, createMonthTable, dayjs } = useDatePicker()
  const [monthTable, setMonthTable] = useState(createMonthTable())
  const weekdays = dayjs().localeData().weekdaysShort()
  const currentDate = dayjs(monthTable.get(1)?.[0].day.date)
  const calendarLabel = currentDate.format('MMMM, YYYY')
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
      {...props}
      id={id}
      aria-label={calendarLabel}
      className={
        className ||
        cn(
          'flex flex-col gap-1 rounded-lg bg-white p-1',
          (!header || !shouldRenderInsideHeader) && 'shadow-md'
        )
      }
    >
      {showWeekdays && (
        <span className={cn('text-label grid grid-cols-7 text-xs', weekdayClassName)}>
          {weekdays.map((_, index) => (
            <span
              className={'flex items-center justify-center px-0 py-2 capitalize'}
              key={index}
            >
              {getCustomWeekdayLabel(index)}
            </span>
          ))}
        </span>
      )}
      <div className={'flex flex-col gap-1'}>
        {Array.from(monthTable.keys()).map((week) => (
          <div
            key={week}
            className={'grid grid-cols-7 gap-0.5'}
          >
            {monthTable.get(week)?.map((currentDay) => (
              <DayButton
                key={currentDay.day.date}
                currentDay={currentDay}
                dayButtonClassNames={dayButtonClassNames}
              />
            ))}
          </div>
        ))}
      </div>
      {footerSlot && footerSlot({ currentDate })}
    </div>
  )

  return renderOnPortal ? createPortal(body, header) : body
}
