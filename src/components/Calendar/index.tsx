import { useDatePicker } from '@/hooks/useDatePicker'
import type { CalendarProps } from '@/types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { DayButton } from './DayButton'
import styles from './Calendar.module.css'

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
  const firstDayOfWeek = dayjs().localeData().firstDayOfWeek()
  const weekdayLabelsArray = dayjs().localeData().weekdaysShort()
  const weekdays = [
    ...weekdayLabelsArray.slice(firstDayOfWeek),
    ...weekdayLabelsArray.slice(0, firstDayOfWeek),
  ]
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
    if (!!header && calendarRef.current) {
      handleAddCalendarRef({ current: calendarRef.current })
    }
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
        clsx(styles.calendar, (!header || !shouldRenderInsideHeader) && styles.calendarWithShadow)
      }
    >
      {showWeekdays && (
        <div className={styles.weekdays}>
          {weekdays.map((_, index) => (
            <span
              className={weekdayClassName || styles.weekday}
              key={index}
            >
              {getCustomWeekdayLabel(index)}
            </span>
          ))}
        </div>
      )}
      <div className={styles.daysContainer}>
        {Array.from(monthTable.keys()).map((week) => (
          <div
            key={week}
            className={styles.daysGrid}
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
