import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { Calendar } from '.'
import { DatePickerProvider } from '../DatePickerProvider'

describe('Calendar', () => {
  afterEach(cleanup)

  it('should render calendar component', () => {
    render(
      <DatePickerProvider>
        <Calendar />
      </DatePickerProvider>
    )
  })
})
