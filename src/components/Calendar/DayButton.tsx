import { twMerge } from 'tailwind-merge'
import { CurrentDay, SelectedDate } from '../../types'
import { useDatePicker } from '../../hooks/useDatePicker'
import { useEffect, useState } from 'react'

export function DayButton({ currentDay }: { currentDay: CurrentDay }) {
  const [visualSelected, setVisualSelected] = useState(false)
  const [singleHovered, setVisualHovered] = useState(false)
  const [startMonth, setStartMonth] = useState(false)
  const [endMonth, setEndMonth] = useState(false)
  const [startRange, setStartRange] = useState(false)
  const [endRange, setEndRange] = useState(false)
  const [betweenRange, setBetweenRange] = useState(false)
  const [weekend, setWeekend] = useState(false)
  const {
    selected,
    hovered,
    header,
    calendarRefs,
    handleDateSelect,
    handleSetHovered,
    isDateDisabled,
    dayjs,
  } = useDatePicker()
  const today = (dayjs(currentDay.day.date).isToday() && currentDay.isCurrentMonth) ?? false
  const thisMonth = currentDay.isCurrentMonth ?? false
  const disabled = isDateDisabled(currentDay.day.date)

  const isWeekend = (date: string) => {
    const dayOfWeek = dayjs(date).day()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const getStartAndEndRangeDates = ({
    selected,
    type,
    day: dayToCompare,
  }: {
    selected: SelectedDate
    type: 'start' | 'end'
    day: CurrentDay['day']
  }) => {
    if (selected.selection && selected.type === 'range' && selected.selection[type]) {
      return dayjs(selected.selection[type]?.day.date).isSame(dayToCompare.date)
    }
    return false
  }

  const getStartAndEndMonth = (day: CurrentDay) => {
    return (
      ((dayjs(day.day.date).isSame(dayjs(day.day.date).startOf('M').startOf('D')) &&
        day.isCurrentMonth) ||
        (dayjs(day.day.date).isSame(dayjs(day.day.date).endOf('M').startOf('D')) &&
          day.isCurrentMonth)) ??
      false
    )
  }

  const getBetweenRangeDates = ({
    hasHeader,
    selected,
    hovered,
    day,
  }: {
    hasHeader: boolean
    selected: SelectedDate
    hovered: CurrentDay | null
    day: CurrentDay
  }) => {
    if (hasHeader && !day.isCurrentMonth) {
      return false
    }
    if (selected.type === 'range') {
      const current = dayjs(day.day.date)
      if (selected.selection?.start && selected.selection?.end) {
        return (
          current.isAfter(selected.selection?.start?.day.date, 'day') &&
          current.isBefore(selected.selection.end.day.date, 'day')
        )
      } else if (hovered && selected.selection?.start && !selected.selection.end) {
        return (
          (current.isAfter(selected.selection.start.day.date) &&
            current.isBefore(hovered?.day.date)) ||
          (current.isBefore(selected.selection.start.day.date) &&
            current.isAfter(hovered?.day.date))
        )
      }
    }

    return false
  }

  const getSelectedDates = ({
    selected,
    hasHeader,
    hasMultipleCalendars,
    clicked,
  }: {
    selected: SelectedDate
    hasHeader: boolean
    hasMultipleCalendars: boolean
    clicked: CurrentDay
  }) => {
    if (hasHeader && hasMultipleCalendars && !clicked.isCurrentMonth) {
      return false
    }
    const { day } = clicked
    switch (selected.type) {
      case 'single':
        return dayjs(selected.selection?.day.date).isSame(day.date)
      case 'multiple':
        return selected.selection?.some((date) => dayjs(date.day.date).isSame(day.date)) ?? false
      case 'range':
        return (
          getStartAndEndRangeDates({ selected, type: 'start', day: clicked.day }) ||
          getStartAndEndRangeDates({ selected, type: 'end', day: clicked.day })
        )
      default:
        return false
    }
  }

  const handleHover = (day?: CurrentDay) => {
    if (day) {
      setVisualHovered(true)
      handleSetHovered(day)
    } else {
      setVisualHovered(false)
      handleSetHovered()
    }
  }

  useEffect(() => {
    setVisualSelected(
      getSelectedDates({
        selected,
        hasHeader: !!header,
        hasMultipleCalendars: calendarRefs.length > 1,
        clicked: currentDay,
      })
    )
    setWeekend(isWeekend(currentDay.day.date))
    setStartMonth(getStartAndEndMonth(currentDay))
    setEndMonth(getStartAndEndMonth(currentDay))
    setStartRange(getStartAndEndRangeDates({ selected, type: 'start', day: currentDay.day }))
    setEndRange(getStartAndEndRangeDates({ selected, type: 'end', day: currentDay.day }))
    setBetweenRange(
      getBetweenRangeDates({ selected, hovered, day: currentDay, hasHeader: !!header })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarRefs.length, currentDay, header, selected, hovered])

  return (
    <button
      className={twMerge(
        'text-primary text-button flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-200 ease-in-out',
        today && !betweenRange && 'outline-today outline -outline-offset-1',
        visualSelected && 'bg-selected text-highlight font-bold outline-0',
        !thisMonth && !visualSelected && 'text-disabled',
        (startMonth || endMonth) && 'font-bold',
        startRange && 'rounded-r-none',
        endRange && 'rounded-l-none',
        betweenRange && 'bg-range rounded-none',
        singleHovered && !visualSelected && !betweenRange && 'bg-hover outline-0',
        weekend &&
          !singleHovered &&
          !visualSelected &&
          !betweenRange &&
          thisMonth &&
          'text-weekend',
        disabled && 'text-muted-foreground/20 cursor-not-allowed',
        disabled && betweenRange && 'bg-red-500/10 text-red-500/70'
      )}
      data-today={today}
      data-start-month={startMonth}
      data-end-month={endMonth}
      data-this-month={thisMonth}
      data-selected={visualSelected}
      data-start-range={startRange}
      data-end-range={endRange}
      data-between-range={betweenRange}
      key={currentDay.day.date}
      aria-label={dayjs(currentDay.day.date).format('MMMM D, YYYY')}
      onClick={() => handleDateSelect(currentDay)}
      onMouseEnter={() => handleHover(currentDay)}
      onMouseLeave={() => handleHover()}
      disabled={disabled}
    >
      {currentDay.day.label}
    </button>
  )
}
