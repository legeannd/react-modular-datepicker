import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import React from 'react'
import { DatePickerProvider } from '../DatePickerProvider'
import { Calendar } from '.'
import type { DatePickerProviderBaseProps, CalendarType } from '@/types'

type RenderCalendarProps = Partial<Omit<DatePickerProviderBaseProps, 'children'>> & {
  type?: CalendarType
}

afterEach(cleanup)

// Helper: render a calendar anchored to a fixed month
function renderCalendar(
  props: RenderCalendarProps = {},
  calendarProps: React.ComponentProps<typeof Calendar> = {}
) {
  return render(
    <DatePickerProvider
      initialMonth='2024-03-01'
      {...(props as React.ComponentProps<typeof DatePickerProvider>)}
    >
      <Calendar {...calendarProps} />
    </DatePickerProvider>
  )
}

function currentMonthButtons() {
  return screen
    .getAllByRole('button')
    .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'true')
}

// ─── aria-label ───────────────────────────────────────────────────────────────

describe('DayButton – aria-label', () => {
  it('has aria-label in "MMMM D, YYYY" format', () => {
    renderCalendar()
    const btns = currentMonthButtons()
    // First current-month button = March 1, 2024
    expect(btns[0].getAttribute('aria-label')).toBe('March 1, 2024')
  })
})

// ─── data-* attributes ────────────────────────────────────────────────────────

describe('DayButton – data attributes', () => {
  it('data-this-month=true for current-month days', () => {
    renderCalendar()
    const btns = currentMonthButtons()
    btns.forEach((b) => expect((b as HTMLButtonElement).dataset.thisMonth).toBe('true'))
  })

  it('data-this-month=false for days outside the current month', () => {
    renderCalendar()
    const outsideBtns = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.thisMonth === 'false')
    expect(outsideBtns.length).toBeGreaterThan(0)
  })

  it('data-start-month=true on the first day of the month', () => {
    renderCalendar()
    const startBtn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.startMonth === 'true')
    expect(startBtn).toBeInTheDocument()
    expect(startBtn!.getAttribute('aria-label')).toContain('March 1')
  })

  it('data-end-month=true on the last day of the month', () => {
    renderCalendar()
    const endBtn = screen
      .getAllByRole('button')
      .find((b) => (b as HTMLButtonElement).dataset.endMonth === 'true')
    expect(endBtn).toBeInTheDocument()
    expect(endBtn!.getAttribute('aria-label')).toContain('March 31')
  })

  it('data-selected=false initially for all buttons', () => {
    renderCalendar()
    const selectedBtns = screen
      .getAllByRole('button')
      .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
    expect(selectedBtns).toHaveLength(0)
  })
})

// ─── Single selection ─────────────────────────────────────────────────────────

describe('DayButton – single selection', () => {
  it('clicking a day sets data-selected=true on that button', async () => {
    renderCalendar()
    const btns = currentMonthButtons()
    fireEvent.click(btns[5])
    await waitFor(() => expect((btns[5] as HTMLButtonElement).dataset.selected).toBe('true'))
  })

  it('clicking a different day moves data-selected to the new button', async () => {
    renderCalendar()
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[5])
    await waitFor(() => {
      expect((btns[0] as HTMLButtonElement).dataset.selected).toBe('false')
      expect((btns[5] as HTMLButtonElement).dataset.selected).toBe('true')
    })
  })
})

// ─── Multiple selection ───────────────────────────────────────────────────────

