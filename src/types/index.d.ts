import { ReactNode } from "react"

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
  children: ReactNode
  initialDate?: string | Date
}

export interface DatePickerContextType {
  selected: CurrentDay | null
  month: { [key: string]: CurrentDay[] }
  handleDateClick: (day: CurrentDay) => void
}