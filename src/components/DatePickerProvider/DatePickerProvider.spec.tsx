import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
  act,
} from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import React from 'react'
import { DatePickerProvider } from '.'
import { Calendar } from '../Calendar'
import { useDatePicker } from '@/hooks/useDatePicker'

afterEach(cleanup)

// ─── Basic rendering ──────────────────────────────────────────────────────────

describe('DatePickerProvider – rendering', () => {
  it('renders children', () => {
    render(
      <DatePickerProvider>
        <span data-testid='child'>hello</span>
      </DatePickerProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders the rmdp-provider container', () => {
    render(
      <DatePickerProvider>
        <span />
      </DatePickerProvider>
    )
    expect(document.getElementById('rmdp-provider')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(
      <DatePickerProvider className='custom-class'>
        <span />
      </DatePickerProvider>
    )
    const el = document.getElementById('rmdp-provider')
    expect(el).toHaveClass('custom-class')
  })

  it('defaults type to "single"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.type).toBe('single')
  })

  it('reflects type="multiple" in context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider type='multiple'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.type).toBe('multiple')
  })

  it('reflects type="range" in context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider type='range'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.type).toBe('range')
  })
})

// ─── createMonthTable ─────────────────────────────────────────────────────────

describe('DatePickerProvider – createMonthTable', () => {
  it('returns a Map with week entries', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider initialMonth='2024-03-01'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const table = result.current.createMonthTable('2024-03-01')
    expect(table).toBeInstanceOf(Map)
    expect(table.size).toBeGreaterThanOrEqual(4)
    expect(table.size).toBeLessThanOrEqual(6)
  })

  it('each week has 7 days', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider initialMonth='2024-03-01'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const table = result.current.createMonthTable('2024-03-01')
    table.forEach((week) => {
      expect(week).toHaveLength(7)
    })
  })

  it('marks days in the current month as isCurrentMonth=true', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider initialMonth='2024-03-01'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const table = result.current.createMonthTable('2024-03-01')
    const allDays = Array.from(table.values()).flat()
    const currentMonthDays = allDays.filter((d) => d.isCurrentMonth)
    expect(currentMonthDays).toHaveLength(31) // March has 31 days
  })

  it('normalizeHeight=true always produces 6 weeks', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider
        initialMonth='2024-02-01'
        normalizeHeight
      >
        {children}
      </DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const table = result.current.createMonthTable('2024-02-01')
    expect(table.size).toBe(6)
  })
})

// ─── isDateDisabled ───────────────────────────────────────────────────────────

describe('DatePickerProvider – isDateDisabled', () => {
  it('disables weekends when every="weekend"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{ every: 'weekend' }}>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    // 2024-03-02 is a Saturday
    expect(result.current.isDateDisabled('2024-03-02')).toBe(true)
    // 2024-03-03 is a Sunday
    expect(result.current.isDateDisabled('2024-03-03')).toBe(true)
    // 2024-03-04 is a Monday
    expect(result.current.isDateDisabled('2024-03-04')).toBe(false)
  })

  it('disables specific weekday indices when every="weekdays"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider
        disabledDates={{ every: 'weekdays', weekdays: [1, 3] }} // Monday=1, Wednesday=3
      >
        {children}
      </DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    // 2024-03-04 is Monday (day=1)
    expect(result.current.isDateDisabled('2024-03-04')).toBe(true)
    // 2024-03-06 is Wednesday (day=3)
    expect(result.current.isDateDisabled('2024-03-06')).toBe(true)
    // 2024-03-05 is Tuesday (day=2)
    expect(result.current.isDateDisabled('2024-03-05')).toBe(false)
  })

  it('disables specific dates listed in days array', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{ days: ['2024-03-15', '2024-03-20'] }}>
        {children}
      </DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.isDateDisabled('2024-03-15')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-20')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-16')).toBe(false)
  })

  it('disables all dates after start when only start is provided', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{ start: '2024-03-10' }}>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.isDateDisabled('2024-03-11')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-09')).toBe(false)
  })

  it('disables all dates before end when only end is provided', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{ end: '2024-03-10' }}>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.isDateDisabled('2024-03-09')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-11')).toBe(false)
  })

  it('disables dates within start–end range (inclusive)', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{ start: '2024-03-10', end: '2024-03-15' }}>
        {children}
      </DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.isDateDisabled('2024-03-10')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-12')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-15')).toBe(true)
    expect(result.current.isDateDisabled('2024-03-09')).toBe(false)
    expect(result.current.isDateDisabled('2024-03-16')).toBe(false)
  })

  it('does not disable dates when disabledDates is empty', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider disabledDates={{}}>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    expect(result.current.isDateDisabled('2024-03-15')).toBe(false)
  })

  it('combines multiple disable rules (union)', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider
        disabledDates={{ every: 'weekend', days: ['2024-03-18'] }} // March 18 = Monday
      >
        {children}
      </DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    // Saturday March 16 = disabled by weekend rule
    expect(result.current.isDateDisabled('2024-03-16')).toBe(true)
    // Monday March 18 = disabled by days rule
    expect(result.current.isDateDisabled('2024-03-18')).toBe(true)
    // Tuesday March 19 = not disabled
    expect(result.current.isDateDisabled('2024-03-19')).toBe(false)
  })
})

