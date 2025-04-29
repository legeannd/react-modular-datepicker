import { useCallback, useMemo } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import { CalendarProps } from '../../types'

export function Calendar({ showWeekdays = true, weekdayLabels }: CalendarProps) {
  const { month: monthHash, selected, date: ISODate, handleDateClick } = useDatePicker()
  const date = dayjs(ISODate)
  const weekdays = useMemo(() => dayjs.weekdaysShort(), [])
  const isWeekend = useCallback((index: number) => index === 0 || index === 6, [])
  const getCustomWeekdayLabel = useCallback(
    (index: number) => {
      if (weekdayLabels && weekdayLabels[index]) {
        return weekdayLabels[index]
      }
      return weekdays[index]
    },
    [weekdays, weekdayLabels]
  )

  return (
    <div className={styles.container}>
      {weekdays.map((weekday, index) => (
        <div key={weekday}>
          {showWeekdays && <span className={styles.dayLabel}>{getCustomWeekdayLabel(index)}</span>}
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
