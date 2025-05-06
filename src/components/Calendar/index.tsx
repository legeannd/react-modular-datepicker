import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps, CurrentDay } from '../../types'
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

  const getStartAndEndRangeDates = (type: 'start' | 'end', { day: dayToCompare }: CurrentDay) => {
    if (selected.selection && selected.type === 'range' && selected.selection[type]) {
      return dayjs(selected.selection[type]?.day.date).isSame(dayToCompare.date)
    }
    return false
  }

  const getBetweenRangeDates = ({ day }: CurrentDay) => {
    const current = dayjs(day.date)
    if (selected.type === 'range' && selected.selection?.start && selected.selection?.end) {
      if (
        current.isAfter(selected.selection?.start?.day.date, 'day') &&
        current.isBefore(selected.selection.end.day.date, 'day')
      ) {
        return true
      }
    }
    return false
  }

  const getSelectedDates = (clicked: CurrentDay) => {
    if (header && !clicked.isCurrentMonth) {
      return false
    }
    const { day } = clicked
    switch (selected.type) {
      case 'single':
        return dayjs(selected.selection?.day.date).isSame(day.date)
      case 'multiple':
        return selected.selection?.some((date) => dayjs(date.day.date).isSame(day.date))
      case 'range':
        return (
          getStartAndEndRangeDates('start', clicked) || getStartAndEndRangeDates('end', clicked)
        )
      default:
        return false
    }
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
            {monthTable.get(week)?.map((currentDay) => (
              <button
                className={clsx(isWeekend(currentDay.day.date) && styles.weekendDay)}
                data-today={dayjs(currentDay.day.date).isToday()}
                data-start-month={
                  dayjs(currentDay.day.date).isSame(
                    dayjs(currentDay.day.date).startOf('M').startOf('D')
                  ) && currentDay.isCurrentMonth
                }
                data-end-month={
                  dayjs(currentDay.day.date).isSame(
                    dayjs(currentDay.day.date).endOf('M').startOf('D')
                  ) && currentDay.isCurrentMonth
                }
                data-this-month={currentDay.isCurrentMonth}
                data-selected={getSelectedDates(currentDay)}
                data-start-range={getStartAndEndRangeDates('start', currentDay)}
                data-end-range={getStartAndEndRangeDates('end', currentDay)}
                data-between-range={getBetweenRangeDates(currentDay)}
                key={currentDay.day.date}
                onClick={() => handleDateClick(currentDay)}
                aria-label={dayjs(currentDay.day.date).format('MMMM D, YYYY')}
              >
                {currentDay.day.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return header ? createPortal(body, header) : body
}