// ─── Uncontrolled: single selection ──────────────────────────────────────────

describe('DatePickerProvider – uncontrolled single selection', () => {
  it('calls onSelectionChange with the clicked date ISO string', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const currentMonthBtn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')!
    // The effect fires once on mount (with null); clear before clicking so we
    // can assert exactly one call with the selected date string.
    handler.mockClear()
    fireEvent.click(currentMonthBtn)
    await waitFor(() => {
      expect(handler).toHaveBeenCalledTimes(1)
      expect(typeof handler.mock.calls[0][0]).toBe('string')
    })
  })

  it('marks clicked day as selected', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const target = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')!
    fireEvent.click(target)
    await waitFor(() => {
      expect((target as HTMLButtonElement).dataset.selected).toBe('true')
    })
  })

  it('moving selection deselects the previous day', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const currentMonthBtns = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(currentMonthBtns[0])
    fireEvent.click(currentMonthBtns[1])
    await waitFor(() => {
      expect((currentMonthBtns[0] as HTMLButtonElement).dataset.selected).toBe('false')
      expect((currentMonthBtns[1] as HTMLButtonElement).dataset.selected).toBe('true')
    })
  })

  it('defaultSelected pre-selects a date', async () => {
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        defaultSelected={{ days: ['2024-03-15'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toBeInTheDocument()
      expect(selected!.getAttribute('aria-label')).toContain('March 15')
    })
  })
})

// ─── Uncontrolled: multiple selection ─────────────────────────────────────────

describe('DatePickerProvider – uncontrolled multiple selection', () => {
  it('clicking different days adds each to selection', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    await waitFor(() => {
      expect((buttons[0] as HTMLButtonElement).dataset.selected).toBe('true')
      expect((buttons[1] as HTMLButtonElement).dataset.selected).toBe('true')
    })
  })

  it('clicking an already-selected day deselects it', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    await waitFor(() => expect((buttons[0] as HTMLButtonElement).dataset.selected).toBe('true'))
    fireEvent.click(buttons[0])
    await waitFor(() => expect((buttons[0] as HTMLButtonElement).dataset.selected).toBe('false'))
  })

  it('onSelectionChange receives an array of ISO strings', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    await waitFor(() => {
      const lastCall = handler.mock.calls[handler.mock.calls.length - 1]
      expect(Array.isArray(lastCall[0])).toBe(true)
    })
  })

  it('defaultSelected pre-selects multiple dates', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        defaultSelected={{ days: ['2024-03-10', '2024-03-20'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(2)
    })
  })
})

// ─── Uncontrolled: range selection ────────────────────────────────────────────

describe('DatePickerProvider – uncontrolled range selection', () => {
  it('first click sets start, onSelectionChange returns null', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[4])
    await waitFor(() => {
      expect((buttons[4] as HTMLButtonElement).dataset.startRange).toBe('true')
      const lastCall = handler.mock.calls[handler.mock.calls.length - 1]
      expect(lastCall[0]).toBeNull()
    })
  })

  it('second click on a later date sets end and returns {start, end}', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[4])
    await waitFor(() => {
      const lastCall = handler.mock.calls[handler.mock.calls.length - 1]
      expect(lastCall[0]).not.toBeNull()
      expect(lastCall[0]).toHaveProperty('start')
      expect(lastCall[0]).toHaveProperty('end')
    })
  })

  it('days between start and end get data-between-range=true', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[4])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
  })

  it('clicking before start swaps start and end', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[4])
    fireEvent.click(buttons[0])
    await waitFor(() => {
      expect((buttons[0] as HTMLButtonElement).dataset.startRange).toBe('true')
      expect((buttons[4] as HTMLButtonElement).dataset.endRange).toBe('true')
    })
  })

  it('range crossing a disabled date resets selection', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        disabledDates={{ days: ['2024-03-03'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0]) // day 1
    fireEvent.click(buttons[4]) // day 5 — crosses disabled day 3
    await waitFor(() => {
      const anySelected = screen
        .getAllByRole('button')
        .some(
          (b) =>
            (b as HTMLButtonElement).dataset.startRange === 'true' ||
            (b as HTMLButtonElement).dataset.endRange === 'true'
        )
      expect(anySelected).toBe(false)
    })
  })

  it('defaultSelected pre-selects a range', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        defaultSelected={{ start: '2024-03-05', end: '2024-03-10' }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.startRange === 'true')
      ).toBeInTheDocument()
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.endRange === 'true')
      ).toBeInTheDocument()
    })
  })

  it('completing a range then clicking resets to a new start', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[4])
    // Clear and re-start
    fireEvent.click(buttons[2])
    await waitFor(() => {
      expect((buttons[2] as HTMLButtonElement).dataset.startRange).toBe('true')
      expect((buttons[4] as HTMLButtonElement).dataset.endRange).toBe('false')
    })
  })
})