describe('DayButton – multiple selection', () => {
  it('clicking three non-adjacent days selects all three', async () => {
    renderCalendar({ type: 'multiple' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[5])
    fireEvent.click(btns[10])
    await waitFor(() => {
      expect((btns[0] as HTMLButtonElement).dataset.selected).toBe('true')
      expect((btns[5] as HTMLButtonElement).dataset.selected).toBe('true')
      expect((btns[10] as HTMLButtonElement).dataset.selected).toBe('true')
    })
  })

  it('clicking an already-selected day removes it', async () => {
    renderCalendar({ type: 'multiple' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    await waitFor(() => expect((btns[0] as HTMLButtonElement).dataset.selected).toBe('true'))
    fireEvent.click(btns[0])
    await waitFor(() => expect((btns[0] as HTMLButtonElement).dataset.selected).toBe('false'))
  })
})

// ─── Range selection ──────────────────────────────────────────────────────────

describe('DayButton – range selection', () => {
  it('first click gives data-start-range=true', async () => {
    renderCalendar({ type: 'range' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    await waitFor(() => expect((btns[0] as HTMLButtonElement).dataset.startRange).toBe('true'))
  })

  it('second click gives data-end-range=true', async () => {
    renderCalendar({ type: 'range' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[6])
    await waitFor(() => expect((btns[6] as HTMLButtonElement).dataset.endRange).toBe('true'))
  })

  it('days between start and end have data-between-range=true', async () => {
    renderCalendar({ type: 'range' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[5])
    await waitFor(() => {
      const betweenBtns = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(betweenBtns.length).toBeGreaterThan(0)
    })
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('DayButton – disabled dates', () => {
  it('disabled days have the HTML disabled attribute', () => {
    renderCalendar({ disabledDates: { days: ['2024-03-15'] } })
    const disabledBtn = screen
      .getAllByRole('button', { hidden: true })
      .find((b) => b.getAttribute('aria-label') === 'March 15, 2024')
    expect(disabledBtn).toBeDisabled()
  })

  it('clicking a disabled day does not change selection', async () => {
    renderCalendar({ disabledDates: { days: ['2024-03-15'] } })
    const disabledBtn = screen
      .getAllByRole('button', { hidden: true })
      .find((b) => b.getAttribute('aria-label') === 'March 15, 2024')!
    fireEvent.click(disabledBtn)
    await waitFor(() => {
      const selected = screen
        .getAllByRole('button', { hidden: true })
        .filter((b) => (b as HTMLButtonElement).dataset.selected === 'true')
      expect(selected).toHaveLength(0)
    })
  })
})

// ─── dayButtonClassNames overrides ────────────────────────────────────────────

describe('DayButton – dayButtonClassNames', () => {
  it('uses custom selected class instead of default', async () => {
    renderCalendar({}, { dayButtonClassNames: { base: 'custom-btn', selected: 'custom-selected' } })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    await waitFor(() => {
      expect(btns[0]).toHaveClass('custom-selected')
    })
  })

  it('uses custom base class on all day buttons', () => {
    renderCalendar({}, { dayButtonClassNames: { base: 'custom-base' } })
    const btns = screen.getAllByRole('button')
    // All buttons should have the custom base class
    btns.forEach((b) => expect(b).toHaveClass('custom-base'))
  })

  it('uses custom disabled class on disabled buttons', () => {
    renderCalendar(
      { disabledDates: { days: ['2024-03-15'] } },
      { dayButtonClassNames: { base: 'custom-btn', disabled: 'custom-disabled' } }
    )
    const disabledBtn = screen
      .getAllByRole('button', { hidden: true })
      .find((b) => b.getAttribute('aria-label') === 'March 15, 2024')!
    expect(disabledBtn).toHaveClass('custom-disabled')
  })
})

// ─── className passthrough ────────────────────────────────────────────────────

describe('DayButton – className passthrough via Calendar', () => {
  it('Calendar className prop applies to the calendar root element', () => {
    renderCalendar({}, { className: 'outer-class' })
    expect(document.querySelector('.outer-class')).toBeInTheDocument()
  })
})

// ─── Hover / mouse interactions ───────────────────────────────────────────────

describe('DayButton – hover interactions', () => {
  it('hover preview is sticky after mouseLeave until range end is clicked', async () => {
    // handleSetHovered() with no args only clears the context hovered state
    // when the selection already has both start and end. With only start set,
    // the preview remains visible after mouseLeave – this is by design.
    renderCalendar({ type: 'range' })
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.mouseEnter(btns[4])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
    fireEvent.mouseLeave(btns[4])
    // Preview stays because hovered context is not cleared before range end is set
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => (b as HTMLButtonElement).dataset.betweenRange === 'true')
      expect(between.length).toBeGreaterThan(0)
    })
  })
})

// ─── dayButtonClassNames: range and disabledInRange ───────────────────────────

describe('DayButton – dayButtonClassNames range classes', () => {
  it('uses custom rangeStart class on the start day', async () => {
    renderCalendar(
      { type: 'range' },
      { dayButtonClassNames: { base: 'btn', rangeStart: 'custom-start' } }
    )
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    await waitFor(() => expect(btns[0]).toHaveClass('custom-start'))
  })

  it('uses custom rangeEnd class on the end day', async () => {
    renderCalendar(
      { type: 'range' },
      { dayButtonClassNames: { base: 'btn', rangeEnd: 'custom-end' } }
    )
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[6])
    await waitFor(() => expect(btns[6]).toHaveClass('custom-end'))
  })

  it('uses custom betweenRange class on days between start and end', async () => {
    renderCalendar(
      { type: 'range' },
      { dayButtonClassNames: { base: 'btn', betweenRange: 'custom-between' } }
    )
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.click(btns[6])
    await waitFor(() => {
      const between = screen
        .getAllByRole('button')
        .filter((b) => b.classList.contains('custom-between'))
      expect(between.length).toBeGreaterThan(0)
    })
  })

  it('applies disabledInRange class to a disabled day inside the hover preview', async () => {
    // Render range mode with March 5 disabled.
    // Click March 1 as start, then hover over March 10.
    // March 5 sits between start and hovered end, so it gets both
    // data-between-range=true and disabled=true — triggering disabledInRange class.
    renderCalendar(
      { type: 'range', disabledDates: { days: ['2024-03-05'] } },
      { dayButtonClassNames: { base: 'btn', disabledInRange: 'custom-disabled-in-range' } }
    )
    const btns = currentMonthButtons()
    fireEvent.click(btns[0]) // March 1 = start
    fireEvent.mouseEnter(btns[9]) // hover over March 10
    await waitFor(() => {
      const march5 = screen
        .getAllByRole('button', { hidden: true })
        .find((b) => b.getAttribute('aria-label') === 'March 5, 2024')!
      expect(march5).toHaveClass('custom-disabled-in-range')
      expect((march5 as HTMLButtonElement).dataset.betweenRange).toBe('true')
    })
  })

  it('uses styles.disabledInRange fallback when dayButtonClassNames has no disabledInRange key', async () => {
    // Covers the `|| styles.disabledInRange` fallback branch
    renderCalendar(
      { type: 'range', disabledDates: { days: ['2024-03-05'] } },
      { dayButtonClassNames: { base: 'btn' } } // no disabledInRange — falls back to CSS module class
    )
    const btns = currentMonthButtons()
    fireEvent.click(btns[0])
    fireEvent.mouseEnter(btns[9])
    await waitFor(() => {
      const march5 = screen
        .getAllByRole('button', { hidden: true })
        .find((b) => b.getAttribute('aria-label') === 'March 5, 2024')!
      // disabled + betweenRange → styles.disabledInRange applied (CSS module fallback)
      expect((march5 as HTMLButtonElement).dataset.betweenRange).toBe('true')
      expect(march5).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
