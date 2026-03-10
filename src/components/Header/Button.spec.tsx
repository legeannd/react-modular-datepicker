import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import React from 'react'
import { Button } from './Button'
import { Header } from './Header'
import { Label } from './Label'
import { Calendar } from '../Calendar'
import { DatePickerProvider } from '../DatePickerProvider'

afterEach(cleanup)

function renderWithProvider(initialMonth = '2024-03-01', extra?: React.ReactNode) {
  return render(
    <DatePickerProvider initialMonth={initialMonth}>
      <Header>
        <Button
          type='previous'
          data-testid='prev'
        >
          Prev
        </Button>
        {/* type="long" so assertions can match full month names */}
        <Label
          type='long'
          data-testid='label'
        />
        <Button
          type='next'
          data-testid='next'
        >
          Next
        </Button>
      </Header>
      <Calendar />
      {extra}
    </DatePickerProvider>
  )
}

describe('Button – rendering', () => {
  it('renders children', () => {
    renderWithProvider()
    expect(screen.getByTestId('prev')).toBeInTheDocument()
    expect(screen.getByTestId('prev').textContent).toBe('Prev')
    expect(screen.getByTestId('next').textContent).toBe('Next')
  })

  it('applies custom className when provided', () => {
    render(
      <DatePickerProvider>
        <Header>
          <Button
            type='next'
            className='custom-btn'
          >
            Go
          </Button>
        </Header>
      </DatePickerProvider>
    )
    expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('custom-btn')
  })
})

describe('Button – navigation', () => {
  it('clicking Next advances the label to the next month', async () => {
    renderWithProvider('2024-03-01')
    fireEvent.click(screen.getByTestId('next'))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('April')
    })
  })

  it('clicking Previous moves the label to the previous month', async () => {
    renderWithProvider('2024-03-01')
    fireEvent.click(screen.getByTestId('prev'))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('February')
    })
  })

  it('multiple Next clicks compound (e.g. +3 months)', async () => {
    renderWithProvider('2024-01-01')
    fireEvent.click(screen.getByTestId('next'))
    fireEvent.click(screen.getByTestId('next'))
    fireEvent.click(screen.getByTestId('next'))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('April')
    })
  })

  it('Next then Previous returns to the original month', async () => {
    renderWithProvider('2024-03-01')
    fireEvent.click(screen.getByTestId('next'))
    fireEvent.click(screen.getByTestId('prev'))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('March')
    })
  })

  it('navigating to December then Next moves to January of next year', async () => {
    renderWithProvider('2024-12-01')
    fireEvent.click(screen.getByTestId('next'))
    await waitFor(() => {
      const label = document.querySelector('[aria-live="polite"]')
      expect(label?.textContent).toContain('January')
      expect(label?.textContent).toContain('2025')
    })
  })
})