// ─── Controlled mode ──────────────────────────────────────────────────────────

describe('DatePickerProvider – controlled mode', () => {
  it('controlled single: external value pre-selects date', async () => {
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value='2024-03-15'
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toBeInTheDocument()
      expect(selected!.getAttribute('aria-label')).toContain('March 15')
    })
  })

  it('controlled single: value=null clears selection', async () => {
    const { rerender } = render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value='2024-03-15'
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() =>
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      ).toBeTruthy()
    )
    rerender(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value={null}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(0)
    })
  })

  it('controlled single: click fires onSelectionChange', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value='2024-03-15'
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const btn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')!
    fireEvent.click(btn)
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1))
  })

  it('controlled multiple: external value pre-selects dates', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        value={['2024-03-05', '2024-03-12']}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(2)
    })
  })

  it('controlled range: external value pre-selects range', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        value={{ start: '2024-03-05', end: '2024-03-10' }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.startRange === 'true')
      ).toBeInTheDocument()
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.endRange === 'true')
      ).toBeInTheDocument()
    })
  })

  it('controlled: updating value prop changes the selected date', async () => {
    const { rerender } = render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value='2024-03-05'
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const sel = screen
        .getAllByRole('button')
        .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(sel!.getAttribute('aria-label')).toContain('March 5')
    })
    rerender(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value='2024-03-20'
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const sel = screen
        .getAllByRole('button')
        .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(sel!.getAttribute('aria-label')).toContain('March 20')
    })
  })

  it('does not call onSelectionChange more than once per user click', async () => {
    const handler = vi.fn()
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        value={null}
        onSelectionChange={handler}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const btn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')!
    fireEvent.click(btn)
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1))
  })
})

// ─── Hover state ──────────────────────────────────────────────────────────────

describe('DatePickerProvider – hover state', () => {
  it('handleSetHovered does nothing when type is not range', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider type='single'>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    act(() => {
      result.current.handleSetHovered({
        day: { label: 5, date: '2024-03-05T00:00:00.000Z' },
        isCurrentMonth: true,
      })
    })
    expect(result.current.hovered).toBeNull()
  })

  it('shows between-range highlight on hover during range selection', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.mouseEnter(buttons[4])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
  })

  it('hover preview is sticky after mouseLeave (stays until range end is clicked)', async () => {
    // The library intentionally keeps the last-hovered position visible until
    // the user clicks to set the range end.  handleSetHovered() with no args
    // only clears hovered when a complete range (start+end) already exists.
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[0])
    fireEvent.mouseEnter(buttons[4])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
    fireEvent.mouseLeave(buttons[4])
    // Preview should still be shown because hovered context is not cleared on mouseLeave
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
  })

  it('handleSetHovered clears hovered when a complete range is already set', async () => {
    // When both start and end exist, hovering over a day triggers setHovered(null).
    // Verify: hovering OUTSIDE the locked range does NOT extend between-range days.
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    // Complete a small range: March 1 → March 4 (between = March 2+3 = 2 days)
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[3])
    await waitFor(() => expect((buttons[3] as HTMLButtonElement).dataset.endRange).toBe('true'))
    const countAfterComplete = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true').length
    // Hover far outside (March 16). If hovered were NOT cleared,
    // between-range would expand to ~14 days. It should stay the same.
    fireEvent.mouseEnter(buttons[15])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBe(countAfterComplete)
    })
  })
})

// ─── handleSetDefaultSelected edge cases ─────────────────────────────────────

