import { Meta } from '@storybook/react'
import { DatePickerProvider } from './DatePickerProvider'
import { Header, Button, DateSelect, MonthLabel } from './Header'
import { Calendar } from './Calendar'

const meta = {
  title: 'Examples/Custom Styling Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'This showcase demonstrates various styling possibilities for the date picker components. For detailed component documentation and props, see the individual component stories in the Components section.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const PurpleGradientTheme = {
  render: () => (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='rounded-2xl bg-white p-6 shadow-xl'>
          <DatePickerProvider normalizeHeight={true}>
            <Header
              className='border-2 border-purple-400 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                showIcon={false}
                className='bg-opacity-20 flex items-center justify-center gap-2 border-2 border-purple-400 bg-purple-600 text-white backdrop-blur-sm'
                popoverTriggerProps={{
                  className:
                    'bg-white bg-opacity-90 hover:bg-opacity-100 cursor-pointer rounded-lg px-4 py-2 transition-all duration-150 ease-out font-bold text-purple-800 shadow-md hover:shadow-lg',
                }}
                popoverContentProps={{
                  className: 'bg-white border-2 border-purple-400 shadow-2xl rounded-xl p-4',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-white text-purple-800 border-purple-400 rounded-lg px-3 py-2 font-bold cursor-pointer hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-150 ease-out',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-purple-400 text-purple-800 rounded-lg shadow-2xl',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-white text-purple-800 border-purple-400 rounded-lg px-3 py-2 font-bold cursor-pointer hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-150 ease-out',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-purple-400 text-purple-800 rounded-lg shadow-2xl',
                }}
              >
                <MonthLabel
                  type='full'
                  className='bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-lg font-extrabold tracking-wide text-transparent drop-shadow-sm'
                />
              </DateSelect>
              <div className='flex gap-4'>
                <Button
                  type='previous'
                  className='hover:bg-opacity-30 border-opacity-50 bg-opacity-10 cursor-pointer rounded-full border-2 border-white bg-white px-4 py-2 text-white shadow-lg transition-all duration-150 ease-out hover:bg-white hover:shadow-xl [&>svg]:stroke-[3px] [&>svg]:!text-purple-600'
                />
                <Button
                  type='next'
                  className='hover:bg-opacity-30 border-opacity-50 bg-opacity-10 cursor-pointer rounded-full border-2 border-white bg-white px-4 py-2 text-white shadow-lg transition-all duration-150 ease-out hover:bg-white hover:shadow-xl [&>svg]:stroke-[3px] [&>svg]:!text-purple-600'
                />
              </div>
            </Header>
            <div className='flex gap-0'>
              <Calendar
                showLabel={true}
                className='bg-purple-100 p-4'
                weekdayClassName='text-purple-700 font-semibold'
                footerClassName='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg border-2 border-purple-300'
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-purple-900 hover:bg-purple-200 hover:shadow-sm font-medium',
                  selected:
                    'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg outline-1 outline-purple-700',
                  today: 'outline-purple-500 outline -outline-offset-1 font-bold bg-purple-200',
                  hovered: 'bg-purple-200 shadow-md',
                  weekend: 'text-purple-700 font-semibold',
                }}
              />
              <Calendar
                showLabel={true}
                className='bg-purple-100 p-4'
                weekdayClassName='text-purple-700 font-semibold'
                footerClassName='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg border-2 border-purple-300'
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-purple-900 hover:bg-purple-200 hover:shadow-sm font-medium',
                  selected:
                    'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg outline-1 outline-purple-700',
                  today: 'outline-purple-500 outline -outline-offset-1 font-bold bg-purple-200',
                  hovered: 'bg-purple-200 shadow-md',
                  weekend: 'text-purple-700 font-semibold',
                }}
              />
            </div>
          </DatePickerProvider>
        </div>
      </div>
    </div>
  ),
}

