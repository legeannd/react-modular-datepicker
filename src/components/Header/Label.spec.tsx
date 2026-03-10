import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import React from 'react'
import { Label } from './Label'
import { Header } from './Header'
import { Button } from './Button'
import { Calendar } from '../Calendar'
import { DatePickerProvider } from '../DatePickerProvider'

afterEach(cleanup)

function renderLabel(
  labelProps: React.ComponentProps<typeof Label> = {},
  initialMonth = '2024-03-01',
  calendarCount = 1
) {
  const calendars = Array.from({ length: calendarCount }, (_, i) => (
    <Calendar
      key={i}
      id={`cal-${i}`}
    />
  ))
  return render(
    <DatePickerProvider initialMonth={initialMonth}>
      <Header>
        <Button
          type='previous'
          data-testid='prev'
        >
          Prev
        </Button>
        <Label
          data-testid='label'
          {...labelProps}
        />
        <Button
          type='next'
          data-testid='next'
        >
          Next
        </Button>
      </Header>
      {calendars}
    </DatePickerProvider>
  )
}

describe('Label – default rendering', () => {
  it('renders inside the DOM', () => {
    renderLabel()
    expect(screen.getByTestId('label')).toBeInTheDocument()
  })

  it('shows the current month and year', () => {
    renderLabel({}, '2024-03-01')
    expect(screen.getByTestId('label').textContent).toContain('Mar')
    expect(screen.getByTestId('label').textContent).toContain('2024')
  })

  it('has aria-live="polite"', () => {
    renderLabel()
    expect(screen.getByTestId('label')).toHaveAttribute('aria-live', 'polite')
  })

  it('has an aria-label attribute', () => {
    renderLabel({}, '2024-03-01')
    const label = screen.getByTestId('label')
    expect(label.getAttribute('aria-label')).toBeTruthy()
    // Default type="short": aria-label uses abbreviated name ("Mar of 2024")
    expect(label.getAttribute('aria-label')).toContain('Mar')
    expect(label.getAttribute('aria-label')).toContain('2024')
  })
})

describe('Label – type prop', () => {
  it('type="short" shows abbreviated month name', () => {
    renderLabel({ type: 'short' }, '2024-01-01')
    // English short months: Jan, Feb...
    expect(screen.getByTestId('label').textContent).toMatch(/Jan/)
  })

  it('type="long" shows full month name', () => {
    renderLabel({ type: 'long' }, '2024-01-01')
    expect(screen.getByTestId('label').textContent).toMatch(/January/)
  })
})

describe('Label – navigation reactivity', () => {
  it('updates when user clicks Next', async () => {
    renderLabel({ type: 'long' }, '2024-03-01')
    fireEvent.click(screen.getByTestId('next'))
    await waitFor(() => {
      expect(screen.getByTestId('label').textContent).toContain('April')
    })
  })

  it('updates when user clicks Previous', async () => {
    renderLabel({ type: 'long' }, '2024-03-01')
    fireEvent.click(screen.getByTestId('prev'))
    await waitFor(() => {
      expect(screen.getByTestId('label').textContent).toContain('February')
    })
  })

  it('shows different years for start and end when range spans a year boundary', async () => {
    // Two calendars starting at December 2024 → range is Dec 2024 – Jan 2025
    renderLabel({ type: 'long' }, '2024-12-01', 2)
    await waitFor(() => {
      const text = screen.getByTestId('label').textContent ?? ''
      expect(text).toContain('December')
      expect(text).toContain('2024')
      expect(text).toContain('January')
      expect(text).toContain('2025')
    })
  })
})

describe('Label – children render prop', () => {
  it('calls children with { start, end } data', () => {
    let received: unknown
    renderLabel({
      children: (data: {
        start: { month: string; year: number }
        end: { month: string; year: number }
      }) => {
        received = data
        return <span>custom</span>
      },
    })
    expect(received).toHaveProperty('start')
    expect(received).toHaveProperty('end')
    expect((received as { start: { month: string; year: number } }).start).toHaveProperty('month')
    expect((received as { start: { month: string; year: number } }).start).toHaveProperty('year')
  })

  it('renders the value returned by the children function', () => {
    renderLabel({
      children: ({
        start,
      }: {
        start: { month: string; year: number }
        end: { month: string; year: number }
      }) => <span data-testid='custom-label'>Year: {start.year}</span>,
    })
    expect(screen.getByTestId('custom-label')).toBeInTheDocument()
    expect(screen.getByTestId('custom-label').textContent).toContain('Year:')
  })
})

describe('Label – custom className', () => {
  it('applies custom className', () => {
    renderLabel({ className: 'custom-label-class' })
    expect(document.querySelector('.custom-label-class')).toBeInTheDocument()
  })
})

describe('Label – custom aria-label override', () => {
  it('uses provided aria-label instead of computed one', () => {
    renderLabel({ 'aria-label': 'My custom label' })
    expect(screen.getByTestId('label').getAttribute('aria-label')).toBe('My custom label')
  })
})
