import { useDatePicker } from '@/hooks/useDatePicker'
import type { CalendarProps } from '@/types'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { DayButton } from './DayButton'
import styles from './Calendar.module.css'

export function Calendar({
  showWeekdays = true,
  weekdayLabels,
  weekdaysContainerClassName,
  weekdayClassName,
  daysContainerClassName,
  id,
  footerSlot,
  dayButtonClassNames,
  className,
  ...props
}: CalendarProps) {
  const calendarRef = useRef<{ updateMonthTable: (newDate?: string | Date) => void } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const {
    header,
    groupingMode,
    handleAddCalendarRef,
    createMonthTable,
    dayjs,
    refDate,
    focusedDay,
    setFocusedDay,
    keyboardNavPending,
    setKeyboardNavPending,
    handleDateSelect,
    handleChangeReferenceDate,
    isDateDisabled,
  } = useDatePicker()
  const [monthTable, setMonthTable] = useState(createMonthTable())
  const firstDayOfWeek = dayjs().localeData().firstDayOfWeek()
  const weekdayLabelsArray = dayjs().localeData().weekdaysShort()
  const weekdayLabelsFullArray = dayjs().localeData().weekdays()
  const weekdays = [
    ...weekdayLabelsArray.slice(firstDayOfWeek),
    ...weekdayLabelsArray.slice(0, firstDayOfWeek),
  ]
  const weekdaysFull = [
    ...weekdayLabelsFullArray.slice(firstDayOfWeek),
    ...weekdayLabelsFullArray.slice(0, firstDayOfWeek),
  ]
  const currentDate = dayjs(monthTable.get(1)?.[0].day.date)
  const calendarLabel = currentDate.format('MMMM, YYYY')
  const shouldRenderInsideHeader = groupingMode === 'all' || (!!id && groupingMode.includes(id))
  const renderOnPortal = !!header && shouldRenderInsideHeader

  const getCustomWeekdayLabel = (index: number) => {
    if (weekdayLabels && weekdayLabels[index]) {
      return weekdayLabels[index]
    }
    return weekdays[index]
  }

  useEffect(() => {
    if (!!header && calendarRef.current) {
      handleAddCalendarRef({ current: calendarRef.current })
    }
  }, [header])

  useImperativeHandle(
    calendarRef,
    () => ({
      updateMonthTable: (newDate?: string | Date) => {
        const updatedMonthTable = createMonthTable(newDate)
        setMonthTable(updatedMonthTable)
      },
    }),
    [createMonthTable]
  )

  useEffect(() => {
    if (!focusedDay || !keyboardNavPending) return
    const button = gridRef.current?.querySelector<HTMLButtonElement>(
      `[data-date="${focusedDay}"][data-this-month="true"]`
    )
    if (!button) return
    button.focus()
    setKeyboardNavPending(false)
  }, [focusedDay, monthTable, keyboardNavPending])

  useEffect(() => {
    if (!header) {
      setMonthTable(createMonthTable(refDate.toISOString()))
    }
  }, [refDate, header])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!focusedDay) return
    const current = dayjs(focusedDay)
    let next = current

    switch (e.key) {
      case 'ArrowRight':
        next = current.add(1, 'day')
        break
      case 'ArrowLeft':
        next = current.subtract(1, 'day')
        break
      case 'ArrowDown':
        next = current.add(7, 'day')
        break
      case 'ArrowUp':
        next = current.subtract(7, 'day')
        break
      case 'Home':
        next = current.startOf('week')
        break
      case 'End':
        next = current.endOf('week').startOf('day')
        break
      case 'PageDown':
        if (header && e.shiftKey) return
        next = e.shiftKey ? current.add(1, 'year') : current.add(1, 'month')
        break
      case 'PageUp':
        if (header && e.shiftKey) return
        next = e.shiftKey ? current.subtract(1, 'year') : current.subtract(1, 'month')
        break
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const allDays = Array.from(monthTable.values()).flat()
        const target = allDays.find((d) => dayjs(d.day.date).isSame(focusedDay, 'day'))
        if (target && !isDateDisabled(target.day.date)) handleDateSelect(target)
        return
      }
      case 'Escape':
        e.preventDefault()
        return
      default:
        return
    }

    e.preventDefault()
    const nextFormatted = next.format('YYYY-MM-DD')
    setKeyboardNavPending(true)
    setFocusedDay(nextFormatted)

    const displayedMonth = dayjs(monthTable.get(1)?.[0].day.date).month()
    const displayedYear = dayjs(monthTable.get(1)?.[0].day.date).year()
    if (next.month() !== displayedMonth || next.year() !== displayedYear) {
      if (header) {
        const hasTargetCalendar = header.querySelector(
          `[data-this-month="true"][data-date^="${next.format('YYYY-MM')}"]`
        )
        if (!hasTargetCalendar) {
          if (next.isAfter(current, 'month')) {
            handleChangeReferenceDate(refDate.add(1, 'month'))
          } else {
            handleChangeReferenceDate(refDate.subtract(1, 'month'))
          }
        }
      } else {
        setMonthTable(createMonthTable(next.toISOString()))
      }
    }
  }

  const body = (
    <div
      role='grid'
      {...props}
      id={id}
      ref={gridRef}
      aria-label={calendarLabel}
      onKeyDown={handleKeyDown}
      className={
        className ||
        clsx(styles.calendar, (!header || !shouldRenderInsideHeader) && styles.calendarWithShadow)
      }
    >
      {showWeekdays && (
        <div
          role='row'
          className={weekdaysContainerClassName || styles.weekdays}
        >
          {weekdays.map((weekday, index) => (
            <span
              role='columnheader'
              aria-label={weekdaysFull[index]}
              className={weekdayClassName || styles.weekday}
              key={weekday}
            >
              {getCustomWeekdayLabel(index)}
            </span>
          ))}
        </div>
      )}
      <div
        role='rowgroup'
        className={daysContainerClassName || styles.daysContainer}
      >
        {Array.from(monthTable.keys()).map((week) => (
          <div
            key={week}
            role='row'
            className={styles.daysGrid}
          >
            {monthTable.get(week)?.map((currentDay) => (
              <span
                role='gridcell'
                key={currentDay.day.date}
              >
                <DayButton
                  currentDay={currentDay}
                  dayButtonClassNames={dayButtonClassNames}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      {footerSlot && footerSlot({ currentDate })}
    </div>
  )

  return renderOnPortal ? createPortal(body, header) : body
}
