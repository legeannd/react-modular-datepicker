import { useCallback } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'

export function Calendar() {
  const { weekdays, month: monthHash, selected, date: ISODate, handleDateClick } = useDatePicker()
  const date = dayjs(ISODate)
  const isWeekend = useCallback((index: number) => index === 0 || index === 6, [])

  return (
    <div className={styles.container}>
      {weekdays.map((weekday, index) => (
        <div key={weekday}>
          <span className={styles.dayLabel}>{weekday}</span>
          <span className={clsx(styles.dayRow, isWeekend(index) && styles.weekendRow)}>
            {monthHash[weekday].map((dayProps) => (
              <button
                data-today={dayProps.day === date.date()}
                data-start-month={
                  dayProps.day === date.startOf('M').date() && dayProps.isCurrentMonth
                }
                data-end-month={dayProps.day === date.endOf('M').date() && dayProps.isCurrentMonth}
                data-this-month={dayProps.isCurrentMonth}
                data-selected={
                  selected?.day === dayProps.day &&
                  selected.isCurrentMonth === dayProps.isCurrentMonth
                }
                key={dayProps.day}
                onClick={() => handleDateClick(dayProps)}
              >
                {dayProps.day}
              </button>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
