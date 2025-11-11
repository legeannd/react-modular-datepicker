# Provider

The root component that manages state and coordinates all child components.

## Live Demo

**[→ Try the interactive demo in Storybook](https://6906e222e254283f6ff8fd07-bifeswhdfq.chromatic.com/?path=/story/components-provider--default)**

See live examples with different selection modes and configurations.

## Import

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
;<DatePicker.Provider>{/* Your calendar components */}</DatePicker.Provider>
```

## Basic Usage

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<SingleSelection>(null)

  return (
    <DatePicker.Provider
      type='single'
      value={date}
      onSelectionChange={setDate}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

## Props

### Core Props

| Prop       | Type                                | Default    | Description                                             |
| ---------- | ----------------------------------- | ---------- | ------------------------------------------------------- |
| `type`     | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode                                          |
| `children` | `React.ReactNode`                   | -          | **Required**. Child components (Calendar, Header, etc.) |

### State Management

| Prop                | Type                                                     | Description                              |
| ------------------- | -------------------------------------------------------- | ---------------------------------------- |
| `value`             | `SingleSelection \| RangeSelection \| MultipleSelection` | Current selected value (controlled mode) |
| `onSelectionChange` | `(value) => void`                                        | Callback when selection changes          |
| `defaultSelected`   | `InitialDatesObject`                                     | Initial value (uncontrolled mode)        |

**Value Types by Mode:**

- **Single:** `string | null` - ISO 8601 date string (e.g., `"2025-01-15T00:00:00.000Z"`)
- **Range:** `{ start: string; end: string } | null` - Object with start/end ISO 8601 dates
- **Multiple:** `string[] | null` - Array of ISO 8601 date strings

### Configuration

| Prop              | Type                  | Default         | Description                             |
| ----------------- | --------------------- | --------------- | --------------------------------------- |
| `initialMonth`    | `string \| Date`      | Current month   | Month to display on initial render      |
| `normalizeHeight` | `boolean`             | `false`         | Make all calendar grids 6 weeks high    |
| `disabledDates`   | `DisabledDatesObject` | `undefined`     | Configuration for disabling dates       |
| `dayjs`           | `DayjsInstance`       | Default English | Custom Day.js instance for localization |
| `className`       | `string`              | `undefined`     | Provider container CSS classes          |

## Selection Modes

### Single Date

Select one date at a time:

```tsx
import type { SingleSelection } from '@legeannd/react-modular-datepicker'

const [date, setDate] = useState<SingleSelection>(null)

<DatePicker.Provider
  type="single"
  value={date}
  onSelectionChange={setDate}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value:** `"2025-01-15T00:00:00.000Z"` or `null`

### Range Selection

Select a date range with start and end:

```tsx
import type { RangeSelection } from '@legeannd/react-modular-datepicker'

const [range, setRange] = useState<RangeSelection>(null)

<DatePicker.Provider
  type="range"
  value={range}
  onSelectionChange={setRange}
>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value:** `{ start: "2025-01-10T00:00:00.000Z", end: "2025-01-20T00:00:00.000Z" }` or `null`

### Multiple Dates

Select multiple individual dates:

```tsx
import type { MultipleSelection } from '@legeannd/react-modular-datepicker'

const [dates, setDates] = useState<MultipleSelection>(null)

<DatePicker.Provider
  type="multiple"
  value={dates}
  onSelectionChange={setDates}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value:** `["2025-01-05T00:00:00.000Z", "2025-01-15T00:00:00.000Z", "2025-01-25T00:00:00.000Z"]` or `null`

## Disabled Dates

Disable specific dates or date patterns:

### Disable Specific Dates

```tsx
<DatePicker.Provider
  type='single'
  disabledDates={{
    days: ['2025-01-15', '2025-01-20', '2025-01-25'],
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Disable Weekends

```tsx
<DatePicker.Provider
  type='single'
  disabledDates={{ every: 'weekend' }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Disable Specific Weekdays

```tsx
// Disable Mondays and Fridays
<DatePicker.Provider
  type='single'
  disabledDates={{
    every: 'weekdays',
    weekdays: [1, 5], // 0=Sunday, 1=Monday, ..., 6=Saturday
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Disable Date Ranges

```tsx
// Disable all dates before 2025-01-10
<DatePicker.Provider
  type="single"
  disabledDates={{ end: '2025-01-10' }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>

// Disable all dates after 2025-01-31
<DatePicker.Provider
  type="single"
  disabledDates={{ start: '2025-01-31' }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>

// Disable range (inclusive)
<DatePicker.Provider
  type="single"
  disabledDates={{
    start: '2025-01-10',
    end: '2025-01-20'
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Combine Rules

All rules are cumulative (OR logic) - a date is disabled if ANY rule matches:

```tsx
<DatePicker.Provider
  type='single'
  disabledDates={{
    days: ['2025-01-15'], // Disable specific date
    every: 'weekend', // AND all weekends
    start: '2025-02-01', // AND all dates after Feb 1
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Default Selected Values

Set initial values for uncontrolled mode:

### Single Date

```tsx
<DatePicker.Provider
  type='single'
  defaultSelected={{ days: ['2025-01-15'] }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Range

```tsx
<DatePicker.Provider
  type='range'
  defaultSelected={{
    start: '2025-01-10',
    end: '2025-01-20',
  }}
>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Multiple Dates

```tsx
<DatePicker.Provider
  type='multiple'
  defaultSelected={{
    days: ['2025-01-05', '2025-01-15', '2025-01-25'],
  }}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Localization

Provide a custom Day.js instance with your locale:

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const spanishDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('es')

<DatePicker.Provider
  type="single"
  dayjs={spanishDayjs}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

See [Localization Guide](/docs/guide/localization) for more details.

## Normalize Height

Make all calendar grids the same height (6 weeks):

```tsx
<DatePicker.Provider
  type='single'
  normalizeHeight={true}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

Useful when:

- Switching between months with different week counts
- Creating layouts that need consistent calendar heights
- Preventing layout shift when navigating

## TypeScript Types

```typescript
import type {
  DatePickerProviderProps,
  SingleSelection,
  RangeSelection,
  MultipleSelection,
  DayjsInstance,
} from '@legeannd/react-modular-datepicker'
```
