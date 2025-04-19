import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '.'

const meta = {
  title: 'Components/Datepicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Div',
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
