import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SelectedDate, CurrentDay, CurrentRange, DatePickerSelection } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeSelection(selectedData: SelectedDate): DatePickerSelection {
  const { selection, type } = selectedData

  if (!selection) return null

  switch (type) {
    case 'single':
      return (selection as CurrentDay).day.date

    case 'multiple':
      return (selection as CurrentDay[]).map(item => item.day.date)

    case 'range': {
      const rangeSelection = selection as CurrentRange
      if (rangeSelection.start && rangeSelection.end) {
        return {
          start: rangeSelection.start.day.date,
          end: rangeSelection.end.day.date
        }
      }
      return null
    }

    default:
      return null
  }
}


