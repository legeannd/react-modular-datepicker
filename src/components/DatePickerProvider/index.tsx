import { useState } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { DatePickerContext } from '../../contexts/DatePickerContext'
import { CalendarRefObject, CurrentDay, DatePickerProviderProps } from '../../types'

dayjs.extend(localeData)

export function DatePickerProvider({
  children,
  initialDate = new Date(),
}: DatePickerProviderProps) {
  const [selected, setSelected] = useState<CurrentDay | null>(null)
  const [headerRef, setHeaderRef] = useState<HTMLDivElement | null>(null)
  const [calendarRefs, setCalendarRefs] = useState<
    { updateMonthTable: (newDate: string | Date) => void }[]
  >([])

  const createMonthTable = (tableDate = initialDate) => {
    const date = dayjs(tableDate).startOf('day')
    const startOfMonth = date.startOf('month')
    const endOfMonth = date.endOf('month')
    const monthTable = new Map<number, CurrentDay[]>()
    let currentDay = startOfMonth.startOf('week')
    let week = 0
    while (currentDay.isBefore(endOfMonth.endOf('week'))) {
      const weekDays = monthTable.get(week) || []
      weekDays.push({
        day: {
          label: currentDay.date(),
          date: currentDay.toISOString(),
        },
        isCurrentMonth: currentDay.month() === date.month(),
      })
      monthTable.set(week, weekDays)

      currentDay = currentDay.add(1, 'day')

      if (currentDay.day() === 0) {
        week++
      }
    }

    return monthTable
  }

  const handleDateClick = (day: CurrentDay) => {
    setSelected(day)
  }

  const handleAddCalendarRef = (ref: CalendarRefObject) => {
    if (ref) {
      setCalendarRefs((prevRefs) => {
        if (!prevRefs.includes(ref.current)) {
          return [...prevRefs, ref.current]
        }
        return prevRefs
      })
    }
  }

  const getHeaderRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      setHeaderRef(ref)
    }
  }

  return (
    <DatePickerContext.Provider
      value={{
        selected,
        initialDate,
        header: headerRef,
        calendarRefs,
        getHeaderRef,
        handleDateClick,
        handleAddCalendarRef,
        createMonthTable,
      }}
    >
      <div
        id='rmdp-provider'
        className={styles['datepicker-container']}
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  )
}
