import { Dayjs } from "dayjs"
import { ButtonHTMLAttributes, HTMLAttributes } from "react"

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
export type SingleSelection = string | null

/** Multiple date selection as array of ISO strings or null */
export type MultipleSelection = string[] | null

/** Range selection with both start and end dates, or null if no complete range */
export type RangeSelection = { start: string; end: string } | null

/** Normalized selection data returned in onSelectionChange callback */
export type DatePickerSelection =
  | SingleSelection
  | MultipleSelection
  | RangeSelection

/** Maps CalendarType to its corresponding Selection type */
export type SelectionForType<T extends CalendarType> =
  T extends 'single' ? SingleSelection :
  T extends 'multiple' ? MultipleSelection :
  T extends 'range' ? RangeSelection :
  never

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
  /** Unique identifier for the calendar instance. If the header grouping is set to string[], it will be matched if this ID is inside of the array as well */
  id?: string
  /** Custom footer content using render prop pattern. Receives calendar data for full customization. If not provided, no footer will be rendered */
  footerSlot?: (data: { currentDate: Dayjs }) => React.ReactNode
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
  /** Navigation controls and date selection components (Button, Label) */
  children?: React.ReactNode
  /** Controls how calendars are grouped together. "all" groups all calendars, "disabled" shows individual calendars, or array of specific calendar IDs to group */
  groupingMode?: GroupingModeType
  /** CSS classes for styling the calendar grid layout container */
  calendarGridClassName?: string
  /** CSS classes for styling the header container */
  childrenClassName?: string
}

interface LabelRangeProps {
  start: {
    month: string
    year: number
  }
  end: {
    month: string
    year: number
  }
}

/** Props for the Label component that displays the current month name */
export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Display format for the month name - 'short' for abbreviated (Jan, Feb) or 'long' for complete name (January, February) */
  type?: 'short' | 'long'
  /** Custom content to display inside the months label using the month range */
  children?: (data: LabelRangeProps) => React.ReactNode
}

/** Props for the Button component that provides navigation controls */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button type for navigation - 'previous' for going back or 'next' for going forward */
  type: 'previous' | 'next'
  /** Custom content to display in the button (icons, text, or any React element). If not provided, falls back to default chevron icons */
  children?: React.ReactNode
}

/** Props for the DatePickerProvider component - the root uncontrolled date picker */
export interface DatePickerProviderBaseProps extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Child components (Calendar, Header, etc.) */
  children: React.ReactNode
  /** Initial month to display when the calendar first loads (Date object or ISO string) */
  initialMonth?: string | Date
  /** Initial selected dates for uncontrolled mode - gets converted to normalized format in callbacks */
  defaultSelected?: InitialDatesObject
  /** Whether to normalize all calendar grids to have the same height (6 weeks) */
  normalizeHeight?: boolean
  /** Configuration for disabling specific dates or date patterns */
  disabledDates?: DisabledDatesObject
  /** Custom dayjs instance for date formatting and localization. If not provided, uses default English dayjs */
  dayjs?: (date?: string | Date | Dayjs) => Dayjs
}

/** Specific props for single selection mode */
export interface DatePickerProviderSingleProps extends DatePickerProviderBaseProps {
  /** Calendar selection mode - determines how users can select dates */
  type?: 'single'
  /** Callback fired when the selection changes, receives clean normalized data */
  onSelectionChange?: (selection: SingleSelection) => void
}

/** Specific props for multiple selection mode */
export interface DatePickerProviderMultipleProps extends DatePickerProviderBaseProps {
  /** Calendar selection mode - determines how users can select dates */
  type: 'multiple'
  /** Callback fired when the selection changes, receives clean normalized data */
  onSelectionChange?: (selection: MultipleSelection) => void
}

/** Specific props for range selection mode */
export interface DatePickerProviderRangeProps extends DatePickerProviderBaseProps {
  /** Calendar selection mode - determines how users can select dates */
  type: 'range'
  /** Callback fired when the selection changes, receives clean normalized data */
  onSelectionChange?: (selection: RangeSelection) => void
}

/** Union of all possible DatePickerProvider prop combinations for proper type inference */
export type DatePickerProviderProps =
  | DatePickerProviderSingleProps
  | DatePickerProviderMultipleProps
  | DatePickerProviderRangeProps


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
  selected: SelectedDate
  hovered: CurrentDay | null
  type: CalendarType
  header: HTMLElement | null
  calendarRefs: Array<{ updateMonthTable: (newDate: string | Date) => void }>
  groupingMode: GroupingModeType
  refDate: Dayjs
  handleSetHovered: (day?: CurrentDay) => void
  handleSetHeaderRef: (ref: HTMLDivElement | null) => void
  handleAddCalendarRef: (ref: CalendarRefObject) => void;
  handleDateSelect: HandleDateSelectType
  handleSetGroupingMode: (mode: GroupingModeType) => void;
  createMonthTable: (tableDate?: string | Date) => Map<number, CurrentDay[]>
  isDateDisabled: (day: string) => boolean
  dayjs: (date?: string | Date | Dayjs) => Dayjs
  handleChangeReferenceDate: (date: Dayjs) => void
}

/** Options for the useDateSelect hook */
export interface UseDateSelectOptions {
  /** Number of years to offset from current year for the start of year range selection */
  yearRangeStartOffset?: number
  /** Number of years to offset from current year for the end of year range selection */
  yearRangeEndOffset?: number
}

/** Return type for the useDateSelect hook */
export interface UseDateSelectReturn {
  /** Current month index (0-11) */
  currentMonth: number
  /** Current year */
  currentYear: number
  /** Array of localized month names - use array index as month value (0-11) */
  months: string[]
  /** Array of years within the configured range */
  years: number[]
  /** Handler for month change. Update the current starting month of the calendars */
  onMonthChange: (monthIndex: number) => void
  /** Handler for year change. Update the current starting year of the calendars */
  onYearChange: (year: number) => void
}

/**
 * Factory function type for creating localized Dayjs objects.
 * Pass this to DatePickerProvider to control date formatting and localization.
 *
 * Example usage:
 *   const portugueseDayjs: DayjsInstance = (date) => dayjs(date).locale('pt-br');
 *   <DatePickerProvider dayjs={portugueseDayjs} />
 *
 * @param date - The date value to parse (string, Date, or Dayjs)
 * @returns Localized Dayjs object
 */
export type DayjsInstance = (date?: dayjs.ConfigType) => Dayjs
