# React Modular DatePicker

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

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

A modern, customizable datepicker component library for React applications. Built with TypeScript, React 19, and CSS Modules.

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

This library is built using React's new compiler for optimal performance and requires the React Compiler to be configured in your project.The library will likely work without it, but it won't have performance optimizations.

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

**Note:** The library uses CSS Modules for component styling. Styles are automatically imported when you import the library - no separate CSS import is needed.

**Styling Note:** The library comes with default styles built using CSS custom properties, but you can completely override the styles with your own CSS classes using the provided className props on each component.

## Quick Start

### Basic Usage

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

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
  initialMonth={new Date()} // Optional initial display month for the calendar
  defaultSelected={{
    days: ['2024-01-15'], // For single or multiple selection
    start: '2024-01-01', // For range selection
    end: '2024-01-31', // For range selection
    // The displayed dates depend on the `type` prop. If `type="single"`, only the first item in the `days` array will be selected and shown.
  }}
  normalizeHeight={true} // Makes all calendar grids 6 weeks tall
  disabledDates={{
    days: ['2024-12-25'], // Specific dates
    start: '2024-01-01', // Disable dates after this (when no end)
    end: '2024-12-31', // Disable dates before this (when no start)
    // When both start & end are present: disables the entire range including boundaries
    every: 'weekend', // "weekend" | "weekdays"
    weekdays: [0, 6], // Sunday=0, Saturday=6
  }}
  onSelectionChange={(selection) => {
    // selection format depends on provider type:
    // single: "2024-01-15" | null
    // multiple: ["2024-01-15", "2024-01-16"] | null
    // range: { start: "2024-01-01", end: "2024-01-31" } | null
    console.log(selection)
  }}
  dayjs={customDayjsInstance} // Optional custom dayjs instance
  className='custom-datepicker'
>
  {/* Your datepicker components */}
</DatePicker.Provider>
```

#### Props Reference

| Prop                | Type                                        | Default      | Description                                                               |
| ------------------- | ------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                           | **Required** | Child components (Calendar, Header, etc.)                                 |
| `initialMonth`      | `string` \| `Date`                          | `new Date()` | Initial month to display when the calendar first loads                    |
| `defaultSelected`   | `InitialDatesObject`                        | `undefined`  | Initial selected dates to display on the calendar                         |
| `type`              | `'single'` \| `'multiple'` \| `'range'`     | `'single'`   | Calendar selection mode (single, multiple, or range)                      |
| `normalizeHeight`   | `boolean`                                   | `false`      | Normalize all calendar grids to have the same height (6 weeks)            |
| `disabledDates`     | `DisabledDatesObject`                       | `{}`         | Configuration for disabling specific dates or date patterns               |
| `dayjs`             | `(date?: string \| Date \| Dayjs) => Dayjs` | `undefined`  | Custom dayjs instance for date formatting and localization                |
| `className`         | `string`                                    | `undefined`  | CSS classes for the provider container                                    |
| `onSelectionChange` | `(selection: NormalizedSelection) => void`  | `undefined`  | Callback fired when the selection changes, receives clean normalized data |

### DatePicker.Calendar

The main calendar grid component that displays the dates in a monthly view. This component handles date rendering, user interactions, and visual state management.

#### Key Features

- **Automatic Month Display**: Renders the current month with previous/next month dates for context
- **Multiple Selection Support**: Handles single, range, and multiple date selection modes
- **Portal Integration**: Can be rendered inside Header components or as standalone calendars
- **Accessibility**: Full ARIA labels and keyboard navigation support

#### Basic Usage

```tsx
<DatePicker.Calendar />
```

#### Advanced Configuration

```tsx
<DatePicker.Calendar
  id='primary-calendar'
  showWeekdays={true}
  weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  weekdayClassName='font-semibold text-gray-600'
  className='custom-calendar-styling'
  dayButtonClassNames={{
    base: 'custom-day-button',
    selected: 'selected-day',
    today: 'today-highlight',
    weekend: 'weekend-styling',
    disabled: 'disabled-day',
    betweenRange: 'range-middle',
    rangeStart: 'range-start',
    rangeEnd: 'range-end',
  }}
  footerSlot={({ currentDate }) => (
    <div className='mt-2 text-center text-sm text-gray-500'>{currentDate.format('MMMM YYYY')}</div>
  )}
