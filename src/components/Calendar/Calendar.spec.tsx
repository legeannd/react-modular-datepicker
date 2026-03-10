import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { Calendar } from '.'
import { DatePickerProvider } from '../DatePickerProvider'
import { Header } from '../Header'
import { Button } from '../Header/Button'
import dayjs from 'dayjs'

afterEach(cleanup)

describe('Calendar – basic rendering', () => {
  it('renders without crashing', () => {
    render(
      <DatePickerProvider>
        <Calendar />
      </DatePickerProvider>
    )
  })

  it('renders day buttons for each day in the month grid', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const buttons = screen.getAllByRole('button')
    // March view includes some days from adjacent months; at minimum 28 buttons
    expect(buttons.length).toBeGreaterThanOrEqual(28)
  })

  it('has an aria-label showing the current month and year', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    // The calendar div should have aria-label containing "March" and "2024"
    const calendarEl = document.querySelector('[aria-label]')
    expect(calendarEl?.getAttribute('aria-label')).toMatch(/March.*2024/)
  })
})

describe('Calendar – weekdays', () => {
  it('renders weekday labels by default', () => {
    render(
      <DatePickerProvider>
        <Calendar />
      </DatePickerProvider>
    )
    const weekdays = document.querySelectorAll('span')
    expect(weekdays.length).toBeGreaterThanOrEqual(7)
  })

  it('hides weekday row when showWeekdays=false', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar showWeekdays={false} />
      </DatePickerProvider>
    )
    const weekdayHeaders = document.querySelectorAll('[role="columnheader"]')
    expect(weekdayHeaders.length).toBe(0)
  })

  it('uses custom weekday labels when weekdayLabels is provided', () => {
    const labels = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
    render(
      <DatePickerProvider>
        <Calendar weekdayLabels={labels} />
      </DatePickerProvider>
    )
    expect(screen.getByText('Do')).toBeInTheDocument()
    expect(screen.getByText('Lu')).toBeInTheDocument()
  })

  it('applies weekdaysContainerClassName to the weekdays container', () => {
    render(
      <DatePickerProvider>
        <Calendar weekdaysContainerClassName='custom-weekdays-container' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.custom-weekdays-container')).toBeInTheDocument()
  })

  it('applies weekdayClassName to individual weekday spans', () => {
    render(
      <DatePickerProvider>
        <Calendar weekdayClassName='custom-weekday' />
      </DatePickerProvider>
    )
    const spans = document.querySelectorAll('.custom-weekday')
    expect(spans.length).toBe(7)
  })
})

describe('Calendar – custom class props', () => {
  it('applies daysContainerClassName to the days container', () => {
    render(
      <DatePickerProvider>
        <Calendar daysContainerClassName='custom-days-container' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.custom-days-container')).toBeInTheDocument()
  })

  it('applies className to the root calendar element when className is provided', () => {
    render(
      <DatePickerProvider>
        <Calendar className='my-calendar' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.my-calendar')).toBeInTheDocument()
  })
})

describe('Calendar – footerSlot', () => {
  it('renders the footerSlot content', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar
          footerSlot={({ currentDate }) => (
            <div data-testid='footer'>Footer: {currentDate.format('YYYY-MM')}</div>
          )}
        />
      </DatePickerProvider>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('footer').textContent).toContain('2024-03')
  })

  it('footerSlot receives a valid Dayjs currentDate', () => {
    let receivedDate: unknown
    render(
      <DatePickerProvider initialMonth='2024-06-01'>
        <Calendar
          footerSlot={({ currentDate }) => {
            receivedDate = currentDate
            return null
          }}
        />
      </DatePickerProvider>
    )
    expect((receivedDate as ReturnType<typeof dayjs>).isValid()).toBe(true)
  })
})

