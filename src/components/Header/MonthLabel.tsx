import { useDatePicker } from '@/hooks/useDatePicker'
import { MonthLabelProps } from '@/types'
import { useEffect, useState } from 'react'

export function MonthLabel({ type = 'short', className, ...props }: MonthLabelProps) {
  const { calendarRefs, refDate, dayjs } = useDatePicker()

  const getMonths = () => {
    if (type === 'short') {
      return dayjs().localeData().monthsShort()
    } else {
      return dayjs().localeData().months()
    }
  }

  const singleMonth = getMonths()[refDate.get('M')]
  const [monthRangeText, setMonthRangeText] = useState(singleMonth)
  const months = getMonths()

  useEffect(() => {
    const newDate = dayjs(refDate.add(calendarRefs.length - 1, 'M'))
    if (newDate.isAfter(refDate) && newDate.diff(refDate, 'month') >= 1) {
      setMonthRangeText(`${months[refDate.get('M')]} - ${months[newDate.get('M')]}`)
    } else {
      setMonthRangeText(`${months[refDate.get('M')]}`)
    }
  }, [calendarRefs, dayjs, months, refDate])

  return (
    <span
      className={className}
      {...props}
    >
      {monthRangeText} {refDate.year()}
    </span>
  )
}
