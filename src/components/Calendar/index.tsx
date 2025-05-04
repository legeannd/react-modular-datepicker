import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps } from '../../types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

dayjs.extend(isToday)

export function Calendar({ showWeekdays = true, weekdayLabels }: CalendarProps) {
  const calendarRef = useRef<{ updateMonthTable: (newDate?: string | Date) => void } | null>(null)
  const { selected, header, handleDateClick, handleAddCalendarRef, createMonthTable } =
    useDatePicker()
  const [monthTable, setMonthTable] = useState(createMonthTable())
  const weekdays = dayjs.weekdaysShort()
  const isWeekend = (date: string) => {
    const dayOfWeek = dayjs(date).day()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className={clsx(styles.container, !header && styles.containerShadow)}>
      {showWeekdays && (
        <span className={styles.dayLabel}>
          {weekdays.map((_, index) => (
            <span key={index}>{getCustomWeekdayLabel(index)}</span>
          ))}
        </span>
      )}
      <div className={styles.dayRows}>
        {Array.from(monthTable.keys()).map((week) => (
          <div
            key={week}
            className={styles.dayRow}
          >
            {monthTable.get(week)?.map(({ day, isCurrentMonth }) => (
              <button
                className={clsx(isWeekend(day.date) && styles.weekendDay)}
                data-today={dayjs(day.date).isToday()}
                data-start-month={
                  dayjs(day.date).isSame(dayjs(day.date).startOf('M').startOf('D')) &&
                  isCurrentMonth
                }
                data-end-month={
                  dayjs(day.date).isSame(dayjs(day.date).endOf('M').startOf('D')) && isCurrentMonth
                }
                data-this-month={isCurrentMonth}
                data-selected={
                  header
                    ? dayjs(selected?.day.date).isSame(day.date) && isCurrentMonth
                    : dayjs(selected?.day.date).isSame(day.date)
                }
                key={day.date}
                onClick={() => handleDateClick({ day, isCurrentMonth })}
                aria-label={dayjs(day.date).format('MMMM D, YYYY')}
              >
                {day.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return header ? createPortal(body, header) : body
}