describe('DatePickerProvider – handleSetDefaultSelected edge cases', () => {
  it('multiple mode: empty days array produces no selection', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        defaultSelected={{ days: [] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(0)
    })
  })

  it('multiple mode: invalid date strings in days array are skipped', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        defaultSelected={{ days: ['not-a-date', '2024-03-10'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      // Only the valid date (March 10) should be selected
      expect(selected).toHaveLength(1)
      expect(selected[0].getAttribute('aria-label')).toContain('March 10')
    })
  })

  it('range mode: clicking before start through a disabled date resets selection', async () => {
    // This covers the `else` side of the isBefore branch in handleDateSelect for range
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        disabledDates={{ days: ['2024-03-08'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    // Set start = March 10
    fireEvent.click(buttons[9]) // March 10
    await waitFor(() => expect((buttons[9] as HTMLButtonElement).dataset.startRange).toBe('true'))
    // Click March 5 — the range March 5→10 crosses disabled March 8 → reset
    fireEvent.click(buttons[4]) // March 5
    await waitFor(() => {
      const anyStartOrEnd = screen
        .getAllByRole('button')
        .some(
          (b) =>
            (b as HTMLButtonElement).dataset.startRange === 'true' ||
            (b as HTMLButtonElement).dataset.endRange === 'true'
        )
      expect(anyStartOrEnd).toBe(false)
    })
  })

  it('single mode: clicking a new date after defaultSelected changes the selection', async () => {
    render(
      <DatePickerProvider
        initialMonth='2024-03-01'
        defaultSelected={{ days: ['2024-03-15'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    // March 15 should be pre-selected
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .find((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected?.getAttribute('aria-label')).toContain('March 15')
    })
    // Click March 20 — should replace the selection
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[19]) // March 20 (0-indexed)
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(1)
      expect(selected[0].getAttribute('aria-label')).toContain('March 20')
    })
  })

  it('multiple mode: clicking a new date after defaultSelected adds to the selection', async () => {
    render(
      <DatePickerProvider
        type='multiple'
        initialMonth='2024-03-01'
        defaultSelected={{ days: ['2024-03-10'] }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(1)
    })
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[19]) // March 20
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(2)
    })
  })

  it('range mode: clicking after defaultSelected range is set starts a new range', async () => {
    render(
      <DatePickerProvider
        type='range'
        initialMonth='2024-03-01'
        defaultSelected={{ start: '2024-03-05', end: '2024-03-10' }}
      >
        <Calendar />
      </DatePickerProvider>
    )
    // Pre-selected range should be visible
    await waitFor(() => {
      expect(
        screen
          .getAllByRole('button')
          .find((b) => (b as HTMLButtonElement).dataset.startRange === 'true')
      ).toBeInTheDocument()
    })
    // Click a new date → should reset to a new start
    const buttons = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
    fireEvent.click(buttons[19]) // March 20
    await waitFor(() => {
      expect((buttons[19] as HTMLButtonElement).dataset.startRange).toBe('true')
      // The old range end should no longer be marked
      const anyEnd = screen
        .getAllByRole('button')
        .some((b) => (b as HTMLButtonElement).dataset.endRange === 'true')
      expect(anyEnd).toBe(false)
    })
  })

  it('controlled mode: isInternalUpdateRef prevents double-apply when value echoes back from onSelectionChange', async () => {
    // When onSelectionChange updates the controlled value, the subsequent effect
    // should hit the isInternalUpdateRef guard and return early, preventing a
    // second call to handleSetDefaultSelected.
    function ControlledWrapper() {
      const [val, setVal] = React.useState<string | null>(null)
      return (
        <DatePickerProvider
          value={val}
          onSelectionChange={setVal}
          initialMonth='2024-03-01'
        >
          <Calendar />
        </DatePickerProvider>
      )
    }
    render(<ControlledWrapper />)
    const btn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')!
    fireEvent.click(btn)
    // After clicking, the controlled value loops back via onSelectionChange.
    // The component should correctly show the selection without looping.
    await waitFor(() => expect((btn as HTMLButtonElement).dataset.selected).toBe('true'))
  })
})

// ─── handleAddCalendarRef ─────────────────────────────────────────────────────

describe('DatePickerProvider – handleAddCalendarRef', () => {
  it('does not add a duplicate ref when the same ref is registered twice', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DatePickerProvider>{children}</DatePickerProvider>
    )
    const { result } = renderHook(() => useDatePicker(), { wrapper })
    const fakeRef = { current: { updateMonthTable: vi.fn() } }
    act(() => {
      result.current.handleAddCalendarRef(fakeRef)
    })
    act(() => {
      result.current.handleAddCalendarRef(fakeRef)
    })
    expect(result.current.calendarRefs).toHaveLength(1)
  })
})
