# Button

Navigation buttons for month/year changes.

## Live Demo

**[→ See Button in action in the Header stories](https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com//?path=/story/components-header--default)**

The Button component is showcased within the Header component stories, where you can see it working with navigation controls.

## Import

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

<DatePicker.Button type="previous">←</DatePicker.Button>
<DatePicker.Button type="next">→</DatePicker.Button>
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

| Prop        | Type                   | Required | Description                        |
| ----------- | ---------------------- | -------- | ---------------------------------- |
| `type`      | `'previous' \| 'next'` | **Yes**  | Navigation direction               |
| `children`  | `React.ReactNode`      | No       | Button content (icons, text, etc.) |
| `className` | `string`               | No       | Button CSS classes                 |

All standard HTML button attributes are also supported (`onClick`, `disabled`, `aria-label`, etc.).

## Navigation Direction

### Previous Month/Year

```tsx
<DatePicker.Button type='previous'>← Previous</DatePicker.Button>
```

Navigates backward by one month when clicked.

### Next Month/Year

```tsx
<DatePicker.Button type='next'>Next →</DatePicker.Button>
```

Navigates forward by one month when clicked.

## Button Content

The `children` prop accepts any React content:

```tsx
// Text
<DatePicker.Button type='previous'>← Previous</DatePicker.Button>

// Arrows only
<DatePicker.Button type='next'>→</DatePicker.Button>

// Icon components
<DatePicker.Button type='previous'>
  <ChevronLeftIcon className='h-5 w-5' />
</DatePicker.Button>
```

## Custom Styling

Style buttons using className with Tailwind or any CSS framework:

```tsx
<DatePicker.Button
  type="previous"
  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
>
  ←
</DatePicker.Button>

<DatePicker.Button
  type="next"
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Next →
</DatePicker.Button>
```

## Accessibility

Provide descriptive labels for screen readers:

```tsx
<DatePicker.Button
  type="previous"
  aria-label="Go to previous month"
>
  ←
</DatePicker.Button>

<DatePicker.Button
  type="next"
  aria-label="Go to next month"
>
  →
</DatePicker.Button>
```

Buttons are fully keyboard accessible with **Tab** (focus) and **Enter/Space** (activate).

## Complete Example

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

function App() {
  return (
    <DatePicker.Provider type='single'>
      <DatePicker.Header className='flex items-center gap-4 p-4'>
        <DatePicker.Button
          type='previous'
          className='rounded-lg p-2 transition-colors hover:bg-gray-100'
          aria-label='Previous month'
        >
          <ChevronLeftIcon className='h-6 w-6' />
        </DatePicker.Button>

        <DatePicker.Label className='flex-1 text-center font-semibold' />

        <DatePicker.Button
          type='next'
          className='rounded-lg p-2 transition-colors hover:bg-gray-100'
          aria-label='Next month'
        >
          <ChevronRightIcon className='h-6 w-6' />
        </DatePicker.Button>
      </DatePicker.Header>

      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

## TypeScript Types

```typescript
import type { ButtonProps } from '@legeannd/react-modular-datepicker'
```
