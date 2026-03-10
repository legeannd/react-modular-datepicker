import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { useDateSelect } from './useDateSelect'
import { DatePickerProvider } from '@/components/DatePickerProvider'

function makeWrapper(initialMonth?: string) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <DatePickerProvider initialMonth={initialMonth || '2024-06-01'}>
        {children}
      </DatePickerProvider>
    )
  }
}

describe('useDateSelect', () => {
  it('returns 12 months', () => {
    const { result } = renderHook(() => useDateSelect(), { wrapper: makeWrapper() })
    expect(result.current.months).toHaveLength(12)
  })

  it('months are locale strings (e.g. first is January)', () => {
    const { result } = renderHook(() => useDateSelect(), { wrapper: makeWrapper() })
    expect(result.current.months[0]).toBeTruthy()
    expect(typeof result.current.months[0]).toBe('string')
  })

  it('returns currentMonth matching the initialMonth', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    // June = index 5
    expect(result.current.currentMonth).toBe(5)
  })

  it('returns currentYear matching the initialMonth', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    expect(result.current.currentYear).toBe(2024)
  })

  it('default years array has 51 entries (10 ahead + current + 40 behind)', () => {
    const { result } = renderHook(() => useDateSelect(), { wrapper: makeWrapper() })
    // startYear = baseYear + 10, endYear = baseYear - 40 => 51 entries
    expect(result.current.years).toHaveLength(51)
  })

  it('years array is ordered descending (most recent first)', () => {
    const { result } = renderHook(() => useDateSelect(), { wrapper: makeWrapper() })
    const { years } = result.current
    expect(years[0]).toBeGreaterThan(years[years.length - 1])
  })

  it('custom yearRangeStartOffset and yearRangeEndOffset change array length', () => {
    const { result } = renderHook(
      () => useDateSelect({ yearRangeStartOffset: 5, yearRangeEndOffset: 5 }),
      { wrapper: makeWrapper() }
    )
    // startYear = baseYear + 5, endYear = baseYear - 5 => 11 entries
    expect(result.current.years).toHaveLength(11)
  })

  it('onMonthChange updates currentMonth', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    act(() => {
      result.current.onMonthChange(0) // January
    })
    expect(result.current.currentMonth).toBe(0)
  })

  it('onMonthChange does not change the year', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    act(() => {
      result.current.onMonthChange(11) // December
    })
    expect(result.current.currentYear).toBe(2024)
  })

  it('onYearChange updates currentYear', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    act(() => {
      result.current.onYearChange(2020)
    })
    expect(result.current.currentYear).toBe(2020)
  })

  it('onYearChange does not change the month', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    act(() => {
      result.current.onYearChange(2030)
    })
    expect(result.current.currentMonth).toBe(5) // still June
  })

  it('years array contains the initialYear', () => {
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper('2024-06-01'),
    })
    expect(result.current.years).toContain(2024)
  })

  it('first year in array = baseYear + startOffset (default 10)', () => {
    const initialYear = 2024
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper(`${initialYear}-01-01`),
    })
    expect(result.current.years[0]).toBe(initialYear + 10)
  })

  it('last year in array = baseYear - endOffset (default 40)', () => {
    const initialYear = 2024
    const { result } = renderHook(() => useDateSelect(), {
      wrapper: makeWrapper(`${initialYear}-01-01`),
    })
    const { years } = result.current
    expect(years[years.length - 1]).toBe(initialYear - 40)
  })
})
