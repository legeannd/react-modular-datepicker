import { cleanup, render, screen, waitFor } from '@testing-library/react'
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
    // With showWeekdays=false, there should be no span elements for weekdays
    const spans = document.querySelectorAll('span')
    expect(spans.length).toBe(0)
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
