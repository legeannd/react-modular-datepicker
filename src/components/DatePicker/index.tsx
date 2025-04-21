import { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import styles from './styles.module.css'

dayjs.extend(localeData)

interface CurrentDay {
  day: number
  isCurrentMonth: boolean
}

export function DatePicker() {
  const [selected, setSelected] = useState<CurrentDay | null>(null)
  const date = dayjs()
  const weekdays = useMemo(() => dayjs.weekdaysShort(), [])
  const startWeekday = date.startOf('M').day()
  const prevMonthDays = Array.from(Array(date.subtract(1, 'month').daysInMonth()).keys())
  const nextMonth = date.add(1, 'month')
  const startWeekdayNextMonth = nextMonth.startOf('M').day()
  const monthHash: { [key: string]: CurrentDay[] } = {}

  Array.from(Array(startWeekday).keys()).forEach((day) => {
    const currDay = {
      day: prevMonthDays[prevMonthDays.length - (startWeekday - day)] + 1,
      isCurrentMonth: false,
    }
    monthHash[weekdays[day]] = [currDay]
  })
  Array.from(Array(date.daysInMonth()).keys()).forEach((day) => {
    const weekdayValue = (day + startWeekday) % weekdays.length
    const weekdayKey = weekdays[weekdayValue]
    const currDay = { day: day + 1, isCurrentMonth: true }
    if (!monthHash[weekdayKey]) {
      monthHash[weekdayKey] = [currDay]
    } else {
      monthHash[weekdayKey] = [...monthHash[weekdayKey], currDay]
    }
  })
  Array.from(Array(weekdays.length - startWeekdayNextMonth).keys()).forEach((day) => {
    const currDay = { day: day + 1, isCurrentMonth: false }
    monthHash[weekdays[startWeekdayNextMonth + day]] = [
      ...monthHash[weekdays[startWeekdayNextMonth + day]],
      currDay,
    ]
  })

  const handleDateClick = useCallback((day: CurrentDay) => {
    setSelected(day)
  }, [])

  return (
    <div className={styles.container}>
      {weekdays.map((weekday) => (
        <div
          key={weekday}
          className={styles.calendar}
        >
          <span className={styles.dayLabel}>{weekday}</span>
          <span className={styles.dayRow}>
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
