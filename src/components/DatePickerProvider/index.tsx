import { useCallback, useMemo, useState } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { DatePickerContext } from '../../contexts/DatePickerContext'
import { CurrentDay, DatePickerProviderProps } from '../../types'

dayjs.extend(localeData)

export function DatePickerProvider({ children }: DatePickerProviderProps) {
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
    <DatePickerContext.Provider
      value={{ selected, month: monthHash, date: date.toISOString(), handleDateClick }}
    >
      <div className={styles['datepicker-container']}>{children}</div>
    </DatePickerContext.Provider>
  )
}
