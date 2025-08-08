import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SelectedDate, CurrentDay, CurrentRange, NormalizedSelection } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeSelection(selectedData: SelectedDate): NormalizedSelection {
  const { selection, type } = selectedData

  if (!selection) return null

  switch (type) {
    case 'single':
      return (selection as CurrentDay).day.date

    case 'multiple':
      return (selection as CurrentDay[]).map(item => item.day.date)

    case 'range': {
      const rangeSelection = selection as CurrentRange
      // Return complete range only if both start and end exist, otherwise null
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


