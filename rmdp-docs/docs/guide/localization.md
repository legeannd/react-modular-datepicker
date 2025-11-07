# Localization

React Modular DatePicker uses Day.js for date formatting and localization, making it easy to support multiple languages.

## Default Behavior

By default, the calendar uses English (en) locale:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

// Displays in English
;<DatePicker.Provider type='single'>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Custom Day.js Instance

Provide a custom Day.js instance with your desired locale:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

// Required plugins
dayjs.extend(localeData)
dayjs.extend(isToday)

// Create a factory function with the locale
const portugueseDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('pt-br')

function App() {
  return (
    <DatePicker.Provider
      type='single'
      dayjs={portugueseDayjs}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

**Important:** The `dayjs` prop must be a **factory function** that returns a Day.js instance, not a Day.js instance directly.

## Required Plugins

When creating a custom Day.js instance, you **must** extend these plugins:

```tsx
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData) // Required for month/weekday names
dayjs.extend(isToday) // Required for today highlighting
```

## Supported Locales

Day.js supports 100+ locales. Import the ones you need:

```tsx
import 'dayjs/locale/es' // Spanish
import 'dayjs/locale/fr' // French
import 'dayjs/locale/de' // German
import 'dayjs/locale/ja' // Japanese
import 'dayjs/locale/zh-cn' // Chinese (Simplified)
import 'dayjs/locale/ar' // Arabic
import 'dayjs/locale/ru' // Russian
// ... and many more
```

See the [full list of locales](https://day.js.org/docs/en/i18n/i18n).

## Common Localization Examples

### Spanish

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
    <DatePicker.Button type="previous">←</DatePicker.Button>
    <DatePicker.Label /> {/* Shows "enero 2025" */}
    <DatePicker.Button type="next">→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### French

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const frenchDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('fr')

<DatePicker.Provider type="single" dayjs={frenchDayjs}>
  <DatePicker.Header>
    <DatePicker.Button type="previous">←</DatePicker.Button>
    <DatePicker.Label /> {/* Shows "janvier 2025" */}
    <DatePicker.Button type="next">→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

### Japanese

```tsx
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

const japaneseDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale('ja')

<DatePicker.Provider type="single" dayjs={japaneseDayjs}>
  <DatePicker.Header>
    <DatePicker.Button type="previous">←</DatePicker.Button>
    <DatePicker.Label /> {/* Shows "1月 2025" */}
    <DatePicker.Button type="next">→</DatePicker.Button>
  </DatePicker.Header>
  <DatePicker.Calendar />
</DatePicker.Provider>
```

## Custom Weekday Labels

Override the weekday headers with custom labels:

```tsx
<DatePicker.Calendar weekdayLabels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']} />
```

The array must have exactly 7 items, starting with Sunday.

## Dynamic Locale Switching

Allow users to switch locales:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'
import { useState } from 'react'

dayjs.extend(localeData)
dayjs.extend(isToday)

function App() {
  const [locale, setLocale] = useState('en')

  const localizedDayjs = (date?: dayjs.ConfigType) => dayjs(date).locale(locale)

  return (
    <div>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        <option value='en'>English</option>
        <option value='es'>Español</option>
        <option value='fr'>Français</option>
      </select>

      <DatePicker.Provider
        type='single'
        dayjs={localizedDayjs}
      >
        <DatePicker.Header>
          <DatePicker.Button type='previous'>←</DatePicker.Button>
          <DatePicker.Label />
          <DatePicker.Button type='next'>→</DatePicker.Button>
        </DatePicker.Header>
        <DatePicker.Calendar />
      </DatePicker.Provider>
    </div>
  )
}
```

## Additional Resources

- [Day.js Documentation](https://day.js.org/docs/en/installation/installation) - Learn more about Day.js
- [Day.js i18n](https://day.js.org/docs/en/i18n/i18n) - Complete locale guide
