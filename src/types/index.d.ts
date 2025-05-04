export interface CurrentDay {
  day: {
    label: number
    date: string
  }
  isCurrentMonth: boolean
}

export interface CalendarProps {
  showWeekdays?: boolean
  weekdayLabels?: string[]
}


export interface DatePickerProviderProps {
  children: React.ReactNode
  initialDate?: string | Date
}

export type CalendarRefObject = React.RefObject<{
  updateMonthTable: (newDate?: string | Date) => void
}>

export interface DatePickerContextType {
  initialDate: string | Date
  selected: CurrentDay | null
  header: HTMLElement | null
  calendarRefs: Array<{ updateMonthTable: (newDate: string | Date) => void }>
  getHeaderRef: (ref: HTMLDivElement | null) => void
  handleAddCalendarRef: (ref: CalendarRefObject) => void;
  handleDateClick: (day: CurrentDay) => void
  createMonthTable: (tableDate?: string | Date) => Map<number, CurrentDay[]>
}