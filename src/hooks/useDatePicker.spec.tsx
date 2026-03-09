import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { useDatePicker } from './useDatePicker'
import { DatePickerProvider } from '@/components/DatePickerProvider'

describe('useDatePicker', () => {
  it('throws a descriptive error when used outside DatePickerProvider', () => {
    expect(() => renderHook(() => useDatePicker())).toThrow(
      'DatePicker components cannot be rendered outside the DatePickerProvider'
    )
  })

  it('returns context without throwing when used inside DatePickerProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current).toBeDefined()
  })

  it('exposes the expected context API', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const ctx = result.current

    expect(typeof ctx.selected).toBe('object')
    expect(typeof ctx.type).toBe('string')
    expect(typeof ctx.handleDateSelect).toBe('function')
    expect(typeof ctx.handleSetHovered).toBe('function')
    expect(typeof ctx.handleSetHeaderRef).toBe('function')
    expect(typeof ctx.handleAddCalendarRef).toBe('function')
    expect(typeof ctx.handleSetGroupingMode).toBe('function')
    expect(typeof ctx.createMonthTable).toBe('function')
    expect(typeof ctx.isDateDisabled).toBe('function')
    expect(typeof ctx.dayjs).toBe('function')
    expect(typeof ctx.handleChangeReferenceDate).toBe('function')
  })

  it('reflects the provider type prop in the context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider type='multiple'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.type).toBe('multiple')
  })

  it('context selected starts with null selection', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.selected.selection).toBeNull()
  })

  it('context groupingMode defaults to "all"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.groupingMode).toBe('all')
  })
})
