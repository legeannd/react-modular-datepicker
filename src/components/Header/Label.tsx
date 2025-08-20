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

  const monthRange =
    startRange.month !== endRange.month
      ? `${monthNames[type][startRange.month]} ${startRange.year !== endRange.year ? startRange.year : ''} - ${monthNames[type][endRange.month]} ${endRange.year}`
      : `${monthNames[type][startRange.month]} ${startRange.year}`

  const monthAriaLabel =
    startRange.month !== endRange.month
      ? `${monthNames[type][startRange.month]}${startRange.year !== endRange.year ? ' of ' + startRange.year : ''} to ${monthNames[type][endRange.month]} of ${endRange.year}`
      : `${monthNames[type][startRange.month]} of ${startRange.year}`

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
            start: { month: monthNames[type][startRange.month], year: startRange.year },
            end: { month: monthNames[type][endRange.month], year: endRange.year },
          })
        : monthRange}
    </span>
  )
}
