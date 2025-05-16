import styles from './styles.module.css'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps } from '../../types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { DayButton } from './DayButton'

dayjs.extend(isToday)

export function Calendar({ showWeekdays = true, weekdayLabels }: CalendarProps) {
  const calendarRef = useRef<{ updateMonthTable: (newDate?: string | Date) => void } | null>(null)
  const { header, handleAddCalendarRef, createMonthTable } = useDatePicker()
  const [monthTable, setMonthTable] = useState(createMonthTable())
  const weekdays = dayjs.weekdaysShort()

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
    <div className={twMerge(styles.container, !header && styles.containerShadow)}>
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

  return header ? createPortal(body, header) : body
}
