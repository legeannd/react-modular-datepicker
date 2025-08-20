import { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'
import { DatePickerContext } from '@/contexts/DatePickerContext'
import type {
  CalendarRefObject,
  CurrentDay,
  DatePickerProviderProps,
  GroupingModeType,
  HandleDateSelectType,
  InitialDatesObject,
  SelectedDate,
} from '@/types'
import { useLocalizedDayjs } from '@/hooks/useLocalizedDayjs'
import { normalizeSelection } from '@/lib/utils'

export function DatePickerProvider({
  children,
  initialMonth = new Date(),
  type = 'single',
  normalizeHeight = false,
  defaultSelected,
  disabledDates = {},
  dayjs: customDayjs,
  className,
  onSelectionChange,
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
  const { getDayjs: dayjs } = useLocalizedDayjs(customDayjs)
  const [refDate, setRefDate] = useState<Dayjs>(dayjs(initialMonth))

  const createMonthTable = (tableDate = initialMonth) => {
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

  const handleSetDefaultSelected = (initialSelectedDays: InitialDatesObject) => {
    switch (type) {
      case 'single': {
        const day = dayjs(initialSelectedDays?.days?.[0])
        if (day.isValid()) {
          const selected = { day: { date: day.toISOString(), label: day.date() } }
          setSelected({ type, selection: selected })
        }
        break
      }
      case 'multiple': {
        const selected = initialSelectedDays?.days?.length
          ? initialSelectedDays?.days
              ?.map((initial) => {
                const day = dayjs(initial)
                if (day.isValid()) {
                  return { day: { date: day.toISOString(), label: day.date() } }
                }
                return null
              })
              .filter((item) => item !== null)
          : []
        setSelected({ selection: selected, type })
        break
      }
      case 'range': {
        const start = dayjs(initialSelectedDays?.start)
        const end = dayjs(initialSelectedDays?.end)

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

  const handleDateSelect: HandleDateSelectType = (day) => {
    switch (type) {
      case 'single':
        setSelected({ type, selection: day })
        break
      case 'multiple': {
        const currentSelection = Array.isArray(selected.selection) ? selected.selection : []
        const filteredSelection = currentSelection.filter(
          (selectedItem) => selectedItem.day.date !== day.day.date
        )
        if (currentSelection.some((selectedItem) => selectedItem.day.date === day.day.date)) {
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
              } else {
                setSelected({ type, selection: null })
                setHovered(null)
              }
            } else if (date.isAfter(start)) {
              if (!isRangeDisabled(start.toISOString(), date.toISOString())) {
                setSelected((prev) => ({ type, selection: { ...prev.selection, end: day } }))
              } else {
                setSelected({ type, selection: null })
                setHovered(null)
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
    if (type !== 'range') return

    const { selection } = selected

    if (day && selection && 'start' in selection) {
      setHovered(day)
    }
    if (selection && 'end' in selection) {
      setHovered(null)
    }
  }

  const handleSetGroupingMode = (mode: GroupingModeType) => {
    setGroupingMode(mode)
  }

  const handleChangeReferenceDate = (date: Dayjs) => {
    setRefDate(date)
  }

  useEffect(() => {
    if (!defaultSelected) return

    handleSetDefaultSelected(defaultSelected)
  }, [defaultSelected])

  useEffect(() => {
    if (onSelectionChange) {
      const normalized = normalizeSelection(selected)
      onSelectionChange(normalized)
    }
  }, [selected, onSelectionChange])

  const contextValue = {
    selected,
    hovered,
    type,
    header: headerRef,
    calendarRefs,
    groupingMode,
    refDate,
    handleSetHovered,
    handleSetHeaderRef,
    handleDateSelect,
    handleAddCalendarRef,
    handleSetGroupingMode,
    createMonthTable,
    isDateDisabled,
    dayjs,
    handleChangeReferenceDate,
  }

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div
        id='rmdp-provider'
        className={className || 'font-display'}
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  )
}
