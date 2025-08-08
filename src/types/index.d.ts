import { Locales } from "@/lib/locale"
import { Dayjs } from "dayjs"
import { ButtonHTMLAttributes, ComponentProps, HTMLAttributes } from "react"
import type * as PopoverPrimitive from '@radix-ui/react-popover'
import type * as SelectPrimitive from '@radix-ui/react-select'

/** Internal representation of a calendar day */
export interface CurrentDay {
  day: {
    label: number
    date: string
  }
  isCurrentMonth?: boolean
}

/** Internal date range representation */
export interface CurrentRange {
  start?: CurrentDay
  end?: CurrentDay
}

/** Initial selected dates configuration - used in defaultSelected prop */
export interface InitialDatesObject {
  days?: string[]
  start?: string
  end?: string
}

/** Configuration for disabling dates - used in disabledDates prop */
export interface DisabledDatesObject extends InitialDatesObject {
  every?: 'weekend' | 'weekdays'
  weekdays?: number[]
}

/** Selection type: 'single' | 'multiple' | 'range' */
export type CalendarType = 'single' | 'multiple' | 'range'

/** Single date selection as ISO string or null */
export type NormalizedSingleSelection = string | null

/** Multiple date selection as array of ISO strings or null */
export type NormalizedMultipleSelection = string[] | null

/** Range selection with both start and end dates, or null if no complete range */
export type NormalizedRangeSelection = { start: string; end: string } | null

/** Normalized selection data returned in onSelectionChange callback */
export type NormalizedSelection =
  | NormalizedSingleSelection
  | NormalizedMultipleSelection
  | NormalizedRangeSelection

/** CSS classes for day button states */
export interface DayButtonClassNames {
  /** Base styles applied to all day buttons - foundation layer for all states */
  base?: string
  /** Styles for the current date (today) - suppressed when in betweenRange state */
  today?: string
  /** Styles for selected dates - high priority, overrides hover/weekend/today states. In Header + multi-calendar setups, suppressed on different-month dates to avoid visual confusion */
  selected?: string
  /** Styles for dates from different months - applies to prev/next month dates shown in calendar grid, suppressed when selected */
  differentMonth?: string
  /** Styles for first/last days of the month - applies regardless of other states */
  monthBoundary?: string
  /** Styles for range start date - only works with type="range", mutually exclusive with rangeEnd */
  rangeStart?: string
  /** Styles for range end date - only works with type="range", mutually exclusive with rangeStart */
  rangeEnd?: string
  /** Styles for dates between start and end in range selection - only works with type="range", suppresses weekend/today */
  betweenRange?: string
  /** Styles for hovered dates - only applies when not selected and not in range */
  hovered?: string
  /** Styles for weekend dates (Saturday/Sunday) - suppressed when hovered, selected, in range, or month boundary */
  weekend?: string
  /** Styles for disabled dates - highest priority, always visible, overrides all other states */
  disabled?: string
  /** Styles for disabled dates within a selected range - specific override for disabled dates in range context */
  disabledInRange?: string
}

/** Props for the Calendar component that renders the date grid */
export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to display weekday headers above the calendar grid */
  showWeekdays?: boolean
  /** Custom labels for weekday headers (7 items: Sunday through Saturday) */
  weekdayLabels?: string[]
  /** CSS classes for styling the weekday header row */
  weekdayClassName?: string
  /** Unique identifier for the calendar instance */
  id?: string
  /** Whether to show a label/title for the calendar */
  showLabel?: boolean
  /** CSS classes for styling the calendar footer area */
  footerClassName?: string
  /** Custom styling configuration for day buttons with state-based priorities */
  dayButtonClassNames?: DayButtonClassNames
}

/**
 * Controls how multiple calendars are grouped and displayed together
 * 
 * - 'all': Group all calendars together in a single view
 * - 'disabled': Show calendars individually without grouping  
 * - string[]: Array of specific calendar IDs to group together
 */
export type GroupingModeType = 'all' | 'disabled' | string[]

/** Props for the Header component that wraps calendar navigation controls */
export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Navigation controls and date selection components (DateSelect, Button, MonthLabel) */
  children?: React.ReactNode
  /** Controls how calendars are grouped together. "all" groups all calendars, "disabled" shows individual calendars, or array of specific calendar IDs to group */
  groupingMode?: GroupingModeType
  /** CSS classes for styling the calendar grid layout container */
  calendarGridClassName?: string
}

/** Props for the MonthLabel component that displays the current month name */
export interface MonthLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Display format for the month name - 'short' for abbreviated (Jan, Feb) or 'full' for complete name (January, February) */
  type?: 'short' | 'full'
}

/** Props for the DateSelect component that provides month/year selection controls */
export interface DateSelectProps extends HTMLAttributes<HTMLDivElement> {
  /** Child components like MonthLabel to display inside the date selector */
  children?: React.ReactNode
  /** Whether to show calendar icon in the date selector */
  showIcon?: boolean
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

/** Props for the Button component that provides navigation controls */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button type for navigation - 'previous' for going back or 'next' for going forward */
  type: 'previous' | 'next'
}

/** Props for the DatePickerProvider component - the root uncontrolled date picker */
export interface DatePickerProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Child components (Calendar, Header, etc.) */
  children: React.ReactNode
  /** Initial month to display when the calendar first loads (Date object or ISO string) */
  initialMonth?: string | Date
  /** Initial selected dates for uncontrolled mode - gets converted to normalized format in callbacks */
  defaultSelected?: InitialDatesObject
  /** Calendar selection mode - determines how users can select dates */
  type?: CalendarType
  /** Whether to normalize all calendar grids to have the same height (6 weeks) */
  normalizeHeight?: boolean
  /** Configuration for disabling specific dates or date patterns */
  disabledDates?: DisabledDatesObject
  /** Locale for date formatting and localization */
  locale?: Locales
  /** Whether to disable month/year navigation controls */
  disablePeriodChange?: boolean
  /** Callback fired when the selection changes, receives clean normalized data */
  onSelectionChange?: (selection: NormalizedSelection, type: CalendarType) => void
}

/** Internal calendar reference type for programmatic updates */
export type CalendarRefObject = React.RefObject<{
  updateMonthTable: (newDate?: string | Date) => void
}>

/** Internal date selection handler function type */
export type HandleDateSelectType = (day: CurrentDay) => void

/** Internal selected dates state representation */
export type SelectedDate =
  | { type: 'single'; selection: CurrentDay | null }
  | { type: 'multiple'; selection: CurrentDay[] | null }
  | { type: 'range'; selection: CurrentRange | null }

/** Internal context type for date picker state management */
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