export const DarkTheme = {
  render: () => (
    <div className='min-h-screen bg-gray-900 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='rounded-2xl bg-gray-900 p-6 shadow-xl'>
          <DatePickerProvider normalizeHeight={true}>
            <Header
              className='bg-gray-900 text-white shadow-xl'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                className='flex items-center justify-center gap-2 text-white'
                popoverTriggerProps={{
                  className:
                    'hover:bg-gray-700 cursor-pointer rounded px-3 py-2 transition-all duration-150 ease-out text-white font-medium hover:shadow-md',
                }}
                popoverContentProps={{
                  className: 'bg-gray-800 shadow-2xl rounded-lg p-3',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-gray-700 text-white rounded px-3 py-2 cursor-pointer hover:bg-gray-600 font-medium transition-all duration-150 ease-out hover:shadow-md',
                }}
                monthSelectContentProps={{
                  className: 'bg-gray-700 text-white rounded shadow-2xl',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-gray-700 text-white rounded px-3 py-2 cursor-pointer hover:bg-gray-600 font-medium transition-all duration-150 ease-out hover:shadow-md',
                }}
                yearSelectContentProps={{
                  className: 'bg-gray-700 text-white rounded shadow-2xl',
                }}
              >
                <MonthLabel
                  type='full'
                  className='font-bold text-white'
                />
              </DateSelect>
              <div className='flex gap-4'>
                <Button
                  type='previous'
                  className='cursor-pointer rounded bg-gray-700 px-3 py-1 text-gray-100 hover:bg-gray-600 transition-all duration-150 ease-out hover:shadow-md [&>svg]:stroke-2 [&>svg]:text-gray-100'
                />
                <Button
                  type='next'
                  className='cursor-pointer rounded bg-gray-700 px-3 py-1 text-gray-100 hover:bg-gray-600 transition-all duration-150 ease-out hover:shadow-md [&>svg]:stroke-2 [&>svg]:text-gray-100'
                />
              </div>
            </Header>
            <div className='flex gap-0'>
              <Calendar
                showLabel={true}
                className='bg-gray-800'
                weekdayClassName='text-gray-300 font-medium'
                footerClassName='bg-gray-700 text-gray-100 border border-r-0 rounded-r-none border-gray-600 [&_svg]:text-gray-300'
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-gray-100 hover:bg-gray-700 hover:shadow-sm font-medium',
                  selected: 'bg-white text-gray-900 font-bold shadow-lg',
                  today: 'bg-gray-700 font-bold text-white',
                  hovered: 'bg-gray-700 shadow-sm',
                  weekend: 'text-gray-300 font-medium',
                  differentMonth: 'text-gray-500',
                }}
              />
              <Calendar
                showLabel={true}
                className='bg-gray-800'
                weekdayClassName='text-gray-300 font-medium'
                footerClassName='bg-gray-700 text-gray-100 border border-l-0 rounded-l-none border-gray-600 [&_svg]:text-gray-300'
                dayButtonClassNames={{
                  base: 'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm transition-all duration-150 ease-out text-gray-100 hover:bg-gray-700 hover:shadow-sm font-medium',
                  selected: 'bg-white text-gray-900 font-bold shadow-lg',
                  today: 'bg-gray-700 font-bold text-white',
                  hovered: 'bg-gray-700 shadow-sm',
                  weekend: 'text-gray-300 font-medium',
                  differentMonth: 'text-gray-500',
                }}
              />
            </div>
          </DatePickerProvider>
        </div>
      </div>
    </div>
  ),
}

export const MaterialDesignTheme = {
  render: () => (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-2xl space-y-8'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-lg'>
          <DatePickerProvider normalizeHeight={true}>
            <Header
              className='rounded-md bg-blue-500 text-white shadow-lg'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                showIcon={false}
                className='bg-opacity-20 flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white backdrop-blur-sm'
                popoverTriggerProps={{
                  className:
                    'bg-white hover:bg-gray-50 cursor-pointer rounded-md px-4 py-2 transition-all duration-150 ease-out font-medium text-blue-700 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300',
                }}
                popoverContentProps={{
                  className: 'bg-white shadow-lg rounded-md p-3 border border-gray-200',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-blue-700 border-gray-300 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:border-blue-300',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-gray-300 text-blue-700 rounded-md shadow-lg',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-blue-700 border-gray-300 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:border-blue-300',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-gray-300 text-blue-700 rounded-md shadow-lg',
                }}
              >
                <MonthLabel
                  type='full'
                  className='font-medium tracking-normal text-blue-600'
                />
              </DateSelect>
              <div className='flex gap-3'>
                <Button
                  type='previous'
                  className='bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-full bg-white px-3 py-3 text-white shadow-md transition-all duration-150 ease-out hover:shadow-lg [&>svg]:stroke-2 [&>svg]:!text-blue-600'
                />
                <Button
                  type='next'
                  className='bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-full bg-white px-3 py-3 text-white shadow-md transition-all duration-150 ease-out hover:shadow-lg [&>svg]:stroke-2 [&>svg]:!text-blue-600'
                />
              </div>
            </Header>
            <div className='flex gap-0'>
              <Calendar
                showLabel={true}
                className='bg-white'
                weekdayClassName='text-blue-600 font-medium tracking-wide text-xs'
                footerClassName='bg-blue-50 text-blue-700 border border-r-0 rounded-r-none border-blue-200 font-medium [&_svg]:text-blue-500'
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-full aspect-square px-1 py-1 text-xs transition-all duration-150 ease-out text-gray-700 hover:bg-blue-50 hover:shadow-sm font-medium',
                  selected: 'bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md',
                  today:
                    'bg-blue-50 font-medium text-blue-600 outline outline-blue-200 -outline-offset-1',
                  hovered: 'bg-blue-100 text-gray-800 shadow-sm font-medium',
                  weekend: 'text-gray-600 font-medium',
                }}
              />
              <Calendar
                showLabel={true}
                className='bg-white'
                weekdayClassName='text-blue-600 font-medium tracking-wide text-xs'
                footerClassName='bg-blue-50 text-blue-700 border border-l-0 rounded-l-none border-blue-200 font-medium [&_svg]:text-blue-500'
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-full aspect-square px-1 py-1 text-xs transition-all duration-150 ease-out text-gray-700 hover:bg-blue-50 hover:shadow-sm font-medium',
                  selected: 'bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md',
                  today:
                    'bg-blue-50 font-medium text-blue-600 outline outline-blue-200 -outline-offset-1',
                  hovered: 'bg-blue-100 text-gray-800 shadow-sm font-medium',
                  weekend: 'text-gray-600 font-medium',
                }}
              />
            </div>
          </DatePickerProvider>
        </div>
      </div>
    </div>
  ),
}

