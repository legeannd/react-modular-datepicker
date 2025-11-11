# Label

Displays current month/year. Automatically shows date range when multiple calendars are present.

## Live Demo

**[→ See Label in action in the Header stories](https://6906e222e254283f6ff8fd07-bifeswhdfq.chromatic.com/?path=/story/components-header--default)**

The Label component is showcased within the Header component stories, where you can see it displaying month/year information and handling date ranges.

## Import

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
;<DatePicker.Label />
```

## Basic Usage

```tsx
<DatePicker.Provider type='single'>
  <DatePicker.Header>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Props

| Prop        | Type                        | Default     | Description                              |
| ----------- | --------------------------- | ----------- | ---------------------------------------- |
| `type`      | `'long' \| 'short'`         | `'long'`    | Label format (long vs short month names) |
| `children`  | `(data) => React.ReactNode` | `undefined` | Custom render function                   |
| `className` | `string`                    | `undefined` | Label CSS classes                        |

All standard HTML span attributes are also supported (`aria-label`, `aria-live`, etc.).

## Label Formats

### Long Format (default)

```tsx
<DatePicker.Label type='long' />
```

**Single calendar:** `"January 2025"`  
**Multiple calendars (same year):** `"January - March 2025"`  
**Multiple calendars (different years):** `"January 2025 - March 2026"`

### Short Format

```tsx
<DatePicker.Label type='short' />
```

**Single calendar:** `"Jan 2025"`  
**Multiple calendars (same year):** `"Jan - Mar 2025"`  
**Multiple calendars (different years):** `"Jan 2025 - Mar 2026"`

## Automatic Range Detection

The Label automatically detects when multiple calendars are registered and shows the range:

### Single Calendar

```tsx
<DatePicker.Provider
  type='single'
  initialMonth='2025-01-01'
>
  <DatePicker.Header>
    <DatePicker.Label /> {/* Shows "January 2025" */}
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Two Calendars

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header>
    <DatePicker.Label /> {/* Shows "January - February 2025" */}
  </DatePicker.Header>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Three Calendars

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header>
    <DatePicker.Label /> {/* Shows "January - March 2025" */}
  </DatePicker.Header>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Cross-Year Range

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-12-01'
>
  <DatePicker.Header>
    <DatePicker.Label /> {/* Shows "December 2025 - February 2026" */}
  </DatePicker.Header>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Custom Render Function

For complete control over label formatting and styling:

```tsx
<DatePicker.Label>
  {({ start, end }) => (
    <div className='flex items-center gap-2'>
      <span className='text-lg font-bold text-blue-600'>
        {start.month} {start.year}
      </span>
      {end.month !== start.month && (
        <>
          <span className='text-gray-400'>→</span>
          <span className='text-lg font-bold text-blue-600'>
            {end.month} {end.year}
          </span>
        </>
      )}
    </div>
  )}
</DatePicker.Label>
```

**Render function receives:**

```typescript
{
  start: {
    month: string,  // Localized month name
    year: number,   // Year number
  },
  end: {
    month: string,  // Localized month name
    year: number,   // Year number
  }
}
```

## Localization

The Label respects the Day.js locale:

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const spanishDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('es')

<DatePicker.Provider type="single" dayjs={spanishDayjs}>
  <DatePicker.Header>
    <DatePicker.Label type="long" /> {/* Shows "enero 2025" */}
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

See [Localization Guide](/docs/guide/localization) for more details.

## Custom Styling

```tsx
<DatePicker.Label className='flex-1 text-center text-lg font-semibold text-gray-800' />
```

## Accessibility

The Label includes ARIA attributes for screen readers:

- `aria-label` - Descriptive text (e.g., "January of 2025 to March of 2025")
- `aria-live="polite"` - Announces changes when navigating

You can override the `aria-label`:

```tsx
<DatePicker.Label aria-label='Current month and year' />
```

## Complete Example

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { RangeSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [range, setRange] = useState<RangeSelection>(null)

  return (
    <DatePicker.Provider
      type='range'
      value={range}
      onSelectionChange={setRange}
      initialMonth='2025-01-01'
    >
      <DatePicker.Header className='flex items-center gap-4 rounded-lg bg-blue-600 p-4'>
        <DatePicker.Button
          type='previous'
          className='rounded bg-white px-3 py-2 hover:bg-gray-100'
        >
          ←
        </DatePicker.Button>

        <DatePicker.Label
          type='long'
          className='flex-1 text-center text-xl font-bold text-white'
        />

        <DatePicker.Button
          type='next'
          className='rounded bg-white px-3 py-2 hover:bg-gray-100'
        >
          →
        </DatePicker.Button>
      </DatePicker.Header>

      <DatePicker.Calendar />
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

## TypeScript Types

```typescript
import type { LabelProps, LabelRangeProps } from '@legeannd/react-modular-datepicker'
```
