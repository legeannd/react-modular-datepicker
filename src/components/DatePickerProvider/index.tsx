import { useState } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { DatePickerContext } from '../../contexts/DatePickerContext'
import { CurrentDay, DatePickerProviderProps } from '../../types'

dayjs.extend(localeData)

export function DatePickerProvider({
  children,
  initialDate = new Date(),
}: DatePickerProviderProps) {
  const [selected, setSelected] = useState<CurrentDay | null>(null)
  const date = dayjs(initialDate).startOf('day')
  const weekdays = dayjs.weekdaysShort()
  const startWeekday = date.startOf('M').day()
  const prevMonthDays = Array.from(Array(date.subtract(1, 'month').daysInMonth()).keys())
  const nextMonth = date.add(1, 'month')
  const startWeekdayNextMonth = nextMonth.startOf('M').day()
  const monthHash: { [key: string]: CurrentDay[] } = {}

  Array.from(Array(startWeekday).keys()).forEach((day) => {
    const currDay = {
      day: {
        label: prevMonthDays[prevMonthDays.length - (startWeekday - day)] + 1,
        date: date
          .subtract(1, 'month')
          .date(prevMonthDays[prevMonthDays.length - (startWeekday - day)] + 1)
          .startOf('day')
          .toISOString(),
      },
      isCurrentMonth: false,
    }
    monthHash[weekdays[day]] = [currDay]
  })
  Array.from(Array(date.daysInMonth()).keys()).forEach((day) => {
    const weekdayValue = (day + startWeekday) % weekdays.length
    const weekdayKey = weekdays[weekdayValue]
    const currDay = {
      day: {
        label: day + 1,
        date: date
          .date(day + 1)
          .startOf('day')
          .toISOString(),
      },
      isCurrentMonth: true,
    }
    if (!monthHash[weekdayKey]) {
      monthHash[weekdayKey] = [currDay]
    } else {
      monthHash[weekdayKey] = [...monthHash[weekdayKey], currDay]
    }
  })
  Array.from(Array(weekdays.length - startWeekdayNextMonth).keys()).forEach((day) => {
    const currDay = {
      day: {
        label: day + 1,
        date: date
          .add(1, 'month')
          .date(day + 1)
          .startOf('day')
          .toISOString(),
      },
      isCurrentMonth: false,
    }
    monthHash[weekdays[startWeekdayNextMonth + day]] = [
      ...monthHash[weekdays[startWeekdayNextMonth + day]],
      currDay,
    ]
  })

  const handleDateClick = (day: CurrentDay) => {
    setSelected(day)
  }

  return (
    <DatePickerContext.Provider value={{ selected, month: monthHash, handleDateClick }}>
      <div className={styles['datepicker-container']}>{children}</div>
    </DatePickerContext.Provider>
  )
}
