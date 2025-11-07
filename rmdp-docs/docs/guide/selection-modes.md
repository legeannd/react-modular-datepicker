# Selection Modes

React Modular DatePicker supports three selection modes: single date, date ranges, and multiple dates.

## Single Date Selection

The default mode for selecting a single date.

**Note:** `type="single"` is optional - if you omit the `type` prop, the Provider defaults to single selection mode.

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

const [date, setDate] = useState<SingleSelection>(null)

<DatePicker.Provider value={date} onSelectionChange={setDate}>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value Type:** `string | null`

The selected date is returned as an ISO 8601 string (e.g., `"2025-01-15T00:00:00.000Z"`), or `null` if no date is selected.

## Range Selection

Select a start and end date to create a date range.

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { RangeSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

const [range, setRange] = useState<RangeSelection>(null)

<DatePicker.Provider
  type="range"
  value={range}
  onSelectionChange={setRange}
>
  <DatePicker.Header>
    <DatePicker.Button type="previous">←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type="next">→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value Type:** `{ start: string; end: string } | null`

The range is returned as an object with `start` and `end` properties (both ISO 8601 strings like `"2025-01-15T00:00:00.000Z"`), or `null` if no complete range is selected.

### Range Selection Behavior

1. **First click** - Sets the start date
2. **Second click** - Sets the end date (range is complete)
3. **Third click** - Resets and starts a new range

If you click a date before the current start date, it becomes the new start date.

## Multiple Dates Selection

Select multiple individual dates (non-consecutive).

```tsx
import type { MultipleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

const [dates, setDates] = useState<MultipleSelection>(null)

<DatePicker.Provider
  type="multiple"
  value={dates}
  onSelectionChange={setDates}
>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

**Value Type:** `string[] | null`

Selected dates are returned as an array of ISO 8601 strings (e.g., `["2025-01-05T00:00:00.000Z", "2025-01-15T00:00:00.000Z"]`), or `null` if no dates are selected.

### Multiple Dates Behavior

- Click a date to **add** it to the selection
- Click a selected date to **remove** it from the selection
- No limit on the number of dates that can be selected

## Default Selected Dates

You can provide initial selected dates for uncontrolled mode using the `defaultSelected` prop:

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

## Type Safety

All selection modes are fully typed. TypeScript will enforce the correct value type based on the `type` prop:

```tsx
// ✅ Correct
<DatePicker.Provider
  type="single"
  value={singleDate} // string | null
  onSelectionChange={(date: SingleSelection) => ...}
/>

// ✅ Correct
<DatePicker.Provider
  type="range"
  value={range} // { start: string; end: string } | null
  onSelectionChange={(range: RangeSelection) => ...}
/>

// ✅ Correct
<DatePicker.Provider
  type="multiple"
  value={dates} // string[] | null
  onSelectionChange={(dates: MultipleSelection) => ...}
/>
```
