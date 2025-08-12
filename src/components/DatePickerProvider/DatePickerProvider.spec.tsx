import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { DatePickerProvider } from '.'
import { Calendar } from '../Calendar'

describe('DatepickerProvider', () => {
  afterEach(cleanup)

  it('should render calendar component', () => {
    render(
      <DatePickerProvider>
        <Calendar />
      </DatePickerProvider>
    )
  })
})
