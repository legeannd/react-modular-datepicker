import { useDatePicker } from '@/hooks/useDatePicker'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Button({ type }: { type: 'previous' | 'next' }) {
  const { refDate, disablePeriodChange, handleChangeReferenceDate } = useDatePicker()

  const handleChangeCalendarRange = (type: 'previous' | 'next') => {
    if (type === 'next') {
      handleChangeReferenceDate(refDate.add(1, 'month'))
    } else {
      handleChangeReferenceDate(refDate.subtract(1, 'month'))
    }
  }
  return type === 'previous' ? (
    <button
      className='hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed'
      onClick={() => handleChangeCalendarRange('previous')}
      disabled={disablePeriodChange}
    >
      <ChevronLeft className='text-label' />
    </button>
  ) : (
    <button
      className={
        'hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed'
      }
      onClick={() => handleChangeCalendarRange('next')}
      disabled={disablePeriodChange}
    >
      <ChevronRight className='text-label' />
    </button>
  )
}
