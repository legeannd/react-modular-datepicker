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
import { Calendar1, CalendarDays, CalendarRange } from 'lucide-react'
import { MonthLabel } from './MonthLabel'
import { DateSelectProps } from '@/types'

export function DateSelect({ children }: DateSelectProps) {
  const {
    disablePeriodChange,
    type,
    refDate: date,
    dayjs,
    handleChangeReferenceDate,
  } = useDatePicker()
  const month = dayjs().localeData().monthsShort()[date.get('M')]

  const calendarIcon =
    type === 'single' ? <Calendar1 /> : type === 'multiple' ? <CalendarDays /> : <CalendarRange />

  const handleChangeCalendarStartPeriod = (field: 'month' | 'year', value: string) => {
    const newDate = dayjs(date).set(field, Number(value))
    handleChangeReferenceDate(newDate)
  }

  const yearRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  return (
    <div className='flex items-center gap-2'>
      {calendarIcon}
      <div className='flex items-center gap-4'>
        {disablePeriodChange ? (
          (children ?? <MonthLabel />)
        ) : (
          <Popover>
            <PopoverTrigger className='hover:bg-hover cursor-pointer rounded px-2 py-1 capitalize transition-colors duration-200 ease-in-out'>
              {children ?? <MonthLabel />}
            </PopoverTrigger>
            <PopoverContent className='flex w-auto gap-2 p-2'>
              <Select
                defaultValue={String(date.get('M'))}
                onValueChange={(value) => handleChangeCalendarStartPeriod('month', value)}
              >
                <SelectTrigger className='text-label rounded capitalize'>
                  <SelectValue placeholder={month} />
                </SelectTrigger>
                <SelectContent>
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
                defaultValue={String(date.year())}
                onValueChange={(value) => handleChangeCalendarStartPeriod('year', value)}
              >
                <SelectTrigger className='text-label rounded'>
                  <SelectValue placeholder={date.year()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {yearRange(dayjs(date).year() + 10, dayjs(date).year() - 40, -1).map((year) => (
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
