import { clsx } from 'clsx'
import type { CurrentDay, DayButtonClassNames } from '@/types'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useState, ButtonHTMLAttributes } from 'react'
import styles from './DayButton.module.css'

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
      className={clsx(
        dayButtonClassNames?.base || styles.dayButton,
        today && !betweenRange && (dayButtonClassNames?.today || styles.today),
        visualSelected && (dayButtonClassNames?.selected || styles.selected),
        !thisMonth && !visualSelected && (dayButtonClassNames?.differentMonth || styles.differentMonth),
        (startMonth || endMonth) && (dayButtonClassNames?.monthBoundary || styles.monthBoundary),
        startRange && (dayButtonClassNames?.rangeStart || styles.rangeStart),
        endRange && (dayButtonClassNames?.rangeEnd || styles.rangeEnd),
        betweenRange && (dayButtonClassNames?.betweenRange || styles.betweenRange),
        visualHovered && !visualSelected && !betweenRange && (dayButtonClassNames?.hovered || styles.hovered),
        weekend && !visualHovered && !visualSelected && !betweenRange && !(startMonth || endMonth) && thisMonth && (dayButtonClassNames?.weekend || styles.weekend),
        disabled && (dayButtonClassNames?.disabled || styles.disabled),
        disabled && betweenRange && (dayButtonClassNames?.disabledInRange || styles.disabledInRange),
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
