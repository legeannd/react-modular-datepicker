import { useEffect } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import { HeaderProps } from '../../types'

export function Header({ children, groupingMode }: HeaderProps) {
  const { refDate, calendarRefs, handleSetHeaderRef, handleSetGroupingMode } = useDatePicker()

  useEffect(() => {
    let newDate = refDate
    calendarRefs.forEach((ref, index) => {
      ref.updateMonthTable(newDate.toISOString())
      if (index < calendarRefs.length - 1) {
        newDate = newDate.add(1, 'month')
      }
    })
  }, [calendarRefs, refDate])

  useEffect(() => {
    if (groupingMode) {
      handleSetGroupingMode(groupingMode)
    }
  }, [groupingMode, handleSetGroupingMode])

  return (
    <div className='rounded-lg bg-white shadow-md'>
      {children && (
        <div className='text-label flex w-full items-center justify-between gap-8 p-4 text-sm font-bold'>
          {children}
        </div>
      )}
      <div
        className={
          'grid grid-cols-3 items-end gap-x-4 gap-y-2 [&:has(>*:nth-child(2)):not(:has(>*:nth-child(3)))]:grid-cols-2 [&:has(>*:only-child)]:grid-cols-1'
        }
        id='rmdp-header'
        ref={(ref) => handleSetHeaderRef(ref)}
      ></div>
    </div>
  )
}
