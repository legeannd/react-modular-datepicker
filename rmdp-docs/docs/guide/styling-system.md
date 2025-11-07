---
sidebar_position: 4
---

# Styling System

React Modular DatePicker provides a flexible styling system. You can style components using **Tailwind CSS** (recommended), CSS variables, CSS Modules, or any CSS-in-JS solution.

## Styling with Tailwind CSS

The easiest way to style the datepicker is with Tailwind utility classes:

### Basic Example

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
      <DatePicker.Header className='flex items-center gap-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4'>
        <DatePicker.Button
          type='previous'
          className='rounded bg-white px-3 py-2 transition hover:bg-gray-100'
        >
          ←
        </DatePicker.Button>

        <DatePicker.Label className='flex-1 text-center text-lg font-semibold text-white' />

        <DatePicker.Button
          type='next'
          className='rounded bg-white px-3 py-2 transition hover:bg-gray-100'
        >
          →
        </DatePicker.Button>
      </DatePicker.Header>

      <DatePicker.Calendar
        className='mt-4 rounded-lg bg-white p-4 shadow-lg'
        dayButtonClassNames={{
          base: 'rounded-full aspect-square hover:bg-blue-50 transition',
          today: 'font-bold text-blue-600',
          selected: 'bg-blue-600 text-white hover:bg-blue-700',
          weekend: 'text-red-600',
          disabled: 'text-gray-300 cursor-not-allowed line-through',
        }}
      />
    </DatePicker.Provider>
  )
}
```

:::tip
For more styling examples and inspiration, check out our [Custom Styling Showcase in Storybook](https://github.com/legeannd/react-modular-datepicker/blob/develop/stories/CustomStylingShowcase.stories.tsx) or view the [live examples](https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com/?path=/docs/examples-custom-styling-showcase--docs).
:::

### Range Selection with Tailwind

```tsx
<DatePicker.Provider
  type='range'
  initialMonth='2025-01-01'
>
  <DatePicker.Header className='flex items-center justify-between rounded-t-xl bg-slate-900 p-6'>
    <DatePicker.Button
      type='previous'
      className='rounded-lg p-2 text-white transition hover:bg-slate-800'
    >
      ←
    </DatePicker.Button>

    <DatePicker.Label className='text-xl font-bold text-white' />

    <DatePicker.Button
      type='next'
      className='rounded-lg p-2 text-white transition hover:bg-slate-800'
    >
      →
    </DatePicker.Button>
  </DatePicker.Header>

  <DatePicker.Calendar
    className='bg-white p-6'
    dayButtonClassNames={{
      base: 'rounded-lg transition-all',
      today: 'font-bold ring-2 ring-blue-500',
      selected: 'bg-blue-600 text-white',
      rangeStart: 'bg-blue-700 text-white rounded-l-xl',
      rangeEnd: 'bg-blue-700 text-white rounded-r-xl',
      betweenRange: 'bg-blue-100',
      disabled: 'opacity-50 cursor-not-allowed',
    }}
  />
  <DatePicker.Calendar className='bg-white p-6' />
</DatePicker.Provider>
```

## Day Button States

The `dayButtonClassNames` prop provides granular control over day styling:

```tsx
<DatePicker.Calendar
  dayButtonClassNames={{
    base: 'rounded-full', // Base styles for all days
    today: 'font-bold ring-2', // Current date
    selected: 'bg-blue-600 text-white', // Selected dates
    weekend: 'text-red-600', // Weekends
    disabled: 'opacity-50', // Disabled dates
    rangeStart: 'rounded-l-xl', // Range start (range mode)
    rangeEnd: 'rounded-r-xl', // Range end (range mode)
    betweenRange: 'bg-blue-100', // Dates in range (range mode)
  }}
/>
```

**Available States:**

- `base` - Foundation for all days
- `today` - Current date
- `selected` - Selected dates
- `weekend` - Saturday/Sunday
- `disabled` - Disabled dates
- `hovered` - Hover state
- `differentMonth` - Adjacent month dates
- `monthBoundary` - First/last day of month
- `rangeStart` / `rangeEnd` - Range boundaries (range mode)
- `betweenRange` - Dates in range (range mode)
- `disabledInRange` - Disabled dates within range (range mode)

## Component Class Names

Every component accepts className props:

```tsx
// Calendar
<DatePicker.Calendar
  className="calendar-container"
  weekdaysContainerClassName="weekdays-wrapper"
  weekdayClassName="weekday-label"
  daysContainerClassName="days-grid"
/>

// Header
<DatePicker.Header
  className="header-container"
  childrenClassName="controls-wrapper"
  calendarGridClassName="calendar-grid"
/>

// Button & Label
<DatePicker.Button type="previous" className="nav-button" />
<DatePicker.Label className="month-label" />
```

## Dark Mode Support

The DatePicker component supports dark mode through the `data-theme` attribute on the root HTML element.

### How to Enable Dark Mode

Set the `data-theme` attribute to `"dark"` on the HTML element:

```tsx
// Enable dark mode
document.documentElement.setAttribute('data-theme', 'dark')

// Disable dark mode (back to light)
document.documentElement.setAttribute('data-theme', 'light')
```

The DatePicker will automatically use dark theme colors when `data-theme="dark"` is set:

```tsx
<DatePicker.Provider type='single'>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Important Note

The DatePicker relies on the `data-theme` attribute on the **root HTML element** (`<html>`), not on the DatePicker component itself. Your theme management solution must set this attribute for dark mode to work correctly.

## Alternative Styling Methods

### CSS Variables

Override CSS variables for global theming:

```css
:root {
  --color-primary: #3b82f6;
  --color-selected: #1d4ed8;
  --color-hover: #dbeafe;
  --spacing-4: 1rem;
  --radius-lg: 0.5rem;
}

:root[data-theme='dark'] {
  --color-primary: #60a5fa;
  --color-hover: #1e3a5f;
  --color-surface: #18181b;
}
```

### CSS Modules

```tsx
import styles from './Calendar.module.css'
;<DatePicker.Calendar
  className={styles.calendar}
  dayButtonClassNames={{
    base: styles.day,
    selected: styles.selected,
  }}
/>
```

### CSS-in-JS

Works with styled-components, Emotion, etc:

```tsx
import styled from 'styled-components'

const StyledCalendar = styled(DatePicker.Calendar)`
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
`
```
