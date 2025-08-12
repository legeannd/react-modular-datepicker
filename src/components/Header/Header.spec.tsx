import { cleanup, render, screen } from '@testing-library/react'
import { Header } from './Header'
import { DatePickerProvider } from '../DatePickerProvider'
import { afterEach, describe, expect, it } from 'vitest'

describe('Header', () => {
  afterEach(cleanup)

  it('should render header component', () => {
    render(
      <DatePickerProvider>
        <Header>Test Header</Header>
      </DatePickerProvider>
    )
    expect(screen.getByText('Test Header')).toBeInTheDocument()
  })
})
