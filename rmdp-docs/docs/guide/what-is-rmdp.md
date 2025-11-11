# What is React Modular DatePicker?

React Modular DatePicker is a modern, composable datepicker library designed to give you complete control over your date selection UI.

## Why Another DatePicker?

Most datepicker libraries force you into a specific UI structure. You get a monolithic component that's difficult to customize, and you're stuck with their design decisions.

React Modular DatePicker takes a different approach:

### 🧩 **Composable Components**

Instead of one massive component, you get building blocks:

- **`DatePickerProvider`** - Context wrapper for state management
- **`Calendar`** - The calendar grid
- **`Header`** - Month/year navigation
- **`Button`** - Previous/next month buttons
- **`Label`** - Month/year display

Mix and match these components to build exactly what you need.

### 🎨 **Style Your Way**

Every component accepts `className` props for every part:

```tsx
<Calendar
  className='custom-calendar'
  weekdaysContainerClassName='custom-weekdays'
  weekdayClassName='custom-weekday'
  daysContainerClassName='custom-days'
  dayButtonClassNames={{
    base: 'custom-day',
    selected: 'custom-selected',
    inRange: 'custom-in-range',
    // ... 9 more states
  }}
/>
```

Or use CSS variables to theme globally:

```css
:root {
  --color-primary: #09090b;
  --color-selected: #18181b;
  --color-hover: #f4f4f5;
  --spacing-4: 1rem;
  --radius-lg: 0.5rem;
}
```

### ⚡ **Modern React**

Built for React 19 with the React Compiler. This means:

- Automatic performance optimizations
- No manual `useMemo` or `useCallback`
- Smaller bundle size
- Better runtime performance

### 🌍 **True Internationalization**

Powered by Day.js, not just translated strings. You get:

- Automatic first day of week (Sunday/Monday based on locale)
- Locale-aware month/day names
- Number formatting
- Date formatting

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const portugueseDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('pt-br')

<DatePickerProvider dayjs={portugueseDayjs}>
  {/* Calendar now in Portuguese */}
</DatePickerProvider>
```

## What Can You Build?

- Single date pickers
- Date range selectors
- Multiple date selection
- Month/year dropdowns
- Inline calendars
- Popup calendars (with your favorite tooltip library)
- Calendar widgets for dashboards
- Custom navigation UIs

## Design Principles

1. **Composition over Configuration** - Small, focused components that do one thing well
2. **Flexibility over Convenience** - Give you the tools, not force the structure
3. **TypeScript First** - Full type safety and IntelliSense
4. **Performance Minded** - Leverages React 19's compiler for automatic optimization
5. **Accessible by Default** - Semantic HTML and proper ARIA attributes

## Learn More

- [Storybook](https://6906e222e254283f6ff8fd07-bifeswhdfq.chromatic.com/) - Interactive playground
