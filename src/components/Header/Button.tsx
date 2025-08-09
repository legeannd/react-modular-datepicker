import { useDatePicker } from '@/hooks/useDatePicker'
import type { ButtonProps } from '@/types'

export function Button({ type, className, children, ...props }: ButtonProps) {
  const { refDate, disablePeriodChange, handleChangeReferenceDate } = useDatePicker()

  const handleChangeCalendarRange = () => {
    if (type === 'next') {
      handleChangeReferenceDate(refDate.add(1, 'month'))
    } else {
      handleChangeReferenceDate(refDate.subtract(1, 'month'))
    }
  }

  return (
    <button
      {...props}
      className={
        className ||
        'hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed'
      }
      onClick={handleChangeCalendarRange}
      disabled={disablePeriodChange}
    >
      {children}
    </button>
  )
}
