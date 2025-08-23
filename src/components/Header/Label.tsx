import { useDatePicker } from '@/hooks/useDatePicker'
import { LabelProps } from '@/types'
import { useEffect, useState } from 'react'

export function Label({ type = 'short', className, children, ...props }: LabelProps) {
  const { calendarRefs, refDate, dayjs } = useDatePicker()

  const monthNames = {
    short: dayjs().localeData().monthsShort(),
    long: dayjs().localeData().months(),
  }

  const startRange = { month: refDate.get('M'), year: refDate.year() }
  const [endRange, setEndRange] = useState({
    month: refDate.get('M'),
    year: refDate.year(),
  })

  const startMonthName = monthNames[type][startRange.month]
  const endMonthName = monthNames[type][endRange.month]

  const monthRange =
    startRange.month !== endRange.month
      ? `${startMonthName} ${startRange.year !== endRange.year ? startRange.year : ''} - ${endMonthName} ${endRange.year}`
      : `${startMonthName} ${startRange.year}`

  const monthAriaLabel =
    startRange.month !== endRange.month
      ? `${startMonthName}${startRange.year !== endRange.year ? ' of ' + startRange.year : ''} to ${endMonthName} of ${endRange.year}`
      : `${startMonthName} of ${startRange.year}`

  useEffect(() => {
    const newDate = dayjs(refDate.add(calendarRefs.length - 1, 'M'))
    if (newDate.isAfter(refDate) && newDate.diff(refDate, 'month') >= 1) {
      setEndRange({ month: newDate.get('M'), year: newDate.year() })
    } else {
      setEndRange({ month: refDate.get('M'), year: refDate.year() })
    }
  }, [calendarRefs, dayjs, refDate])

  return (
    <span
      className={className}
      aria-label={props['aria-label'] ?? monthAriaLabel}
      aria-live='polite'
      {...props}
    >
      {children
        ? children({
            start: { month: startMonthName, year: startRange.year },
            end: { month: endMonthName, year: endRange.year },
          })
        : monthRange}
    </span>
  )
}
