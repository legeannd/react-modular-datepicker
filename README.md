# React Modular DatePicker

```tsx
import { DatePicker } from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider>
      <DatePicker.Header>
        <DatePicker.Button type='previous'>←</DatePicker.Button>
        <DatePicker.Label />
        <DatePicker.Button type='next'>→</DatePicker.Button>
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

A modern, customizable datepicker component library for React applications. Built with TypeScript, React 19, and styled with Tailwind CSS v4.

## Features

- 🎯 **Modular Architecture** - Use individual components or combine them
- 🎨 **Highly Customizable** - Full control over styling and behavior
- 🌍 **Internationalization** - Built-in Day.js localization support
- 📱 **Responsive Design** - Mobile-friendly out of the box
- 🎭 **Multiple Selection Types** - Single date, date range, and multi-select
- 🎪 **Storybook Documentation** - Interactive component playground
- 📦 **Optimized Bundle** - Tree-shakable with minimal dependencies
- ⚡ **TypeScript First** - Full type safety and IntelliSense support
- 🚀 **React Compiler Optimized** - Built with React's new compiler for optimal performance

## Requirements

This library is built using React's new compiler for optimal performance and requires the React Compiler to be configured in your project.

### React Compiler Setup

Install the React Compiler:

```bash
npm install babel-plugin-react-compiler
# or
pnpm add babel-plugin-react-compiler
# or
yarn add babel-plugin-react-compiler
```

Configure your build tool:

**For Vite:**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ReactCompilerConfig = {
  target: '19',
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
})
```

**For Next.js:**

```js
// next.config.js
const nextConfig = {
  experimental: {
    reactCompiler: {
      target: '19',
    },
  },
}

module.exports = nextConfig
```

**For Create React App:**

```js
// babel.config.js
module.exports = {
  plugins: [['babel-plugin-react-compiler', { target: '19' }]],
}
```

## Installation

```bash
npm install @legeannd/react-modular-datepicker
# or
pnpm add @legeannd/react-modular-datepicker
# or
yarn add @legeannd/react-modular-datepicker
```

**Note:** The library comes with default styles built using Tailwind CSS v4, but **Tailwind is not required** to use the library. You can completely override the styles with your own CSS, CSS-in-JS, or any other styling approach.

## Quick Start

### Basic Usage

```tsx
import { DatePicker } from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### With Header Controls

```tsx
import { DatePicker } from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider>
      <DatePicker.Header>
        <DatePicker.Button type='previous'>←</DatePicker.Button>
        <DatePicker.Label />
        <DatePicker.Button type='next'>→</DatePicker.Button>
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Date Range Selection

```tsx
import { DatePicker } from '@legeannd/react-modular-datepicker'

function App() {
  const handleSelectionChange = (selection) => {
    console.log('Selected dates:', selection)
  }

  return (
    <DatePicker.Provider
      type='range'
      onSelectionChange={handleSelectionChange}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

## Components

### DatePicker.Provider

The root provider component that manages state and context for all child components.

```tsx
<DatePicker.Provider
  type='single' // "single" | "range" | "multiple"
  initialMonth={new Date()}
  defaultSelected={{
    days: ['2024-01-15'], // For multiple selection
    start: '2024-01-01', // For range selection
    end: '2024-01-31', // For range selection
  }}
  normalizeHeight={true} // Makes all calendar grids 6 weeks tall
  disabledDates={{
    days: ['2024-12-25'], // Specific dates
    start: '2024-01-01', // Before this date
    end: '2024-12-31', // After this date
    every: 'weekend', // "weekend" | "weekdays"
    weekdays: [0, 6], // Sunday=0, Saturday=6
  }}
  onSelectionChange={(selection, type) => {
    // selection format depends on type:
    // single: "2024-01-15" | null
    // multiple: ["2024-01-15", "2024-01-16"] | null
    // range: { start: "2024-01-01", end: "2024-01-31" } | null
    console.log(selection, type)
  }}
  dayjs={customDayjsInstance} // Optional custom dayjs instance
  className='custom-datepicker'
>
  {/* Your datepicker components */}
</DatePicker.Provider>
```

### DatePicker.Calendar

The main calendar grid component that displays the dates.

```tsx
<DatePicker.Calendar
  showWeekdays={true}
  weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
  dayButtonClassNames={{
    base: 'custom-day-button',
    selected: 'selected-day',
    today: 'today-highlight',
  }}