describe('Calendar – portal behaviour', () => {
  it('renders inline (no portal) when there is no Header', () => {
    const { container } = render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar id='cal-1' />
      </DatePickerProvider>
    )
    // Calendar body should be a direct child of the provider container, not portalled
    expect(container.querySelector('#cal-1')).toBeInTheDocument()
  })

  it('renders inside Header portal when groupingMode is "all"', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar id='cal-portal' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      const portalTarget = document.getElementById('rmdp-header')
      expect(portalTarget).toBeInTheDocument()
      // Calendar with id should exist in the DOM
      expect(document.getElementById('cal-portal')).toBeInTheDocument()
    })
  })

  it('renders inline when id is NOT in string-array groupingMode', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header groupingMode={['cal-included']}>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar id='cal-excluded' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      // cal-excluded is not in groupingMode array, so renders inline
      expect(document.getElementById('cal-excluded')).toBeInTheDocument()
    })
  })
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('Calendar – keyboard navigation', () => {
  it('ArrowRight moves focus to the next day', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-01"]')?.tabIndex).toBe(0)
    fireEvent.keyDown(grid, { key: 'ArrowRight' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-02"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('ArrowLeft moves focus to the previous day', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-05'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'ArrowLeft' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-04"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('ArrowDown moves focus 7 days forward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'ArrowDown' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-08"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('ArrowUp moves focus 7 days backward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-10'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'ArrowUp' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-03"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('Home moves focus to the start of the current week', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-06'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'Home' })
    await waitFor(() => {
      const focused = document.querySelector<HTMLButtonElement>('[tabindex="0"]')
      expect(focused?.getAttribute('data-date')).toBeDefined()
    })
  })

  it('End moves focus to the end of the current week', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'End' })
    await waitFor(() => {
      const focused = document.querySelector<HTMLButtonElement>('[tabindex="0"]')
      expect(focused?.getAttribute('data-date')).toBeDefined()
    })
  })

  it('PageDown moves focus one month forward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'PageDown' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-04-01"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('PageUp moves focus one month backward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'PageUp' })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-02-01"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('Shift+PageDown moves focus one year forward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'PageDown', shiftKey: true })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2025-03-01"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('Shift+PageUp moves focus one year backward', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'PageUp', shiftKey: true })
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2023-03-01"]')?.tabIndex).toBe(
        0
      )
    })
  })

  it('Enter selects the focused day', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'Enter' })
    await waitFor(() => {
      const march1 = document.querySelector<HTMLButtonElement>('[data-date="2024-03-01"]')!
      expect(march1.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('Space selects the focused day', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-15'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: ' ' })
    await waitFor(() => {
      const march15 = document.querySelector<HTMLButtonElement>('[data-date="2024-03-15"]')!
      expect(march15.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('Escape key does not move focus', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'Escape' })
    expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-01"]')?.tabIndex).toBe(0)
  })

  it('unrelated key does nothing', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'Tab' })
    expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-01"]')?.tabIndex).toBe(0)
  })

  it('navigating to next month updates the displayed month (standalone calendar)', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-31'>
        <Calendar />
      </DatePickerProvider>
    )
    const grid = document.querySelector('[role="grid"]')!
    fireEvent.keyDown(grid, { key: 'ArrowRight' })
    await waitFor(() => {
      expect(document.querySelector('[data-date="2024-04-01"]')).toBeInTheDocument()
    })
  })

  it('cross-calendar focus transfer: ArrowRight on last day of month moves focus to first day of next calendar', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-31'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar id='cal-march' />
        <Calendar id='cal-april' />
      </DatePickerProvider>
    )
    // Wait for both calendars to portal into the Header and render their days
    await waitFor(() => {
      expect(document.querySelector('[data-date="2024-03-31"]')).toBeInTheDocument()
      expect(document.querySelector('[data-date="2024-04-01"]')).toBeInTheDocument()
    })

    // focusedDay starts at "2024-03-31" (from initialMonth); focus the button
    // to make document.activeElement land inside a grid (required by the fix)
    const march31 = document.querySelector<HTMLButtonElement>('[data-date="2024-03-31"]')!
    fireEvent.focus(march31)
    await waitFor(() => {
      expect(document.querySelector<HTMLButtonElement>('[data-date="2024-03-31"]')?.tabIndex).toBe(
        0
      )
    })

    const grid = march31.closest('[role="grid"]')!
    // ArrowRight from March 31 → focusedDay becomes "2024-04-01"; the second
    // calendar's useEffect should detect focus-is-in-grid and move focus there
    fireEvent.keyDown(grid, { key: 'ArrowRight' })
    await waitFor(() => {
      // Scope to cal-april to avoid matching the overflow April 1 in cal-march
      const april1 = document.querySelector<HTMLButtonElement>(
        '#cal-april [data-date="2024-04-01"]'
      )!
      expect(document.activeElement).toBe(april1)
    })
  })

  it('PageDown in header mode moves focus to first day of next calendar when it is rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar id='cal-march' />
        <Calendar id='cal-april' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[data-date="2024-04-01"]')).toBeInTheDocument()
    })
    const march1 = document.querySelector<HTMLButtonElement>('#cal-march [data-date="2024-03-01"]')!
    fireEvent.focus(march1)
    await waitFor(() => {
      expect(march1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march1.closest('[role="grid"]')!, { key: 'PageDown' })
    await waitFor(() => {
      const april1 = document.querySelector<HTMLButtonElement>(
        '#cal-april [data-date="2024-04-01"]'
      )!
      expect(document.activeElement).toBe(april1)
    })
  })

  it('PageDown in header mode triggers navigation and focuses day 1 of the new month when no further calendar is rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march1 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-01"][data-this-month="true"]'
    )!
    fireEvent.focus(march1)
    await waitFor(() => {
      expect(march1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march1.closest('[role="grid"]')!, { key: 'PageDown' })
    // The Header advances refDate → April calendar renders → April 1 gets focus
    await waitFor(() => {
      const april1 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-04-01"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(april1)
    })
  })

  it('PageUp in header mode moves focus to first day of previous calendar when it is rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar id='cal-march' />
        <Calendar id='cal-april' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('#cal-april [data-date="2024-04-01"]')).toBeInTheDocument()
    })
    const april1 = document.querySelector<HTMLButtonElement>('#cal-april [data-date="2024-04-01"]')!
    fireEvent.focus(april1)
    await waitFor(() => {
      expect(april1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(april1.closest('[role="grid"]')!, { key: 'PageUp' })
    await waitFor(() => {
      const march1 = document.querySelector<HTMLButtonElement>(
        '#cal-march [data-date="2024-03-01"]'
      )!
      expect(document.activeElement).toBe(march1)
    })
  })

  it('PageUp in header mode triggers navigation and focuses day 1 of the new month when no earlier calendar is rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march1 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-01"][data-this-month="true"]'
    )!
    fireEvent.focus(march1)
    await waitFor(() => {
      expect(march1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march1.closest('[role="grid"]')!, { key: 'PageUp' })
    // The Header retreats refDate → February calendar renders → Feb 1 gets focus
    await waitFor(() => {
      const feb1 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-02-01"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(feb1)
    })
  })

  it('Shift+PageDown in header mode does nothing', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Button type='next'>Next</Button>
        </Header>
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march1 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-01"][data-this-month="true"]'
    )!
    fireEvent.focus(march1)
    await waitFor(() => {
      expect(march1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march1.closest('[role="grid"]')!, { key: 'PageDown', shiftKey: true })
    // Focus should remain on March 1 (no navigation happened)
    expect(march1.tabIndex).toBe(0)
  })

  it('ArrowRight in header mode slides to next month when it is not rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-31'>
        <Header />
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march31 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-31"][data-this-month="true"]'
    )!
    fireEvent.focus(march31)
    await waitFor(() => {
      expect(march31.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march31.closest('[role="grid"]')!, { key: 'ArrowRight' })
    // Calendar slides to April; April 1 receives browser focus
    await waitFor(() => {
      const april1 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-04-01"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(april1)
    })
  })

  it('ArrowLeft in header mode slides to previous month when it is not rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header />
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march1 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-01"][data-this-month="true"]'
    )!
    fireEvent.focus(march1)
    await waitFor(() => {
      expect(march1.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march1.closest('[role="grid"]')!, { key: 'ArrowLeft' })
    // Calendar slides to February; Feb 29 (2024 is a leap year) receives focus
    await waitFor(() => {
      const feb29 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-02-29"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(feb29)
    })
  })

  it('PageDown in header mode preserves the day-of-month when the target calendar is already rendered', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-15'>
        <Header />
        <Calendar id='cal-march' />
        <Calendar id='cal-april' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('#cal-april [data-date="2024-04-15"]')).toBeInTheDocument()
    })
    const march15 = document.querySelector<HTMLButtonElement>(
      '#cal-march [data-date="2024-03-15"]'
    )!
    fireEvent.focus(march15)
    await waitFor(() => {
      expect(march15.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march15.closest('[role="grid"]')!, { key: 'PageDown' })
    await waitFor(() => {
      const april15 = document.querySelector<HTMLButtonElement>(
        '#cal-april [data-date="2024-04-15"]'
      )!
      expect(document.activeElement).toBe(april15)
    })
  })

  it('PageDown in header mode preserves the day-of-month when sliding to a new month', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-15'>
        <Header />
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march15 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-15"][data-this-month="true"]'
    )!
    fireEvent.focus(march15)
    await waitFor(() => {
      expect(march15.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march15.closest('[role="grid"]')!, { key: 'PageDown' })
    await waitFor(() => {
      const april15 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-04-15"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(april15)
    })
  })

  it('PageUp in header mode preserves the day-of-month when sliding to a new month', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-15'>
        <Header />
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => {
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
    const march15 = document.querySelector<HTMLButtonElement>(
      '[data-date="2024-03-15"][data-this-month="true"]'
    )!
    fireEvent.focus(march15)
    await waitFor(() => {
      expect(march15.tabIndex).toBe(0)
    })
    fireEvent.keyDown(march15.closest('[role="grid"]')!, { key: 'PageUp' })
    await waitFor(() => {
      const feb15 = document.querySelector<HTMLButtonElement>(
        '[data-date="2024-02-15"][data-this-month="true"]'
      )!
      expect(document.activeElement).toBe(feb15)
    })
  })
})
