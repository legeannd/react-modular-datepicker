# Performance

React Modular DatePicker is built for performance with minimal bundle size and optimized rendering.

## Built-in Optimizations

### CSS Modules with Automatic Injection

The library uses CSS Modules with automatic style injection:

- **Zero Configuration** - Styles are automatically injected when components are used
- **No Duplication** - Styles are only loaded once, even with multiple calendars
- **Tree-Shakeable** - Unused components don't include their styles

### Minimal Re-renders

The library is designed to minimize re-renders:

- **Context Optimization** - Provider context only updates when selection changes
- **Isolated Components** - Components only re-render when their props change
- **Calendar Registration** - Calendars register once on mount, unregister on unmount

### Lightweight Dependencies

The library has minimal dependencies:

- **clsx** (~500 bytes) - For conditional class names
- **Day.js** (peer dependency) - Modular date library
- **React 19** (peer dependency) - Latest React optimizations

**Total bundle size: ~25KB** (minified, with peer dependencies externalized)

## React 19 Compiler

This library is optimized for React 19's automatic compiler, which provides automatic memoization and smart re-renders without manual optimization.

See the [React Compiler Documentation](https://react.dev/learn/react-compiler) for setup instructions.

## Performance Tips

### Memoize Custom Day.js Instances

Create Day.js instances outside components to avoid recreation on every render:

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

// ✅ Created once
const spanishDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('es')

function App() {
  return (
    <DatePicker.Provider
      type='single'
      dayjs={spanishDayjs}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

For dynamic locales, use `useMemo`:

```tsx
import { useMemo, useState } from 'react'

function App() {
  const [locale, setLocale] = useState('en')

  const localizedDayjs = useMemo(
    () => (date?: dayjs.ConfigType) => dayjs(date).locale(locale),
    [locale]
  )

  return (
    <DatePicker.Provider
      type='single'
      dayjs={localizedDayjs}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Limit Number of Calendars

Each calendar renders a full month grid (typically 35-42 day buttons). For best performance:

- **Single selection** - 1 calendar
- **Range selection** - 2-3 calendars
- **Year view** - Avoid rendering more than 6 calendars simultaneously

```tsx
// ✅ Recommended - 2 calendars for range selection
<DatePicker.Provider type='range'>
  <DatePicker.Header>
    <DatePicker.Button type='previous'>←</DatePicker.Button>
    <DatePicker.Label />
    <DatePicker.Button type='next'>→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Use CSS Variables for Theming

CSS variables are more performant than inline styles and allow dynamic theming:

```tsx
<div style={{ '--color-primary': '#3b82f6' } as React.CSSProperties}>
  <DatePicker.Provider type='single'>
    <DatePicker.Calendar />
  </DatePicker.Provider>
</div>
```