/>
```

#### Props Reference

| Prop                  | Type                  | Default     | Description                                                  |
| --------------------- | --------------------- | ----------- | ------------------------------------------------------------ |
| `showWeekdays`        | `boolean`             | `true`      | Display weekday headers above the calendar grid              |
| `weekdayLabels`       | `string[]`            | `undefined` | Custom labels for weekdays (7 items, Sunday-Saturday)        |
| `weekdayClassName`    | `string`              | `undefined` | CSS classes for the weekday header row                       |
| `id`                  | `string`              | `undefined` | Unique identifier for calendar grouping and Portal rendering |
| `footerSlot`          | `function`            | `undefined` | Render prop for custom footer content                        |
| `dayButtonClassNames` | `DayButtonClassNames` | `{}`        | Comprehensive styling configuration for day buttons          |
| `className`           | `string`              | `undefined` | CSS classes for the calendar container                       |

#### Day Button States & Styling

The Calendar component provides granular control over day button appearance through the `dayButtonClassNames` prop. Each state has specific priorities and interaction rules:

```tsx
const dayStyles: DayButtonClassNames = {
  // Foundation styling applied to all day buttons
  base: 'h-10 w-10 rounded-md text-sm',

  // State-specific styling (applied conditionally)
  today: 'ring-2 ring-blue-300', // Current date highlight
  selected: 'bg-blue-600 text-white', // Selected dates (highest priority)
  weekend: 'text-red-500', // Saturday/Sunday
  hovered: 'bg-gray-100', // Mouse hover state

  // Month context styling
  differentMonth: 'text-gray-400', // Previous/next month dates
  monthBoundary: 'font-bold', // First/last day of month

  // Range selection styling (type="range" only)
  rangeStart: 'bg-blue-600 rounded-l-md', // Range start date
  rangeEnd: 'bg-blue-600 rounded-r-md', // Range end date
  betweenRange: 'bg-blue-200', // Dates between range

  // Disabled state styling (highest priority)
  disabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
  disabledInRange: 'bg-gray-50 text-gray-200', // Disabled dates in range
}
```

#### Calendar ID & Grouping

When using multiple calendars with Header components, the `id` prop controls Portal rendering behavior:

```tsx
// All calendars render inside header (groupingMode="all") This is the default behavior so the prop is not required.
<DatePicker.Header groupingMode="all">
  <DatePicker.Button type="previous">←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type="next">→</DatePicker.Button>
</DatePicker.Header>
<DatePicker.Calendar />                    // Renders in header
<DatePicker.Calendar />                    // Renders in header

// Selective calendar grouping (groupingMode={['cal1', 'cal2']})
<DatePicker.Header groupingMode={['cal1', 'cal2']}>
  <DatePicker.Button type="previous">←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type="next">→</DatePicker.Button>
</DatePicker.Header>
<DatePicker.Calendar id="cal1" />          // Renders in header
<DatePicker.Calendar id="cal2" />          // Renders in header
<DatePicker.Calendar id="cal3" />          // Renders separately

// Disabled grouping (groupingMode="disabled")
<DatePicker.Header groupingMode="disabled">
  <DatePicker.Button type="previous">←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type="next">→</DatePicker.Button>
</DatePicker.Header>
<DatePicker.Calendar />                    // Renders separately
```

#### Custom Footer with Render Props

Use the `footerSlot` prop for custom footer content with access to calendar data:

```tsx
<DatePicker.Calendar
  footerSlot={({ currentDate }) => (
    <div className='mt-2 border-t pt-2'>
      <p className='text-center text-sm text-gray-600'>{currentDate.format('MMMM YYYY')}</p>
      <p className='text-center text-xs text-gray-400'>Week {currentDate.week()}</p>
    </div>
  )}
