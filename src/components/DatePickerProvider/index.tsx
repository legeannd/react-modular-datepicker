import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { DatePickerContext } from '../../contexts/DatePickerContext'
import {
  CalendarRefObject,
  CurrentDay,
  DatePickerProviderProps,
  GroupingModeType,
  handleDateSelectType,
  InitialDatesObject,
  SelectedDate,
} from '../../types'

dayjs.extend(localeData)

export function DatePickerProvider({
  children,
  startDate = new Date(),
  type = 'single',
  normalizeHeight = false,
  initialDates,
  disabledDates = {},
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
  const [groupingMode, setGroupingMode] = useState<GroupingModeType>('all')

  const createMonthTable = (tableDate = startDate) => {
    const date = dayjs(tableDate).startOf('day')
    const startOfMonth = date.startOf('month')
    const endOfMonth = date.endOf('month')
    const monthTable = new Map<number, CurrentDay[]>()
    let currentDay = startOfMonth.startOf('week')
    let week = 0
    while (currentDay.isBefore(endOfMonth.endOf('week')) || (normalizeHeight && week !== 6)) {
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

  const setInitialDates = (initialDates: InitialDatesObject) => {
    switch (type) {
      case 'single': {
        const day = dayjs(initialDates?.days?.[0])
        if (day.isValid()) {
          handleDateSelect({ day: { date: day.toISOString(), label: day.date() } })
        }
        break
      }
      case 'multiple': {
        const selected = initialDates?.days?.length
          ? initialDates?.days
              ?.map((initial) => {
                const day = dayjs(initial)
                if (day.isValid()) {
                  return { day: { date: day.toISOString(), label: day.date() } }
                }
                return false
              })
              .filter((item) => item !== false)
          : []
        setSelected({ selection: selected, type })
        break
      }
      case 'range': {
        const start = dayjs(initialDates?.start)
        const end = dayjs(initialDates?.end)

        if (start.isValid() && end.isValid()) {
          setSelected({
            selection: {
              start: { day: { date: start.toISOString(), label: start.date() } },
              end: { day: { date: end.toISOString(), label: end.date() } },
            },
            type,
          })
        }
      }
    }
  }

  const isDateDisabled = (date: string) => {
    let isDisabled = false
    const current = dayjs(date)
    if (disabledDates.every === 'weekend') {
      isDisabled = isDisabled || current.day() === 0 || current.day() === 6
    }
    if (disabledDates.every === 'weekdays' && disabledDates.weekdays) {
      isDisabled = isDisabled || (disabledDates.weekdays?.includes(current.day()) ?? false)
    }
    if (disabledDates.days && disabledDates.days.length > 0) {
      isDisabled =
        isDisabled || (disabledDates.days.some((day) => dayjs(day).isSame(current)) ?? false)
    }
    if (disabledDates.start || disabledDates.end) {
      const start = dayjs(disabledDates.start)
      const end = dayjs(disabledDates.end)
      if (disabledDates.start && disabledDates.end) {
        isDisabled =
          isDisabled ||
          current.isSame(start) ||
          (current.isAfter(start) && current.isBefore(end)) ||
          current.isSame(end)
      }
      if (disabledDates.start && !disabledDates.end) {
        isDisabled = isDisabled || current.isAfter(start)
      } else if (disabledDates.end && !disabledDates.start) {
        isDisabled = isDisabled || current.isBefore(end)
      }
    }

    return isDisabled
  }

  const isRangeDisabled = (start: string, end: string) => {
    const startDate = dayjs(start)
    const endDate = dayjs(end)
    const diff = endDate.diff(startDate, 'day')
    for (let i = 0; i <= diff; i++) {
      if (isDateDisabled(startDate.add(i, 'day').toISOString())) return true
    }
    return false
  }

  const handleDateSelect: handleDateSelectType = (day) => {
    switch (type) {
      case 'single':
        setSelected({ type, selection: day })
        break
      case 'multiple': {
        const currentSelection = Array.isArray(selected.selection) ? selected.selection : []
        const filteredSelection = currentSelection.filter(
          (selected) => selected.day.date !== day.day.date
        )
        if (currentSelection.some((selected) => selected.day.date === day.day.date)) {
          setSelected({
            type,
            selection: [...filteredSelection],
          })
        } else {
          setSelected({
            type,
            selection: [...filteredSelection, day],
          })
        }
        break
      }
      case 'range': {
        const { selection } = selected
        if (!selection || ('start' in selection && 'end' in selection)) {
          setSelected({ type, selection: { start: day } })
        } else {
          const date = dayjs(day.day.date)
          if ('start' in selection) {
            const start = dayjs(selection.start?.day.date)
            if (date.isBefore(start)) {
              if (!isRangeDisabled(date.toISOString(), start.toISOString())) {
                setSelected((prev) => {
                  if (prev.selection && 'start' in prev.selection) {
                    return { type, selection: { start: day, end: prev.selection.start } }
                  }
                  return prev
                })
              }
            } else if (date.isAfter(start)) {
              if (!isRangeDisabled(start.toISOString(), date.toISOString())) {
                setSelected((prev) => ({ type, selection: { ...prev.selection, end: day } }))
              }
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

  const handleSetGroupingMode = (mode: GroupingModeType) => {
    setGroupingMode(mode)
  }

  useEffect(() => {
    if (initialDates) {
      setInitialDates(initialDates)
    }
  }, [initialDates])

  return (
    <DatePickerContext.Provider
      value={{
        selected,
        hovered,
        type,
        startDate,
        header: headerRef,
        calendarRefs,
        groupingMode,
        handleSetHovered,
        handleSetHeaderRef,
        handleDateSelect,
        handleAddCalendarRef,
        handleSetGroupingMode,
        createMonthTable,
        isDateDisabled,
      }}
    >
      <div
        id='rmdp-provider'
        className='font-display'
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  )
}
