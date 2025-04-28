export interface CurrentDay {
  day: number
  isCurrentMonth: boolean
}

export interface DatePickerContextType {
  selected: CurrentDay | null
  month: { [key: string]: CurrentDay[] }
  weekdays: string[]
  date: string
  handleDateClick: (day: CurrentDay) => void
}