/>
```

#### Accessibility Features

The Calendar component includes comprehensive accessibility support:

- **ARIA Labels**: Each calendar has `aria-label` with current month/year
- **Keyboard Navigation**: Arrow keys, Enter/Space for selection
- **Screen Reader Support**: Date announcements and selection state
- **Focus Management**: Proper focus indicators and tab order

### DatePicker.Header

A flexible container for navigation controls.

```tsx
<DatePicker.Header>
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
<DatePicker.Label type="long" /> // "January 2024"
<DatePicker.Label type="short" /> // "Jan 2024"

```

## Multiple Calendar Display

When using multiple calendar components within the same provider context, the date range label automatically displays the complete span across all calendars.

**Example:**

- Two calendar components showing January and February
- Label displays: "January - February 2024"

This ensures users have clear visibility of the entire selectable date range when working with multi-month calendar views.

## Multiple Calendars & Grouping Mode

The library supports displaying multiple calendars simultaneously within a single Header container using the React Portal API. This is useful for date range selection, comparing months, or creating complex date interfaces.

### Basic Multiple Calendar Setup

```tsx
<DatePicker.Provider type='range'>
  <DatePicker.Header>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>

  <DatePicker.Calendar />
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Grouping Mode Options

The `groupingMode` prop on `DatePicker.Header` controls which calendars are rendered inside the header container:

#### `groupingMode="all"` (Default)

All calendars are rendered inside the header in a responsive grid. Calendar IDs are not required.

```tsx
<DatePicker.Header groupingMode="all">
  {/* Navigation controls */}
</DatePicker.Header>
<DatePicker.Calendar />
<DatePicker.Calendar />
<DatePicker.Calendar />
```

#### `groupingMode="disabled"`

No calendars are rendered inside the header - they appear as separate components.

```tsx
<DatePicker.Header groupingMode="disabled">
  {/* Navigation controls */}
</DatePicker.Header>
<DatePicker.Calendar id="standalone" />
```

#### `groupingMode={['id1', 'id2']}` (Selective)

Only calendars with matching IDs are rendered inside the header.

```tsx
<DatePicker.Header groupingMode={['feb', 'mar']}>
  {/* Navigation controls */}
</DatePicker.Header>
<DatePicker.Calendar id="jan" />    {/* Renders separately */}
<DatePicker.Calendar id="feb" />    {/* Renders in header */}
<DatePicker.Calendar id="mar" />    {/* Renders in header */}
```

### Navigation Behavior

When multiple calendars are grouped:

- **Previous/Next buttons** navigate all grouped calendars simultaneously
- Each calendar displays consecutive months (Jan → Feb → Mar)
- Navigation updates all calendars maintaining their month sequence
- Individual calendars maintain their own state but share selection data

### Responsive Grid Layout

Multiple calendars automatically arrange in a responsive CSS Grid:

```css
/* Default responsive behavior */
.rmdp-header-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .rmdp-header-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .rmdp-header-grid {
    grid-template-columns: 1fr;
  }
}
```

### Custom Grid Styling

Customize the calendar grid layout:

```tsx
<DatePicker.Header calendarGridClassName='grid grid-cols-2 gap-4 lg:grid-cols-4'>
  <DatePicker.Button type='previous'>←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type='next'>→</DatePicker.Button>
</DatePicker.Header>
```

### Complete Example: Date Range Picker

```tsx
function DateRangePicker() {
  const [selection, setSelection] = useState(null)

  return (
    <DatePicker.Provider
      type='range'
      onSelectionChange={(dates) => {
        if (dates) {
          console.log(`Range: ${dates.start} to ${dates.end}`)
          setSelection(dates)
        }
      }}
    >
      <DatePicker.Header className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <DatePicker.Button type='previous'>Previous Month</DatePicker.Button>
          <DatePicker.Label />
          <DatePicker.Button type='next'>Next Month</DatePicker.Button>
        </div>
      </DatePicker.Header>

      <DatePicker.Calendar />
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
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
