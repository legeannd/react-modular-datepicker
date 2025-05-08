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

export type CalendarType = 'single' | 'multiple' | 'range'
export interface CalendarProps {
  showWeekdays?: boolean
  weekdayLabels?: string[]
}


export interface DatePickerProviderProps {
  children: React.ReactNode
  initialDate?: string | Date
  type?: CalendarType
  normalizeMultipleCalendarsHeight?: boolean
}

export type CalendarRefObject = React.RefObject<{
  updateMonthTable: (newDate?: string | Date) => void
}>

export type HandleDateClickType = (day: CurrentDay) => void

export type SelectedDate =
  | { type: 'single'; selection: CurrentDay | null }
  | { type: 'multiple'; selection: CurrentDay[] | null }
  | { type: 'range'; selection: CurrentRange | null }

export interface DatePickerContextType {
  initialDate: string | Date
  selected: SelectedDate
  hovered: CurrentDay | null
  type: CalendarType
  header: HTMLElement | null
  calendarRefs: Array<{ updateMonthTable: (newDate: string | Date) => void }>
  handleSetHovered: (day?: CurrentDay) => void
  handleSetHeaderRef: (ref: HTMLDivElement | null) => void
  handleAddCalendarRef: (ref: CalendarRefObject) => void;
  handleDateClick: HandleDateClickType
  createMonthTable: (tableDate?: string | Date) => Map<number, CurrentDay[]>
}