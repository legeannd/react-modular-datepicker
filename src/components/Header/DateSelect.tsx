import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useDatePicker } from '@/hooks/useDatePicker'
import { MonthLabel } from './MonthLabel'
import { DateSelectProps } from '@/types'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export function DateSelect({
  children,
  className,
  iconSlot,
  yearRangeStartOffset = 10,
  yearRangeEndOffset = 40,
  popoverProps,
  popoverTriggerProps,
  popoverContentProps,
  monthSelectProps,
  monthSelectTriggerProps,
  monthSelectContentProps,
  yearSelectProps,
  yearSelectTriggerProps,
  yearSelectContentProps,
  ...props
}: DateSelectProps) {
  const { disablePeriodChange, refDate: date, dayjs, handleChangeReferenceDate } = useDatePicker()
  const { current: initialDate } = useRef(date)

  const month = dayjs().localeData().monthsShort()[date.get('M')]

  const handleChangeCalendarStartPeriod = (field: 'month' | 'year', value: string) => {
    const newDate = dayjs(date).set(field, Number(value))
    handleChangeReferenceDate(newDate)
  }

  const yearRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  return (
    <div
      className={className || 'flex items-center gap-2'}
      {...props}
    >
      {iconSlot}
      <div className='flex items-center gap-4'>
        {disablePeriodChange ? (
          (children ?? <MonthLabel />)
        ) : (
          <Popover {...popoverProps}>
            <PopoverTrigger
              {...popoverTriggerProps}
              className={cn(
                'hover:bg-hover cursor-pointer rounded px-2 py-1 capitalize transition-colors duration-200 ease-in-out',
                popoverTriggerProps?.className
              )}
            >
              {children ?? <MonthLabel />}
            </PopoverTrigger>
            <PopoverContent
              {...popoverContentProps}
              className={cn('flex w-auto gap-2 p-2', popoverContentProps?.className)}
            >
              <Select
                {...monthSelectProps}
                defaultValue={String(date.get('M'))}
                onValueChange={(value) => handleChangeCalendarStartPeriod('month', value)}
              >
                <SelectTrigger
                  {...monthSelectTriggerProps}
                  className={cn(
                    'text-label rounded capitalize',
                    monthSelectTriggerProps?.className
                  )}
                >
                  <SelectValue placeholder={month} />
                </SelectTrigger>
                <SelectContent {...monthSelectContentProps}>
                  <SelectGroup>
                    {Array.from(Array(12).keys()).map((month) => (
                      <SelectItem
                        key={month}
                        value={String(month)}
                        className='capitalize'
                      >
                        {dayjs().localeData().months()[month]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                {...yearSelectProps}
                defaultValue={String(date.year())}
                onValueChange={(value) => handleChangeCalendarStartPeriod('year', value)}
              >
                <SelectTrigger
                  {...yearSelectTriggerProps}
                  className={cn('text-label rounded', yearSelectTriggerProps?.className)}
                >
                  <SelectValue placeholder={date.year()} />
                </SelectTrigger>
                <SelectContent {...yearSelectContentProps}>
                  <SelectGroup>
                    {yearRange(
                      dayjs(initialDate).year() + yearRangeStartOffset,
                      dayjs(initialDate).year() - yearRangeEndOffset,
                      -1
                    ).map((year) => (
                      <SelectItem
                        key={year}
                        value={String(year)}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}
