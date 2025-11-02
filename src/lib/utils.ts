
import type { SelectedDate, CurrentDay, CurrentRange, DatePickerSelection, SingleSelection, MultipleSelection, RangeSelection, InitialDatesObject, CalendarType } from "@/types"

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

export function convertValueToInitialDates(
  value: SingleSelection | MultipleSelection | RangeSelection,
  type: CalendarType
): InitialDatesObject {
  switch (type) {
    case 'single':
      return { days: [value as string] }

    case 'multiple':
      return { days: value as string[] }

    case 'range': {
      const rangeValue = value as { start: string; end: string }
      return {
        start: rangeValue.start,
        end: rangeValue.end
      }
    }

    default:
      return {}
  }
}
