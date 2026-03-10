import { describe, it, expect } from 'vitest'
import { normalizeSelection, convertValueToInitialDates } from './utils'
import type { SelectedDate } from '@/types'

describe('normalizeSelection', () => {
  it('returns null when selection is null', () => {
    const selected: SelectedDate = { type: 'single', selection: null }
    expect(normalizeSelection(selected)).toBeNull()
  })

  it('returns an ISO string for single selection', () => {
    const selected: SelectedDate = {
      type: 'single',
      selection: { day: { label: 15, date: '2024-03-15T00:00:00.000Z' }, isCurrentMonth: true },
    }
    expect(normalizeSelection(selected)).toBe('2024-03-15T00:00:00.000Z')
  })

  it('returns an array of ISO strings for multiple selection', () => {
    const selected: SelectedDate = {
      type: 'multiple',
      selection: [
        { day: { label: 1, date: '2024-03-01T00:00:00.000Z' }, isCurrentMonth: true },
        { day: { label: 5, date: '2024-03-05T00:00:00.000Z' }, isCurrentMonth: true },
      ],
    }
    expect(normalizeSelection(selected)).toEqual([
      '2024-03-01T00:00:00.000Z',
      '2024-03-05T00:00:00.000Z',
    ])
  })

  it('returns null for multiple selection with null', () => {
    const selected: SelectedDate = { type: 'multiple', selection: null }
    expect(normalizeSelection(selected)).toBeNull()
  })

  it('returns { start, end } object for complete range selection', () => {
    const selected: SelectedDate = {
      type: 'range',
      selection: {
        start: { day: { label: 10, date: '2024-03-10T00:00:00.000Z' }, isCurrentMonth: true },
        end: { day: { label: 20, date: '2024-03-20T00:00:00.000Z' }, isCurrentMonth: true },
      },
    }
    expect(normalizeSelection(selected)).toEqual({
      start: '2024-03-10T00:00:00.000Z',
      end: '2024-03-20T00:00:00.000Z',
    })
  })

  it('returns null for partial range (only start, no end)', () => {
    const selected: SelectedDate = {
      type: 'range',
      selection: {
        start: { day: { label: 10, date: '2024-03-10T00:00:00.000Z' }, isCurrentMonth: true },
      },
    }
    expect(normalizeSelection(selected)).toBeNull()
  })

  it('returns null for range selection with null', () => {
    const selected: SelectedDate = { type: 'range', selection: null }
    expect(normalizeSelection(selected)).toBeNull()
  })

  it('returns null for unknown type (default branch)', () => {
    const selected = { type: 'unknown', selection: { day: { label: 1, date: '2024-03-01T00:00:00.000Z' } } } as unknown as SelectedDate
    expect(normalizeSelection(selected)).toBeNull()
  })
})

describe('convertValueToInitialDates', () => {
  it('converts single string value to { days: [value] }', () => {
    expect(convertValueToInitialDates('2024-03-15', 'single')).toEqual({
      days: ['2024-03-15'],
    })
  })

  it('converts array value to { days: array } for multiple', () => {
    const dates = ['2024-03-01', '2024-03-10']
    expect(convertValueToInitialDates(dates, 'multiple')).toEqual({ days: dates })
  })

  it('converts range value to { start, end } object', () => {
    const range = { start: '2024-03-01', end: '2024-03-15' }
    expect(convertValueToInitialDates(range, 'range')).toEqual({
      start: '2024-03-01',
      end: '2024-03-15',
    })
  })

  it('returns empty object for unknown type (default branch)', () => {
    expect(convertValueToInitialDates('2024-03-01', 'unknown' as never)).toEqual({})
  })
})
