import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { Calendar } from '.'

describe('Calendar', () => {
  afterEach(cleanup)

  it('should render calendar component', () => {
    render(<Calendar />)

    screen.getByText('index')
  })
})
