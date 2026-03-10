import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Header } from './Header'
import { DatePickerProvider } from '../DatePickerProvider'
import { Calendar } from '../Calendar'
import { Button } from './Button'
import { Label } from './Label'

afterEach(cleanup)

describe('Header – rendering', () => {
  it('renders children', () => {
    render(
      <DatePickerProvider>
        <Header>Test Header</Header>
      </DatePickerProvider>
    )
    expect(screen.getByText('Test Header')).toBeInTheDocument()
  })

  it('renders the rmdp-header portal target div', () => {
    render(
      <DatePickerProvider>
        <Header />
      </DatePickerProvider>
    )
    expect(document.getElementById('rmdp-header')).toBeInTheDocument()
  })

  it('applies custom className to the header wrapper', () => {
    render(
      <DatePickerProvider>
        <Header className='custom-header' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.custom-header')).toBeInTheDocument()
  })

  it('applies calendarGridClassName to the calendar grid div', () => {
    render(
      <DatePickerProvider>
        <Header calendarGridClassName='custom-grid' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.custom-grid')).toBeInTheDocument()
  })

  it('applies childrenClassName to the children wrapper', () => {
    render(
      <DatePickerProvider>
        <Header childrenClassName='custom-children'>
          <span>child</span>
        </Header>
      </DatePickerProvider>
    )
    expect(document.querySelector('.custom-children')).toBeInTheDocument()
  })

  it('does not render children wrapper div when no children', () => {
    render(
      <DatePickerProvider>
        <Header childrenClassName='children-div' />
      </DatePickerProvider>
    )
    expect(document.querySelector('.children-div')).not.toBeInTheDocument()
  })
})

describe('Header – navigation updates Calendar', () => {
  it('clicking Next button advances the calendar month label', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='next'>Next</Button>
          <Label type='long' />
        </Header>
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('April')
    })
  })

  it('clicking Previous button moves the calendar to the previous month', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <Button type='previous'>Prev</Button>
          <Label type='long' />
        </Header>
        <Calendar />
      </DatePickerProvider>
    )
    await waitFor(() => expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('February')
    })
  })
})

describe('Header – groupingMode', () => {
  it('forwards groupingMode="disabled" to context (Calendar renders inline)', async () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header groupingMode='disabled'>
          <Label />
        </Header>
        <Calendar id='inline-cal' />
      </DatePickerProvider>
    )
    await waitFor(() => {
      // Calendar is rendered inline (not in portal) so it stays in normal DOM flow
      expect(document.getElementById('inline-cal')).toBeInTheDocument()
    })
  })
})

describe('Header – default fallback classNames', () => {
  it('uses styles.header when no className is provided', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header />
      </DatePickerProvider>
    )
    // #rmdp-header is inside the header wrapper div; the wrapper should have some class
    const grid = document.getElementById('rmdp-header')
    expect(grid).toBeTruthy()
    const wrapper = grid?.parentElement
    // className evaluates the className || styles.header fallback
    expect(wrapper?.className).toBeTruthy()
  })

  it('uses styles.children when children are rendered without childrenClassName', () => {
    render(
      <DatePickerProvider initialMonth='2024-03-01'>
        <Header>
          <span data-testid='child'>slot</span>
        </Header>
      </DatePickerProvider>
    )
    const child = screen.getByTestId('child')
    // childrenClassName || styles.children: the children wrapper div should have some class
    expect(child.parentElement?.className).toBeTruthy()
  })
})
