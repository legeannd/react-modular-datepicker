import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps } from '../../types'

dayjs.extend(isToday)

export function Calendar({ showWeekdays = true, weekdayLabels }: CalendarProps) {
  const { month: monthHash, selected, handleDateClick } = useDatePicker()
  const weekdays = dayjs.weekdaysShort()
  const isWeekend = (index: number) => index === 0 || index === 6
  const getCustomWeekdayLabel = (index: number) => {
    if (weekdayLabels && weekdayLabels[index]) {
      return weekdayLabels[index]
    }
    return weekdays[index]
  }

  return (
    <div className={styles.container}>
      {weekdays.map((weekday, index) => (
        <div key={weekday}>
          {showWeekdays && <span className={styles.dayLabel}>{getCustomWeekdayLabel(index)}</span>}
          <span className={clsx(styles.dayRow, isWeekend(index) && styles.weekendRow)}>
            {monthHash[weekday].map(({ day, isCurrentMonth }) => (
              <button
                data-today={dayjs(day.date).isToday()}
                data-start-month={
                  dayjs(day.date).isSame(dayjs(day.date).startOf('M')) && isCurrentMonth
                }
                data-end-month={
                  dayjs(day.date).isSame(dayjs(day.date).endOf('M')) && isCurrentMonth
                }
                data-this-month={isCurrentMonth}
                data-selected={dayjs(selected?.day.date).isSame(day.date)}
                key={day.date}
                onClick={() => handleDateClick({ day, isCurrentMonth })}
                aria-label={dayjs(day.date).format('MMMM D, YYYY')}
              >
                {day.label}
              </button>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
