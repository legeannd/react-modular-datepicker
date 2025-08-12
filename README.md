# React Modular DatePicker

A modern, customizable, and modular datepicker component library for React applications. Built with TypeScript, React 19, and Tailwind CSS.

## Features

- 🎯 **Modular Architecture** - Use individual components or combine them
- 🎨 **Highly Customizable** - Full control over styling and behavior
- 🌍 **Internationalization** - Built-in Day.js localization support
- 📱 **Responsive Design** - Mobile-friendly out of the box
- 🎭 **Multiple Selection Types** - Single date, date range, and multi-select
- 🎪 **Storybook Documentation** - Interactive component playground
- 📦 **Optimized Bundle** - Tree-shakable with minimal dependencies
- ⚡ **TypeScript First** - Full type safety and IntelliSense support

## Installation

```bash
npm install @legeannd/react-modular-datepicker
# or
pnpm add @legeannd/react-modular-datepicker
# or
yarn add @legeannd/react-modular-datepicker
```

## Quick Start

### Basic Usage

```tsx
import { DatePickerProvider, Calendar } from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePickerProvider>
      <Calendar />
    </DatePickerProvider>
  )
}
```

### With Header Controls

```tsx
import {
  DatePickerProvider,
  Header,
  Calendar,
  Button,
  MonthLabel,
} from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePickerProvider>
      <Header>
        <Button type='prev'>←</Button>
        <MonthLabel />
        <Button type='next'>→</Button>
      </Header>
      <Calendar />
    </DatePickerProvider>
  )
}
```

### Date Range Selection

```tsx
import { DatePickerProvider, Calendar } from '@legeannd/react-modular-datepicker'

function App() {
  const handleSelectionChange = (selection) => {
    console.log('Selected dates:', selection)
  }

  return (
    <DatePickerProvider
      type='range'
      onSelectionChange={handleSelectionChange}
    >
      <Calendar />
    </DatePickerProvider>
  )
}
```

## Components

### DatePickerProvider

The root provider component that manages state and context for all child components.

```tsx
<DatePickerProvider
  type='single' // "single" | "range" | "multi"
  initialMonth={new Date()}
  defaultSelected={new Date()}
  onSelectionChange={(selection) => console.log(selection)}
  dayjs={customDayjsInstance} // Optional custom dayjs instance
>
  {/* Your datepicker components */}
</DatePickerProvider>
```

### Calendar

The main calendar grid component that displays the dates.

```tsx
<Calendar
  showWeekdays={true}
  weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
  dayButtonClassNames={{
    base: 'custom-day-button',
    selected: 'selected-day',
    today: 'today-highlight',
  }}
/>
```

### Header

A flexible container for navigation controls.

```tsx
<Header groupingMode='all'>
  <Button type='prev'>Previous</Button>
  <MonthLabel />
  <Button type='next'>Next</Button>
</Header>
```

### Button

Navigation buttons for month/year changes.

```tsx
<Button type="prev" className="custom-button">
  ← Previous
</Button>
<Button type="next" className="custom-button">
  Next →
</Button>
```

### MonthLabel

Displays the current month and year.

```tsx
<MonthLabel type="full" /> // "January 2024"
<MonthLabel type="short" /> // "Jan 2024"
```

## Customization

### Custom Styling

The library is built with Tailwind CSS but allows complete style customization:

```tsx
<DatePickerProvider className='custom-datepicker'>
  <Header className='bg-blue-100 p-4'>
    <Button
      type='prev'
      className='rounded px-3 py-1 hover:bg-blue-200'
    >
      ←
    </Button>
    <MonthLabel className='text-lg font-bold' />
    <Button
      type='next'
      className='rounded px-3 py-1 hover:bg-blue-200'
    >
      →
    </Button>
  </Header>
  <Calendar
    dayButtonClassNames={{
      base: 'hover:bg-blue-50 rounded-lg',
      selected: 'bg-blue-500 text-white font-semibold',
      today: 'border-2 border-blue-300',
      weekend: 'text-red-500',
    }}
  />
</DatePickerProvider>
```

### Disabled Dates

```tsx
<DatePickerProvider
  disabledDates={{
    before: new Date('2024-01-01'),
    after: new '2024-12-31'(),
    dates: [new Date('2024-07-04')], // Specific dates
    weekdays: [0, 6], // Disable weekends
  }}
>
  <Calendar />
</DatePickerProvider>
```

### Localization

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/es'

const spanishDayjs = dayjs.locale('es')

;<DatePickerProvider dayjs={spanishDayjs}>
  <Calendar />
</DatePickerProvider>
```

## Hooks

### useDateSelect

Access month/year selection functionality:

```tsx
import { useDateSelect } from '@legeannd/react-modular-datepicker'

function CustomMonthSelect() {
  const { currentMonth, currentYear, months, years, onMonthChange, onYearChange } = useDateSelect()

  return (
    <div>
      <select
        value={currentMonth}
        onChange={onMonthChange}
      >
        {months.map((month, index) => (
          <option
            key={index}
            value={index}
          >
            {month}
          </option>
        ))}
      </select>
      <select
        value={currentYear}
        onChange={onYearChange}
      >
        {years.map((year) => (
          <option
            key={year}
            value={year}
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  DatePickerProviderProps,
  CalendarProps,
  HeaderProps,
  DayButtonClassNames,
} from '@legeannd/react-modular-datepicker'

const customDayStyles: DayButtonClassNames = {
  base: 'px-3 py-2 text-sm',
  selected: 'bg-blue-600 text-white',
  today: 'ring-2 ring-blue-300',
}
```

## Dependencies

- React 19+
- Day.js (peer dependency)
- Tailwind CSS (for default styles)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
})

```

```
