# Calendar

Displays the calendar grid with date selection.

## Live Demo

**[→ Try the interactive demo in Storybook](https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com/?path=/story/components-calendar--default)**

See live examples with different configurations and styling options.

## Import

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
;<DatePicker.Calendar />
```

## Basic Usage

```tsx
<DatePicker.Provider type='single'>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Props

| Prop                         | Type                  | Default     | Description                                           |
| ---------------------------- | --------------------- | ----------- | ----------------------------------------------------- |
| `id`                         | `string`              | `undefined` | Calendar identifier for Header grouping               |
| `showWeekdays`               | `boolean`             | `true`      | Show weekday headers (Sun, Mon, Tue...)               |
| `weekdayLabels`              | `string[]`            | `undefined` | Custom weekday labels (7 items, starting with Sunday) |
| `weekdaysContainerClassName` | `string`              | `undefined` | CSS classes for weekday labels container              |
| `weekdayClassName`           | `string`              | `undefined` | CSS classes for individual weekday labels             |
| `daysContainerClassName`     | `string`              | `undefined` | CSS classes for days grid container                   |
| `dayButtonClassNames`        | `DayButtonClassNames` | `{}`        | Granular day button styling                           |
| `footerSlot`                 | `function`            | `undefined` | Render prop for custom footer                         |
| `className`                  | `string`              | `undefined` | Calendar container CSS classes                        |

## Weekday Customization

### Hide Weekdays

```tsx
<DatePicker.Calendar showWeekdays={false} />
```

### Custom Weekday Labels

```tsx
<DatePicker.Calendar weekdayLabels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']} />
```

Only the first 7 items are used (Sunday through Saturday). Extra items are ignored.

### Style Weekdays

```tsx
<DatePicker.Calendar
  weekdaysContainerClassName='flex justify-around mb-2 border-b pb-2'
  weekdayClassName='text-xs font-semibold text-gray-600 uppercase'
/>
```

## Day Button Styling

Granular control over day button states:

```tsx
<DatePicker.Calendar
  dayButtonClassNames={{
    base: 'rounded-full aspect-square transition-colors',
    selected: 'bg-blue-600 text-white',
    today: 'font-bold text-blue-600 ring-2 ring-blue-500',
    weekend: 'text-red-600',
    disabled: 'opacity-50 cursor-not-allowed line-through',
    hovered: 'bg-gray-100',
    differentMonth: 'text-gray-400',
    monthBoundary: 'font-semibold',
    rangeStart: 'bg-blue-700 text-white rounded-l-full',
    rangeEnd: 'bg-blue-700 text-white rounded-r-full',
    betweenRange: 'bg-blue-100 rounded-none',
    disabledInRange: 'bg-gray-100 opacity-50 line-through',
  }}
/>
```

### Available States

| State             | Description                           | When Applied                                        |
| ----------------- | ------------------------------------- | --------------------------------------------------- |
| `base`            | Foundation styles for all day buttons | Always                                              |
| `selected`        | Selected dates                        | When date is selected                               |
| `today`           | Current date (today)                  | Current date, suppressed when in range              |
| `weekend`         | Weekend days (Sat/Sun)                | Weekends, suppressed when hovered/selected/in range |
| `disabled`        | Disabled dates                        | Always visible, overrides all states                |
| `hovered`         | Hovered state                         | Only when not selected or in range                  |
| `differentMonth`  | Prev/next month dates                 | Dates from adjacent months                          |
| `monthBoundary`   | First/last day of month               | Regardless of other states                          |
| `rangeStart`      | Range start date                      | Range mode only                                     |
| `rangeEnd`        | Range end date                        | Range mode only                                     |
| `betweenRange`    | Dates between start/end               | Range mode only, suppresses weekend/today           |
| `disabledInRange` | Disabled dates in a range             | Range mode only                                     |

### State Priority

States are applied with the following priority (highest to lowest):

1. `disabled` - Always visible
2. `disabledInRange` - Disabled dates within a range
3. `selected` - Overrides hover, weekend, today
4. `rangeStart` / `rangeEnd` - Range mode
5. `betweenRange` - Range mode, suppresses weekend/today
6. `hovered` - When not selected/in range
7. `today` - Suppressed when in betweenRange
8. `weekend` - Suppressed when hovered/selected/in range
9. `differentMonth` - Always visible unless selected
10. `monthBoundary` - Always visible

## Custom Footer

Add custom content below the calendar grid:

```tsx
<DatePicker.Calendar
  footerSlot={({ currentDate }) => (
    <div className='mt-4 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-3'>
      <p className='text-center text-sm font-medium text-gray-700'>
        📅 {currentDate.format('MMMM YYYY')}
      </p>
      <p className='mt-1 text-center text-xs text-gray-500'>
        {currentDate.format('dddd')}s are highlighted
      </p>
    </div>
  )}
/>
```

The `footerSlot` receives:

- `currentDate` - Day.js instance of the current calendar month

## Calendar Grouping with ID

When using multiple calendars with a Header, use `id` for selective grouping:

```tsx
<DatePicker.Provider type='range'>
  <DatePicker.Header groupingMode={['cal1', 'cal2']}>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar id='cal1' /> {/* Renders inside Header */}
  <DatePicker.Calendar id='cal2' /> {/* Renders inside Header */}
  <DatePicker.Calendar id='cal3' /> {/* Renders separately */}
</DatePicker.Provider>
```

See [Header Component](/docs/components/header) for more on grouping.

## Complete Example

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
;<DatePicker.Provider type='single'>
  <DatePicker.Calendar
    className='rounded-lg bg-white p-4 shadow-md'
    showWeekdays={true}
    weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
    weekdaysContainerClassName='border-b'
    weekdayClassName='text-gray-500 font-medium'
    daysContainerClassName='grid grid-cols-7 gap-1'
    dayButtonClassNames={{
      base: 'h-10 w-10 rounded-full',
      selected: 'bg-blue-600 text-white',
      today: 'border border-blue-600',
    }}
  />
</DatePicker.Provider>
```

## TypeScript Types

```typescript
import type { CalendarProps, DayButtonClassNames } from '@legeannd/react-modular-datepicker'
```
