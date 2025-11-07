# Custom Hooks

React Modular DatePicker exports the `useDateSelect` hook for building custom navigation controls.

## useDateSelect

Build custom month/year dropdowns or navigation:

```tsx
import { useDateSelect } from '@legeannd/react-modular-datepicker'
```

### Return Values

```typescript
{
  currentMonth: number        // Current month index (0-11)
  currentYear: number         // Current year
  months: string[]           // Localized month names
  years: number[]            // Array of years
  onMonthChange: (monthIndex: number) => void
  onYearChange: (year: number) => void
}
```

### Basic Example

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { useDateSelect } from '@legeannd/react-modular-datepicker'

function MonthYearSelector() {
  const { months, currentMonth, years, currentYear, onMonthChange, onYearChange } = useDateSelect()

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <select
        value={currentMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      >
        {months.map((month, index) => (
          <option
            key={month}
            value={index}
          >
            {month}
          </option>
        ))}
      </select>

      <select
        value={currentYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
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

// Usage
function App() {
  return (
    <DatePicker.Provider type='single'>
      <DatePicker.Header>
        <MonthYearSelector />
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Options

Configure the year range:

```tsx
const { years } = useDateSelect({
  yearRangeStartOffset: 10, // How many years ahead (default: 10)
  yearRangeEndOffset: 40, // How many years back (default: 40)
})
```

For example, if the calendar starts at 2025:

- Start offset of 10 → years go up to 2035
- End offset of 40 → years go back to 1985
- Total range: 1985-2035 (50 years)

### Custom Styled Dropdowns

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { useDateSelect } from '@legeannd/react-modular-datepicker'
import styles from './Navigation.module.css'

function StyledNavigation() {
  const { months, currentMonth, years, currentYear, onMonthChange, onYearChange } = useDateSelect({
    yearRangeStartOffset: 5,
    yearRangeEndOffset: 20,
  })

  return (
    <div className={styles.navigation}>
      <select
        value={currentMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className={styles.select}
      >
        {months.map((month, index) => (
          <option
            key={month}
            value={index}
          >
            {month}
          </option>
        ))}
      </select>

      <select
        value={currentYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className={styles.select}
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

### With Localization

The hook respects the Day.js locale:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { useDateSelect } from '@legeannd/react-modular-datepicker'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const spanishDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('es')

function SpanishNavigation() {
  const { months, currentMonth, onMonthChange } = useDateSelect()

  return (
    <select
      value={currentMonth}
      onChange={(e) => onMonthChange(Number(e.target.value))}
    >
      {months.map((month, index) => (
        <option
          key={month}
          value={index}
        >
          {month} {/* enero, febrero, marzo... */}
        </option>
      ))}
    </select>
  )
}

function App() {
  return (
    <DatePicker.Provider
      type='single'
      dayjs={spanishDayjs}
    >
      <DatePicker.Header>
        <SpanishNavigation />
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Custom UI Components

Use with any UI library (Radix UI example):

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { useDateSelect } from '@legeannd/react-modular-datepicker'
import * as Select from '@radix-ui/react-select'

function RadixNavigation() {
  const { months, currentMonth, years, currentYear, onMonthChange, onYearChange } = useDateSelect()

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Select.Root
        value={String(currentMonth)}
        onValueChange={(value) => onMonthChange(Number(value))}
      >
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {months.map((month, index) => (
            <Select.Item
              key={month}
              value={String(index)}
            >
              {month}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root
        value={String(currentYear)}
        onValueChange={(value) => onYearChange(Number(value))}
      >
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {years.map((year) => (
            <Select.Item
              key={year}
              value={String(year)}
            >
              {year}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}
```

### Button-Based Navigation

Create custom increment/decrement buttons:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { useDateSelect } from '@legeannd/react-modular-datepicker'

function YearNavigation() {
  const { currentYear, onYearChange } = useDateSelect()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button onClick={() => onYearChange(currentYear - 1)}>Previous Year</button>
      <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{currentYear}</span>
      <button onClick={() => onYearChange(currentYear + 1)}>Next Year</button>
    </div>
  )
}
```

## Important Requirements

**Header Dependency:** The `useDateSelect` hook requires a `<DatePicker.Header>` component in the tree. The Header listens to reference date changes and updates all calendars accordingly. Without the Header, the changes in the selector will not be propagated to the calendars.

```tsx
// ❌ Won't work - no Header
<DatePicker.Provider type="single">
  <MonthYearSelector />
  <DatePicker.Calendar />
</DatePicker.Provider>

// ✅ Works - Header present
<DatePicker.Provider type="single">
  <DatePicker.Header />
  <MonthYearSelector />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Use Cases

### Year-First Navigation

For booking systems where users typically select year first:

```tsx
function YearFirstNav() {
  const { months, currentMonth, years, currentYear, onMonthChange, onYearChange } = useDateSelect()

  return (
    <div>
      <div>
        <label>Year:</label>
        <select
          value={currentYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
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
      <div>
        <label>Month:</label>
        <select
          value={currentMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option
              key={month}
              value={index}
            >
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
```

### Quick Jump Buttons

Add buttons for common date jumps:

```tsx
function QuickJumpNav() {
  const { currentYear, onMonthChange, onYearChange } = useDateSelect()

  const jumpToMonth = (month: number) => {
    onMonthChange(month)
  }

  const jumpToToday = () => {
    const now = new Date()
    onYearChange(now.getFullYear())
    onMonthChange(now.getMonth())
  }

  return (
    <div>
      <button onClick={jumpToToday}>Today</button>
      <button
        onClick={() => {
          onMonthChange(0)
          onYearChange(currentYear)
        }}
      >
        Start of Year
      </button>
      <button
        onClick={() => {
          onMonthChange(11)
          onYearChange(currentYear)
        }}
      >
        End of Year
      </button>
    </div>
  )
}
```