export const NeumorphismTheme = {
  render: () => (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='rounded-2xl border border-gray-200 bg-gray-100 p-6 shadow-xl'>
          <DatePickerProvider normalizeHeight={true}>
            <Header
              className='rounded-2xl bg-gray-100 text-gray-700 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,1),inset_5px_5px_10px_rgba(0,0,0,0.1)]'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                className='flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)]'
                popoverTriggerProps={{
                  className:
                    'bg-gray-100 hover:bg-gray-50 cursor-pointer rounded-xl px-3 py-2 transition-all duration-150 ease-out font-medium text-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,1)] hover:shadow-[3px_3px_8px_rgba(0,0,0,0.15),-3px_-3px_8px_rgba(255,255,255,1)]',
                }}
                popoverContentProps={{
                  className:
                    'bg-gray-100 shadow-[5px_5px_15px_rgba(0,0,0,0.2),-5px_-5px_15px_rgba(255,255,255,1)] rounded-xl p-4 border-0',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-gray-100 text-gray-700 rounded-xl px-3 py-2 font-medium cursor-pointer hover:bg-gray-50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.12),inset_-3px_-3px_8px_rgba(255,255,255,1)] transition-all duration-150 ease-out',
                }}
                monthSelectContentProps={{
                  className:
                    'bg-gray-100 text-gray-700 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.2),-5px_-5px_15px_rgba(255,255,255,1)] border-0',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-gray-100 text-gray-700 rounded-xl px-3 py-2 font-medium cursor-pointer hover:bg-gray-50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.12),inset_-3px_-3px_8px_rgba(255,255,255,1)] transition-all duration-150 ease-out',
                }}
                yearSelectContentProps={{
                  className:
                    'bg-gray-100 text-gray-700 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.2),-5px_-5px_15px_rgba(255,255,255,1)] border-0',
                }}
              >
                <MonthLabel
                  type='full'
                  className='font-medium text-gray-700'
                />
              </DateSelect>
              <div className='flex gap-3'>
                <Button
                  type='previous'
                  className='cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,1)] transition-all duration-150 ease-out hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.15),inset_-3px_-3px_8px_rgba(255,255,255,1)] [&>svg]:text-gray-600'
                />
                <Button
                  type='next'
                  className='cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,1)] transition-all duration-150 ease-out hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.15),inset_-3px_-3px_8px_rgba(255,255,255,1)] [&>svg]:text-gray-600'
                />
              </div>
            </Header>
            <div className='flex gap-0'>
              <Calendar
                showLabel={true}
                className='rounded-2xl bg-gray-100 p-4 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,1),inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                weekdayClassName='text-gray-600 font-medium'
                footerClassName='bg-gray-100 text-gray-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] font-medium [&_svg]:text-gray-600 border-0'
                dayButtonClassNames={{
                  base: 'bg-gray-100 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(0,0,0,0.1)] rounded-lg border border-transparent transition-all duration-150 ease-out px-4 py-2 text-sm cursor-pointer active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.15),inset_-3px_-3px_8px_rgba(255,255,255,1)]',
                  selected:
                    'bg-blue-500 text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] font-medium',
                  today:
                    'bg-orange-200 text-orange-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] font-medium',
                  hovered:
                    'shadow-[inset_-1px_-1px_2px_rgba(255,255,255,1),inset_1px_1px_2px_rgba(0,0,0,0.1)]',
                  weekend: 'text-red-600',
                  differentMonth: 'opacity-40 text-gray-600',
                }}
              />
              <Calendar
                showLabel={true}
                className='rounded-2xl bg-gray-100 p-4 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,1),inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                weekdayClassName='text-gray-600 font-medium'
                footerClassName='bg-gray-100 text-gray-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,1)] font-medium [&_svg]:text-gray-600 border-0'
                dayButtonClassNames={{
                  base: 'bg-gray-100 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(0,0,0,0.1)] rounded-lg border border-transparent transition-all duration-150 ease-out px-4 py-2 text-sm cursor-pointer active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.15),inset_-3px_-3px_8px_rgba(255,255,255,1)]',
                  selected:
                    'bg-blue-500 text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] font-medium',
                  today:
                    'bg-orange-200 text-orange-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] font-medium',
                  hovered:
                    'shadow-[inset_-1px_-1px_2px_rgba(255,255,255,1),inset_1px_1px_2px_rgba(0,0,0,0.1)]',
                  weekend: 'text-red-600',
                  differentMonth: 'opacity-40 text-gray-600',
                }}
              />
            </div>
          </DatePickerProvider>
        </div>
      </div>
    </div>
  ),
}

