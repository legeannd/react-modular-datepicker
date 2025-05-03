import styles from './styles.module.css'
import clsx from 'clsx'
import { useDatePicker } from '../../hooks/useDatePicker'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarProps } from '../../types'

dayjs.extend(isToday)

export function Calendar({ showWeekdays = true, weekdayLabels }: CalendarProps) {
  const { month: monthTable, selected, handleDateClick } = useDatePicker()
  const weekdays = dayjs.weekdaysShort()
  const isWeekend = (week: string) => monthTable[week][0] || monthTable[week][6]
  const getCustomWeekdayLabel = (index: number) => {
    if (weekdayLabels && weekdayLabels[index]) {
      return weekdayLabels[index]
    }
    return weekdays[index]
  }

  return (
    <div className={styles.container}>
      {showWeekdays && (
        <span className={styles.dayLabel}>
          {weekdays.map((_, index) => (
            <span>{getCustomWeekdayLabel(index)}</span>
          ))}
        </span>
      )}
      <div className={styles.dayRows}>
        {Array.from(Object.keys(monthTable)).map((week) => (
          <div
            key={week}
            className={clsx(styles.dayRow, isWeekend(week) && styles.weekendRow)}
          >
            {monthTable[week].map(({ day, isCurrentMonth }) => (
              <button
                data-today={dayjs(day.date).isToday()}
                data-start-month={
                  dayjs(day.date).isSame(dayjs(day.date).startOf('M').startOf('D')) &&
                  isCurrentMonth
                }
                data-end-month={
                  dayjs(day.date).isSame(dayjs(day.date).endOf('M').startOf('D')) && isCurrentMonth
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
          </div>
        ))}
      </div>
    </div>
  )
}
