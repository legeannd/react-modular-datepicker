import React from 'react'
import { useDateSelect } from '../../src/hooks/useDateSelect'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from './ui/select'
import { cn } from '../lib/utils'
import { ComponentProps } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Label } from '../../src/components/Header/Label'

interface DateSelectExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child components like MonthLabel to display inside the date selector */
  children?: React.ReactNode
  /** Custom icon slot to add icons in the component. If provided, this will be rendered automatically */
  iconSlot?: React.ReactNode
  /** Number of years to offset from current year for the start of year range selection */
  yearRangeStartOffset?: number
  /** Number of years to offset from current year for the end of year range selection */
  yearRangeEndOffset?: number
  /** Props for the root Popover component */
  popoverProps?: ComponentProps<typeof PopoverPrimitive.Root>
  /** Props for the Popover trigger button */
  popoverTriggerProps?: ComponentProps<typeof PopoverPrimitive.Trigger>
  /** Props for the Popover content container */
  popoverContentProps?: ComponentProps<typeof PopoverPrimitive.Content>
  /** Props for the month Select root component */
  monthSelectProps?: ComponentProps<typeof SelectPrimitive.Root>
  /** Props for the month Select trigger button */
  monthSelectTriggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>
  /** Props for the month Select content container */
  monthSelectContentProps?: ComponentProps<typeof SelectPrimitive.Content>
  /** Props for the year Select root component */
  yearSelectProps?: ComponentProps<typeof SelectPrimitive.Root>
  /** Props for the year Select trigger button */
  yearSelectTriggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>
  /** Props for the year Select content container */
  yearSelectContentProps?: ComponentProps<typeof SelectPrimitive.Content>
}

/**
 * Example implementation of a DateSelect component using the useDateSelect hook.
 * This component demonstrates how to build a custom date selector with full styling control
 * using shadcn/ui components and the useDateSelect hook for functionality.
 *
 * Matches the exact styling and structure of the original DateSelect component.
 */
export function DateSelectExample({
  children,
  iconSlot,
  className,
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
}: DateSelectExampleProps) {
  const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } = useDateSelect({
    yearRangeStartOffset,
    yearRangeEndOffset,
  })

  return (
    <div
      className={className || 'flex items-center gap-2'}
      {...props}
    >
      {iconSlot}
      <div className='flex items-center gap-4'>
        <Popover {...popoverProps}>
          <PopoverTrigger
            {...popoverTriggerProps}
            className={cn(
              'hover:bg-hover cursor-pointer rounded px-2 py-1 transition-colors duration-200 ease-in-out',
              popoverTriggerProps?.className
            )}
          >
            {children ?? <Label className='capitalize' />}
          </PopoverTrigger>
          <PopoverContent
            {...popoverContentProps}
            className={cn('flex w-auto gap-2 p-2', popoverContentProps?.className)}
          >
            <Select
              value={currentMonth.toString()}
              onValueChange={(value) => onMonthChange(parseInt(value))}
              {...monthSelectProps}
            >
              <SelectTrigger
                {...monthSelectTriggerProps}
                className={cn('text-label rounded capitalize', monthSelectTriggerProps?.className)}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent {...monthSelectContentProps}>
                <SelectGroup>
                  {months.map((month, index) => (
                    <SelectItem
                      key={index}
                      value={index.toString()}
                      className='capitalize'
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={currentYear.toString()}
              onValueChange={(value) => onYearChange(parseInt(value))}
              {...yearSelectProps}
            >
              <SelectTrigger
                {...yearSelectTriggerProps}
                className={cn('text-label rounded', yearSelectTriggerProps?.className)}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent {...yearSelectContentProps}>
                <SelectGroup>
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
