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
export interface CalendarProps {
  showWeekdays?: boolean
  weekdayLabels?: string[]
  id?: string
  showLabel?: boolean
}

export type GroupingModeType = 'all' | 'disabled' | string[]

export interface HeaderProps {
  groupingMode?: GroupingModeType
  enablePeriodChange?: boolean
}

export interface DatePickerProviderProps {
  children: React.ReactNode
  startDate?: string | Date
  type?: CalendarType
  normalizeHeight?: boolean
  initialDates?: InitialDatesObject
  disabledDates?: DisabledDatesObject
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
  startDate: string | Date
  selected: SelectedDate
  hovered: CurrentDay | null
  type: CalendarType
  header: HTMLElement | null
  calendarRefs: Array<{ updateMonthTable: (newDate: string | Date) => void }>
  groupingMode: GroupingModeType
  handleSetHovered: (day?: CurrentDay) => void
  handleSetHeaderRef: (ref: HTMLDivElement | null) => void
  handleAddCalendarRef: (ref: CalendarRefObject) => void;
  handleDateSelect: handleDateSelectType
  handleSetGroupingMode: (mode: GroupingModeType) => void;
  createMonthTable: (tableDate?: string | Date) => Map<number, CurrentDay[]>
  isDateDisabled: (day: string) => boolean
}