export const GreenRangeSelectionTheme = {
  render: () => (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-2xl space-y-8'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-lg'>
          <DatePickerProvider
            type='range'
            normalizeHeight={true}
          >
            <Header
              className='rounded-md bg-green-500 text-white shadow-lg'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                showIcon={false}
                className='bg-opacity-20 flex items-center justify-center gap-2 rounded-md bg-green-600 text-white backdrop-blur-sm'
                popoverTriggerProps={{
                  className:
                    'bg-white hover:bg-gray-50 cursor-pointer rounded-md px-4 py-2 transition-all duration-150 ease-out font-medium text-green-700 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300',
                }}
                popoverContentProps={{
                  className: 'bg-white shadow-lg rounded-md p-3 border border-gray-200',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-green-700 border-gray-300 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:border-green-300',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-gray-300 text-green-700 rounded-md shadow-lg',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-gray-50 text-green-700 border-gray-300 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-gray-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:border-green-300',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-gray-300 text-green-700 rounded-md shadow-lg',
                }}
              >
                <MonthLabel
                  type='full'
                  className='font-medium tracking-normal text-green-600'
                />
              </DateSelect>
              <div className='flex gap-3'>
                <Button
                  type='previous'
                  className='bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-full bg-white px-3 py-3 text-white shadow-md transition-all duration-150 ease-out hover:shadow-lg [&>svg]:stroke-2 [&>svg]:!text-green-600'
                />
                <Button
                  type='next'
                  className='bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-full bg-white px-3 py-3 text-white shadow-md transition-all duration-150 ease-out hover:shadow-lg [&>svg]:stroke-2 [&>svg]:!text-green-600'
                />
              </div>
            </Header>
            <div className='flex gap-0'>
              <Calendar
                showLabel={true}
                className='bg-white'
                weekdayClassName='text-green-600 font-medium tracking-wide text-xs'
                footerClassName='bg-green-50 text-green-700 border border-r-0 rounded-r-none border-green-200 font-medium [&_svg]:text-green-500'
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-full aspect-square px-1 py-1 text-xs transition-all duration-150 ease-out text-gray-700 hover:bg-green-50 hover:shadow-sm font-medium',
                  selected: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  today:
                    'bg-green-50 font-medium text-green-600 outline outline-green-200 -outline-offset-1',
                  rangeStart: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  rangeEnd: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  betweenRange: 'bg-green-100 text-green-800 font-medium',
                  hovered: 'bg-green-100 text-gray-800 shadow-sm font-medium',
                  weekend: 'text-gray-600 font-medium',
                  differentMonth: 'text-gray-400',
                }}
              />
              <Calendar
                showLabel={true}
                className='bg-white'
                weekdayClassName='text-green-600 font-medium tracking-wide text-xs'
                footerClassName='bg-green-50 text-green-700 border border-l-0 rounded-l-none border-green-200 font-medium [&_svg]:text-green-500'
                dayButtonClassNames={{
                  base: 'flex cursor-pointer items-center justify-center rounded-full aspect-square px-1 py-1 text-xs transition-all duration-150 ease-out text-gray-700 hover:bg-green-50 hover:shadow-sm font-medium',
                  selected: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  today:
                    'bg-green-50 font-medium text-green-600 outline outline-green-200 -outline-offset-1',
                  rangeStart: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  rangeEnd: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-md',
                  betweenRange: 'bg-green-100 text-green-800 font-medium',
                  hovered: 'bg-green-100 text-gray-800 shadow-sm font-medium',
                  weekend: 'text-gray-600 font-medium',
                  differentMonth: 'text-gray-400',
                }}
              />
            </div>
          </DatePickerProvider>
        </div>
      </div>
    </div>
  ),
}

