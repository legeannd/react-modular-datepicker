import { useState } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { DatePickerContext } from '../../contexts/DatePickerContext'
import {
  CalendarRefObject,
  CurrentDay,
  DatePickerProviderProps,
  HandleDateClickType,
  SelectedDate,
} from '../../types'

dayjs.extend(localeData)

export function DatePickerProvider({
  children,
  initialDate = new Date(),
  type = 'single',
}: DatePickerProviderProps) {
  const [selected, setSelected] = useState<SelectedDate>({
    selection: null,
    type,
  })
  const [hovered, setHovered] = useState<CurrentDay | null>(null)
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

  const handleDateClick: HandleDateClickType = (day) => {
    switch (type) {
      case 'single':
        setSelected({ type, selection: day })
        break
      case 'multiple':
        setSelected((prev) => ({
          type,
          selection: [...(Array.isArray(prev.selection) ? prev.selection : []), day],
        }))
        break
      case 'range': {
        const { selection } = selected
        if (!selection || ('start' in selection && 'end' in selection)) {
          setSelected({ type, selection: { start: day } })
        } else {
          const date = dayjs(day.day.date)
          if ('start' in selection) {
            if (date.isBefore(selection.start?.day.date)) {
              setSelected((prev) => {
                if (prev.selection && 'start' in prev.selection) {
                  return { type, selection: { start: day, end: prev.selection.start } }
                }
                return prev
              })
            } else if (date.isAfter(selection.start?.day.date)) {
              setSelected((prev) => ({ type, selection: { ...prev.selection, end: day } }))
            }
          }
        }
        break
      }
      default:
        return
    }
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

  const handleSetHeaderRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      setHeaderRef(ref)
    }
  }

  const handleSetHovered = (day?: CurrentDay) => {
    if (type === 'range') {
      if (day && selected.selection && 'start' in selected.selection) {
        setHovered(day)
      }
      if (selected.selection && 'end' in selected.selection) {
        setHovered(null)
      }
    }
  }

  return (
    <DatePickerContext.Provider
      value={{
        selected,
        hovered,
        type,
        initialDate,
        header: headerRef,
        calendarRefs,
        handleSetHovered,
        handleSetHeaderRef,
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
