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
  const startOfMonth = date.startOf('month')
  const endOfMonth = date.endOf('month')
  const monthTable: { [key: number]: CurrentDay[] } = {}

  let currentDay = startOfMonth.startOf('week')
  let week = 0
  while (currentDay.isBefore(endOfMonth.endOf('week'))) {
    if (!monthTable[week]) {
      monthTable[week] = []
    }

    monthTable[week].push({
      day: {
        label: currentDay.date(),
        date: currentDay.toISOString(),
      },
      isCurrentMonth: currentDay.month() === date.month(),
    })

    currentDay = currentDay.add(1, 'day')

    if (currentDay.day() === 0) {
      week++
    }
  }

  const handleDateClick = (day: CurrentDay) => {
    setSelected(day)
  }

  return (
    <DatePickerContext.Provider value={{ selected, month: monthTable, handleDateClick }}>
      <div className={styles['datepicker-container']}>{children}</div>
    </DatePickerContext.Provider>
  )
}
