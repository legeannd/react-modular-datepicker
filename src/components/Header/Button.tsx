import { useDatePicker } from '@/hooks/useDatePicker'
import type { ButtonProps } from '@/types'
import styles from './Button.module.css'

export function Button({ type, className, children, ...props }: ButtonProps) {
  const { refDate, handleChangeReferenceDate } = useDatePicker()

  const handleChangeCalendarRange = () => {
    if (type === 'next') {
      handleChangeReferenceDate(refDate.add(1, 'month'))
    } else {
      handleChangeReferenceDate(refDate.subtract(1, 'month'))
    }
  }

  const defaultAriaLabel = type === 'next' ? 'Next month' : 'Previous month'
  const effectiveAriaLabel =
    props['aria-label'] ?? (typeof children !== 'string' ? defaultAriaLabel : undefined)

  return (
    <button
      type='button'
      {...props}
      aria-label={effectiveAriaLabel}
      className={className || styles.button}
      onClick={handleChangeCalendarRange}
    >
      {children}
    </button>
  )
}
