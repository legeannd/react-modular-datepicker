import { ReactNode } from "react"

export interface CurrentDay {
  day: number
  isCurrentMonth: boolean
}

export interface CalendarProps {
  showWeekdays?: boolean
  weekdayLabels?: string[]
}


export interface DatePickerProviderProps {
  children: ReactNode
}

export interface DatePickerContextType {
  selected: CurrentDay | null
  month: { [key: string]: CurrentDay[] }
  date: string
  handleDateClick: (day: CurrentDay) => void
}