export const MobileResponsiveTheme = {
  render: () => (
    <div className='min-h-screen bg-slate-50 p-3 sm:p-8'>
      <div className='mx-auto max-w-sm sm:max-w-lg space-y-4'>
        <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-lg'>
          <DatePickerProvider
            type='single'
            normalizeHeight={true}
          >
            <Header
              className='rounded-lg bg-slate-900 text-white shadow-md p-3 mb-4'
              calendarGridClassName='gap-x-0'
            >
              <DateSelect
                showIcon={false}
                className='flex items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-2 text-slate-100'
                popoverTriggerProps={{
                  className:
                    'bg-slate-700 hover:bg-slate-600 cursor-pointer rounded-md px-3 py-2 transition-all duration-150 ease-out font-medium text-slate-100 shadow-sm border border-slate-600 hover:shadow-md',
                }}
                popoverContentProps={{
                  className: 'bg-white shadow-xl rounded-lg p-3 border border-slate-200',
                }}
                monthSelectTriggerProps={{
                  className:
                    'bg-slate-50 text-slate-700 border-slate-200 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-slate-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md',
                }}
                monthSelectContentProps={{
                  className: 'bg-white border-slate-200 text-slate-700 rounded-lg shadow-xl',
                }}
                yearSelectTriggerProps={{
                  className:
                    'bg-slate-50 text-slate-700 border-slate-200 rounded-md px-3 py-2 font-medium cursor-pointer hover:bg-slate-100 shadow-sm transition-all duration-150 ease-out hover:shadow-md',
                }}
                yearSelectContentProps={{
                  className: 'bg-white border-slate-200 text-slate-700 rounded-lg shadow-xl',
                }}
              >
                <MonthLabel
                  type='short'
                  className='font-semibold text-slate-100 sm:hidden'
                />
                <MonthLabel
                  type='full'
                  className='font-semibold text-slate-100 hidden sm:block'
                />
              </DateSelect>
              <div className='flex gap-2'>
                <Button
                  type='previous'
                  className='cursor-pointer rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 p-2 text-white transition-all duration-150 ease-out [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-2'
                />
                <Button
                  type='next'
                  className='cursor-pointer rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 p-2 text-white transition-all duration-150 ease-out [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-2'
                />
              </div>
            </Header>
            <Calendar
              showLabel={true}
              className='bg-white'
              weekdayClassName='text-slate-600 font-semibold text-sm text-center py-2'
              footerClassName='bg-slate-50 text-slate-700 border border-slate-200 rounded-b-lg font-medium [&_svg]:text-slate-500 px-3 py-2'
              dayButtonClassNames={{
                base: 'flex cursor-pointer items-center justify-center rounded-lg w-10 h-10 text-sm transition-all duration-150 ease-out text-slate-700 hover:bg-slate-100 hover:shadow-sm font-medium touch-manipulation',
                selected: 'bg-slate-800 hover:bg-slate-900 text-white font-semibold',
                today: 'bg-slate-100 font-semibold text-slate-800 ring-2 ring-slate-300',
                hovered: 'bg-slate-50 text-slate-800 font-medium',
                weekend: 'text-slate-500 font-medium',
                differentMonth: 'text-slate-300',
              }}
            />
          </DatePickerProvider>
        </div>
        
        {/* Mobile-specific features demonstration */}
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <h3 className='font-semibold text-slate-800 mb-3'>Mobile Optimizations:</h3>
          <div className='grid grid-cols-1 gap-2 text-sm text-slate-600'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-slate-400 rounded-full'></div>
              <span>40px touch targets for accessibility</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-slate-400 rounded-full'></div>
              <span>Consistent spacing and alignment</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-slate-400 rounded-full'></div>
              <span>High contrast color scheme</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-slate-400 rounded-full'></div>
              <span>Compact header with readable labels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
