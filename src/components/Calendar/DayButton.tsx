import { cn } from '@/lib/utils'
import type { CurrentDay, SelectedDate, DayButtonClassNames } from '@/types'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useEffect, useState, ButtonHTMLAttributes } from 'react'

interface DayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentDay: CurrentDay
  dayButtonClassNames?: DayButtonClassNames
}

export function DayButton({
  currentDay,
  dayButtonClassNames,
  className,
  ...props
}: DayButtonProps) {
  const [visualSelected, setVisualSelected] = useState(false)
  const [visualHovered, setVisualHovered] = useState(false)
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
      {...props}
      className={cn(
        dayButtonClassNames?.base ||
          'text-primary text-button flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-200 ease-in-out',
        today &&
          !betweenRange &&
          (dayButtonClassNames?.today || 'outline-today outline -outline-offset-1'),
        visualSelected &&
          (dayButtonClassNames?.selected || 'bg-selected text-highlight font-bold outline-0'),
        !thisMonth && !visualSelected && (dayButtonClassNames?.differentMonth || 'text-disabled'),
        (startMonth || endMonth) && (dayButtonClassNames?.monthBoundary || 'font-bold'),
        startRange && (dayButtonClassNames?.rangeStart || 'rounded-r-none'),
        endRange && (dayButtonClassNames?.rangeEnd || 'rounded-l-none'),
        betweenRange && (dayButtonClassNames?.betweenRange || 'bg-range rounded-none'),
        visualHovered &&
          !visualSelected &&
          !betweenRange &&
          (dayButtonClassNames?.hovered || 'bg-hover outline-0'),
        weekend &&
          !visualHovered &&
          !visualSelected &&
          !betweenRange &&
          !(startMonth || endMonth) &&
          thisMonth &&
          (dayButtonClassNames?.weekend || 'text-weekend'),
        disabled &&
          (dayButtonClassNames?.disabled || 'text-muted-foreground/20 cursor-not-allowed'),
        disabled &&
          betweenRange &&
          (dayButtonClassNames?.disabledInRange || 'bg-red-500/10 text-red-500/70'),
        !dayButtonClassNames && className
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
