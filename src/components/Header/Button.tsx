import { useDatePicker } from '@/hooks/useDatePicker'
import { ButtonProps } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Button({ type }: ButtonProps) {
  const { refDate, disablePeriodChange, handleChangeReferenceDate } = useDatePicker()

  const typeIcon =
    type === 'previous' ? (
      <ChevronLeft className='text-label' />
    ) : (
      <ChevronRight className='text-label' />
    )

  const handleChangeCalendarRange = () => {
    if (type === 'next') {
      handleChangeReferenceDate(refDate.add(1, 'month'))
    } else {
      handleChangeReferenceDate(refDate.subtract(1, 'month'))
    }
  }
  return (
    <button
      className='hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed'
      onClick={() => handleChangeCalendarRange()}
      disabled={disablePeriodChange}
    >
      {typeIcon}
    </button>
  )
}
