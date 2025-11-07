# Header

Container for navigation controls with calendar coordination and visual grouping support.

## Live Demo

**[→ Try the interactive demo in Storybook](https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com//?path=/story/components-header--default)**

See live examples with different grouping modes and navigation patterns.

## Import

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
;<DatePicker.Header>{/* Navigation controls */}</DatePicker.Header>
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

| Prop                    | Type                              | Default     | Description                                              |
| ----------------------- | --------------------------------- | ----------- | -------------------------------------------------------- |
| `groupingMode`          | `'all' \| 'disabled' \| string[]` | `'all'`     | Controls which calendars render inside Header via Portal |
| `calendarGridClassName` | `string`                          | `undefined` | CSS classes for calendar grid layout                     |
| `childrenClassName`     | `string`                          | `undefined` | CSS classes for navigation controls wrapper              |
| `className`             | `string`                          | `undefined` | Header container CSS classes                             |
| `children`              | `React.ReactNode`                 | -           | Navigation controls (Button, Label, etc.)                |

## Two Key Features

The Header component serves two purposes:

### 1. Calendar Coordination

When a Header exists, it automatically coordinates **ALL** Calendar components to:

- Display **consecutive months** (Jan, Feb, Mar...)
- Share **navigation controls** (Previous/Next buttons)
- Update **all calendars** when navigating

This happens regardless of where calendars are rendered in the DOM.

### 2. Visual Grouping

Uses React Portals to optionally render Calendar components **inside** the Header container for a unified layout.

## Without vs With Header

### Without Header

Calendars render independently, each showing the same month:

```tsx
<DatePicker.Provider
  type='single'
  initialMonth='2025-01-01'
>
  <DatePicker.Calendar /> {/* Shows January */}
  <DatePicker.Calendar /> {/* Shows January */}
  <DatePicker.Calendar /> {/* Shows January */}
</DatePicker.Provider>
```

### With Header

Calendars automatically show consecutive months and share navigation:

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar /> {/* Shows January */}
  <DatePicker.Calendar /> {/* Shows February */}
  <DatePicker.Calendar /> {/* Shows March */}
</DatePicker.Provider>
```

## Grouping Mode

The `groupingMode` prop controls **where calendars render visually** (via React Portals), not how they're coordinated.

### `'all'` (default)

All calendars render inside the Header container:

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header groupingMode='all'>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>

  {/* Both render inside Header via Portal */}
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

The calendars appear visually inside the Header, arranged in a responsive grid.

### `'disabled'`

Calendars render at their original DOM positions (but still coordinated):

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <div className='left-panel'>
    <DatePicker.Header groupingMode='disabled'>
      <DatePicker.Button type='previous'>←</DatePicker.Button>
      <DatePicker.Label />
      <DatePicker.Button type='next'>→</DatePicker.Button>
    </DatePicker.Header>
    <DatePicker.Calendar /> {/* Renders here */}
  </div>

  <div className='right-panel'>
    <DatePicker.Calendar /> {/* Renders here */}
  </div>
</DatePicker.Provider>
```

Useful for custom layouts where you want coordination but manual positioning.

### Selective grouping with IDs

Only calendars with matching `id` props render inside the Header:

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header groupingMode={['calendar1', 'calendar2']}>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar id='calendar1' /> {/* Renders in Header */}
  <DatePicker.Calendar id='calendar2' /> {/* Renders in Header */}
  <DatePicker.Calendar id='calendar3' /> {/* Renders separately */}
</DatePicker.Provider>
```

**Key Point:** The Header **always coordinates all calendars** regardless of `groupingMode`. This prop only controls visual rendering position.

## Custom Styling

### Header Container

```tsx
<DatePicker.Header className='custom-header'>
  <DatePicker.Button type='previous'>←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type='next'>→</DatePicker.Button>
</DatePicker.Header>
```

### Navigation Controls Wrapper

```tsx
<DatePicker.Header childrenClassName='custom-controls'>
  <DatePicker.Button type='previous'>←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type='next'>→</DatePicker.Button>
</DatePicker.Header>
```

### Calendar Grid Layout

```tsx
<DatePicker.Header calendarGridClassName='custom-grid'>
  <DatePicker.Button type='previous'>←</DatePicker.Button>
  <DatePicker.Label />
  <DatePicker.Button type='next'>→</DatePicker.Button>
</DatePicker.Header>
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
      <DatePicker.Header
        className='flex items-center gap-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4'
        childrenClassName='flex items-center gap-4'
        calendarGridClassName='grid grid-cols-2 gap-4 mt-4'
      >
        <DatePicker.Button
          type='previous'
          className='rounded bg-white px-3 py-2 hover:bg-gray-100'
        >
          ←
        </DatePicker.Button>

        <DatePicker.Label className='flex-1 text-center text-lg font-semibold text-white' />

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
import type { HeaderProps, GroupingModeType } from '@legeannd/react-modular-datepicker'
```
