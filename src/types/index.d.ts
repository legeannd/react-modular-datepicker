import { Locales } from "@/lib/locale"
import { Dayjs } from "dayjs"
import { ButtonHTMLAttributes, ComponentProps, HTMLAttributes } from "react"
import type * as PopoverPrimitive from '@radix-ui/react-popover'
import type * as SelectPrimitive from '@radix-ui/react-select'

export interface CurrentDay {
  day: {
    label: number
    date: string
  }
  isCurrentMonth?: boolean
}

export interface CurrentRange {
  start?: CurrentDay
  end?: CurrentDay
}

export interface InitialDatesObject {
  days?: string[]
  start?: string
  end?: string
}

export interface DisabledDatesObject extends InitialDatesObject {
  every?: 'weekend' | 'weekdays'
  weekdays?: number[]
}

export type CalendarType = 'single' | 'multiple' | 'range'

export interface DayButtonStyles {
  base?: string
  today?: string
  selected?: string
  differentMonth?: string
  monthBoundary?: string
  rangeStart?: string
  rangeEnd?: string
  betweenRange?: string
  hovered?: string
  weekend?: string
  disabled?: string
  disabledInRange?: string
}

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  showWeekdays?: boolean
  weekdayLabels?: string[]
  weekdayClassName?: string
  id?: string
  showLabel?: boolean
  dayButtonStyles?: DayButtonStyles
}

export type GroupingModeType = 'all' | 'disabled' | string[]

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  groupingMode?: GroupingModeType
  calendarGridClassName?: string
}

export interface MonthLabelProps extends HTMLAttributes<HTMLSpanElement> { type?: 'short' | 'full' }

export interface DateSelectProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  showIcon?: boolean
  yearRangeStartOffset?: number
  yearRangeEndOffset?: number
  popoverProps?: ComponentProps<typeof PopoverPrimitive.Root>
  popoverTriggerProps?: ComponentProps<typeof PopoverPrimitive.Trigger>
  popoverContentProps?: ComponentProps<typeof PopoverPrimitive.Content>
  monthSelectProps?: ComponentProps<typeof SelectPrimitive.Root>
  monthSelectTriggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>
  monthSelectContentProps?: ComponentProps<typeof SelectPrimitive.Content>
  yearSelectProps?: ComponentProps<typeof SelectPrimitive.Root>
  yearSelectTriggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>
  yearSelectContentProps?: ComponentProps<typeof SelectPrimitive.Content>
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { type: 'previous' | 'next' }

export interface DatePickerProviderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultValue?: string | Date
  type?: CalendarType
  normalizeHeight?: boolean
  initialDates?: InitialDatesObject
  disabledDates?: DisabledDatesObject
  locale?: Locales
  disablePeriodChange?: boolean
}

export type CalendarRefObject = React.RefObject<{
  updateMonthTable: (newDate?: string | Date) => void
}>

export type handleDateSelectType = (day: CurrentDay) => void

export type SelectedDate =
  | { type: 'single'; selection: CurrentDay | null }
  | { type: 'multiple'; selection: CurrentDay[] | null }
  | { type: 'range'; selection: CurrentRange | null }

export interface DatePickerContextType {
  defaultValue: string | Date
  selected: SelectedDate
  hovered: CurrentDay | null
  type: CalendarType
  header: HTMLElement | null
  calendarRefs: Array<{ updateMonthTable: (newDate: string | Date) => void }>
  groupingMode: GroupingModeType
  refDate: Dayjs
  disablePeriodChange: boolean
  handleSetHovered: (day?: CurrentDay) => void
  handleSetHeaderRef: (ref: HTMLDivElement | null) => void
  handleAddCalendarRef: (ref: CalendarRefObject) => void;
  handleDateSelect: handleDateSelectType
  handleSetGroupingMode: (mode: GroupingModeType) => void;
  createMonthTable: (tableDate?: string | Date) => Map<number, CurrentDay[]>
  isDateDisabled: (day: string) => boolean
  dayjs: (date?: string | Date | Dayjs) => Dayjs
  handleChangeReferenceDate: (date: Dayjs) => void
}