/>
```

### DatePicker.Header

A flexible container for navigation controls.

```tsx
<DatePicker.Header groupingMode='all'>
  <DatePicker.Button type='previous'>Previous</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type='next'>Next</DatePicker.Button>
</DatePicker.Header>
```

### DatePicker.Button

Navigation buttons for month/year changes.

```tsx
<DatePicker.Button type="previous" className="custom-button">
  ← Previous
</DatePicker.Button>
<DatePicker.Button type="next" className="custom-button">
  Next →
</DatePicker.Button>
```

### DatePicker.Label

Displays the current month and year.

```tsx
<DatePicker.Label type="full" /> // "January 2024"
<DatePicker.Label type="short" /> // "Jan 2024"
```

## Styling & Customization

### Default Styling

The library includes default styles built with **Tailwind CSS v4**, but **Tailwind is not required**. You can use any CSS approach.

### Styling Methods

#### 1. CSS Classes

```tsx
<DatePicker.Calendar
  dayButtonClassNames={{
    base: 'day-button',
    selected: 'day-selected',
    today: 'day-today',
    weekend: 'day-weekend',
    disabled: 'day-disabled',
    hovered: 'day-hovered',
    differentMonth: 'day-different-month',
    monthBoundary: 'day-month-boundary',
    rangeStart: 'day-range-start',
    rangeEnd: 'day-range-end',
    betweenRange: 'day-between-range',
    disabledInRange: 'day-disabled-in-range',
  }}
/>
```

#### 2. CSS Variables (Theme System)

```css
.my-datepicker {
  --color-primary: #1f2937;
  --color-hover: #f3f4f6;
  --color-selected: #3b82f6;
  --color-disabled: #9ca3af;
  --color-range: #dbeafe;
  --color-weekend: #ef4444;
  --color-today: #f0f0f0;
  --font-display: 'Inter', sans-serif;
  --radius: 8px;
}
```

#### 3. CSS-in-JS & Other Approaches

Works with styled-components, emotion, CSS modules, or any styling solution.

### Disabled Dates

```tsx
<DatePicker.Provider
  disabledDates={{
    days: ['2024-07-04', '2024-12-25'], // Disable specific dates
    start: '2024-01-01', // Disable dates after this (when no end)
    end: '2024-12-31', // Disable dates before this (when no start)
    // When both start & end: disables the entire range including boundaries
    every: 'weekend', // Disable weekends (sat/sun)
    weekdays: [1, 2], // Used with every: "weekdays" - disable these weekdays
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Localization

The library uses Day.js for date formatting and localization. You can provide a custom Day.js instance with your desired locale:

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/es' // Import Spanish locale
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

// Extend dayjs with required plugins
dayjs.extend(localeData)
dayjs.extend(isToday)

// Create a custom dayjs factory function
const spanishDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('es')

<DatePicker.Provider dayjs={spanishDayjs}>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Required Plugins:** The custom dayjs instance must include `localeData` and `isToday` plugins for the library to function correctly.

## Development & Storybook

Run the interactive component documentation:

```bash
git clone https://github.com/legeannd/react-modular-datepicker.git
cd react-modular-datepicker
pnpm install
pnpm storybook  # Opens http://localhost:6006
```

Explore components, styling examples, and test configurations interactively.

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

// Both individual imports and compound component work
import { DatePicker } from '@legeannd/react-modular-datepicker'

const customDayStyles: DayButtonClassNames = {
  base: 'px-3 py-2 text-sm',
  selected: 'bg-blue-600 text-white',
  today: 'ring-2 ring-blue-300',
}
```

### Import Options

The library supports both compound components and individual imports:

```tsx
// Option 1: Compound Components (Recommended)
import { DatePicker } from '@legeannd/react-modular-datepicker'
;<DatePicker.Provider>
  <DatePicker.Calendar />
</DatePicker.Provider>

// Option 2: Individual Components
import { DatePickerProvider, Calendar } from '@legeannd/react-modular-datepicker'
;<DatePickerProvider>
  <Calendar />
</DatePickerProvider>
```

## Dependencies

- **React 19+** - Required for the component library
- **React Compiler** - Required for optimal performance (babel-plugin-react-compiler)
- **Day.js** (peer dependency) - For date manipulation and formatting
- **CSS** - Default styles included (built with Tailwind CSS v4, but Tailwind is not required for usage)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
