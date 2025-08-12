import { useDatePicker } from './useDatePicker'
import { UseDateSelectOptions, UseDateSelectReturn } from '@/types'
import { useRef } from 'react'

/**
 * Hook that provides all necessary data and handlers for building a date select component.
 * Returns ready-to-use month/year arrays with proper localization and event handlers.
 */
export function useDateSelect({
  yearRangeStartOffset = 10,
  yearRangeEndOffset = 40,
}: UseDateSelectOptions = {}): UseDateSelectReturn {
  const { refDate: date, dayjs, handleChangeReferenceDate } = useDatePicker()
  const { current: initialDate } = useRef(date)

  const currentMonth = date.get('M')
  const currentYear = date.year()

  const localeData = dayjs().localeData()
  const months = localeData.months()

  const baseYear = dayjs(initialDate).year()
  const startYear = baseYear + yearRangeStartOffset
  const endYear = baseYear - yearRangeEndOffset

  const years = Array.from(
    { length: startYear - endYear + 1 },
    (_, i) => startYear - i
  )

  const onMonthChange = (monthIndex: number) => {
    const newDate = dayjs(date).set('month', monthIndex)
    handleChangeReferenceDate(newDate)
  }

  const onYearChange = (year: number) => {
    const newDate = dayjs(date).set('year', year)
    handleChangeReferenceDate(newDate)
  }

  return {
    currentMonth,
    currentYear,
    months,
    years,
    onMonthChange,
    onYearChange,
  }
}
