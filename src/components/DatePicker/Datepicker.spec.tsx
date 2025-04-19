import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { DatePicker } from '.'

describe('Datepicker', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<DatePicker />)

    screen.getByText('index')
  })
})
