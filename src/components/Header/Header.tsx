import { useEffect } from 'react'
import { useDatePicker } from '@/hooks/useDatePicker'
import type { HeaderProps } from '@/types'
import { clsx } from 'clsx'
import styles from './Header.module.css'

export function Header({
  children,
  groupingMode,
  className,
  calendarGridClassName,
  childrenClassName,
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
      className={className || styles.header}
    >
      {children && <div className={childrenClassName || styles.children}>{children}</div>}
      <div
        className={clsx(
          styles.calendarGrid,
          !calendarGridClassName && styles.defaultSpacing,
          calendarGridClassName
        )}
        id='rmdp-header'
        ref={handleSetHeaderRef}
      ></div>
    </div>
  )
}
