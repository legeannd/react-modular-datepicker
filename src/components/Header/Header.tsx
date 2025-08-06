import { useEffect } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import { HeaderProps } from '../../types'
import { cn } from '../../lib/utils'

export function Header({
  children,
  groupingMode,
  className,
  calendarGridClassName,
  ...props
}: HeaderProps) {
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
    <div
      {...props}
      className={className || 'rounded-lg bg-white shadow-md'}
    >
      {children && (
        <div className='text-label flex w-full items-center justify-between gap-8 p-4 text-sm font-bold'>
          {children}
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-3 items-end gap-x-4 gap-y-2 [&:has(>*:nth-child(2)):not(:has(>*:nth-child(3)))]:grid-cols-2 [&:has(>*:only-child)]:grid-cols-1',
          calendarGridClassName
        )}
        id='rmdp-header'
        ref={handleSetHeaderRef}
      ></div>
    </div>
  )
}
