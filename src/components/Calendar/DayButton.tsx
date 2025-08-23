import { cn } from '@/lib/utils'
import type { CurrentDay, DayButtonClassNames } from '@/types'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useState, ButtonHTMLAttributes } from 'react'

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
  const [visualHovered, setVisualHovered] = useState(false)
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

  const isWeekend = () => {
    const dayOfWeek = dayjs(currentDay.day.date).day()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const isStartMonth = () => {
    return (
      (dayjs(currentDay.day.date).isSame(dayjs(currentDay.day.date).startOf('M').startOf('D')) &&
        currentDay.isCurrentMonth) ||
      false
    )
  }

  const isEndMonth = () => {
    return (
      (dayjs(currentDay.day.date).isSame(dayjs(currentDay.day.date).endOf('M').startOf('D')) &&
        currentDay.isCurrentMonth) ||
      false
    )
  }

  const isStartRangeDate = () => {
    if (selected.selection && selected.type === 'range' && selected.selection.start) {
      return dayjs(selected.selection.start.day.date).isSame(currentDay.day.date)
    }
    return false
  }

  const isEndRangeDate = () => {
    if (selected.selection && selected.type === 'range' && selected.selection.end) {
      return dayjs(selected.selection.end.day.date).isSame(currentDay.day.date)
    }
    return false
  }

  const isBetweenRangeDates = () => {
    if (!!header && !currentDay.isCurrentMonth) {
      return false
    }
    if (selected.type === 'range') {
      const current = dayjs(currentDay.day.date)
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

  const isVisualSelected = () => {
    if (!!header && calendarRefs.length > 1 && !currentDay.isCurrentMonth) {
      return false
    }
    const { day } = currentDay
    switch (selected.type) {
      case 'single':
        return dayjs(selected.selection?.day.date).isSame(day.date)
      case 'multiple':
        return selected.selection?.some((date) => dayjs(date.day.date).isSame(day.date)) ?? false
      case 'range':
        return isStartRangeDate() || isEndRangeDate()
      default:
        return false
    }
  }

  const today = (dayjs(currentDay.day.date).isToday() && currentDay.isCurrentMonth) ?? false
  const thisMonth = currentDay.isCurrentMonth ?? false
  const disabled = isDateDisabled(currentDay.day.date)
  const startMonth = isStartMonth()
  const endMonth = isEndMonth()
  const weekend = isWeekend()
  const startRange = isStartRangeDate()
  const endRange = isEndRangeDate()
  const betweenRange = isBetweenRangeDates()
  const visualSelected = isVisualSelected()

  const handleHover = (day?: CurrentDay) => {
    if (day) {
      setVisualHovered(true)
      handleSetHovered(day)
    } else {
      setVisualHovered(false)
      handleSetHovered()
    }
  }

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
