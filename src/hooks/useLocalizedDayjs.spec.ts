import { describe, it, expect, vi } from 'vitest'
import { useLocalizedDayjs } from './useLocalizedDayjs'
import dayjs from 'dayjs'

describe('useLocalizedDayjs', () => {
  it('returns a getDayjs function', () => {
    const { getDayjs } = useLocalizedDayjs()
    expect(typeof getDayjs).toBe('function')
  })

  it('default factory produces a valid Dayjs object', () => {
    const { getDayjs } = useLocalizedDayjs()
    const result = getDayjs('2024-03-15')
    expect(result.isValid()).toBe(true)
    expect(result.year()).toBe(2024)
    expect(result.month()).toBe(2) // March = index 2
    expect(result.date()).toBe(15)
  })

  it('default factory uses "en" locale', () => {
    const { getDayjs } = useLocalizedDayjs()
    const result = getDayjs('2024-01-01')
    expect(result.locale()).toBe('en')
  })

  it('default factory works with no date argument', () => {
    const { getDayjs } = useLocalizedDayjs()
    const result = getDayjs()
    expect(result.isValid()).toBe(true)
  })

  it('uses the custom dayjs factory when provided', () => {
    const customDate = dayjs('2024-06-10')
    const customDayjs = vi.fn().mockReturnValue(customDate) as unknown as typeof dayjs
    const { getDayjs } = useLocalizedDayjs(customDayjs)
    const result = getDayjs('2024-06-10')
    expect(customDayjs).toHaveBeenCalledWith('2024-06-10')
    expect(result).toBe(customDate)
  })

  it('default factory supports localeData() plugin', () => {
    const { getDayjs } = useLocalizedDayjs()
    const d = getDayjs()
    expect(typeof d.localeData).toBe('function')
    const localeData = d.localeData()
    expect(Array.isArray(localeData.months())).toBe(true)
    expect(localeData.months()).toHaveLength(12)
  })

  it('default factory supports isToday() plugin', () => {
    const { getDayjs } = useLocalizedDayjs()
    const today = getDayjs(new Date())
    expect(today.isToday()).toBe(true)
    const past = getDayjs('2000-01-01')
    expect(past.isToday()).toBe(false)
  })
})
