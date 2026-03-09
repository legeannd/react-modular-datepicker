# [React Modular DatePicker](https://legeannd.github.io/react-modular-datepicker/)

A modern, lightweight, composable datepicker library for React applications. Built with TypeScript, React 19, and CSS Modules.

<p align="center">
  <img src="public/default.png" alt="React Modular DatePicker" width="400" />
</p>

[![npm version](https://img.shields.io/npm/v/@legeannd/react-modular-datepicker)](https://www.npmjs.com/package/@legeannd/react-modular-datepicker)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://6906e222e254283f6ff8fd07-bifeswhdfq.chromatic.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**[📚 View Live Examples →](https://6906e222e254283f6ff8fd07-bifeswhdfq.chromatic.com/)**  
**[📝 Read the Docs →](https://legeannd.github.io/react-modular-datepicker/)**

## Features

- **Modular Architecture** - Compose components to build any layout
- **Highly Customizable** - Full styling control via CSS classes and custom properties
- **Internationalization** - Day.js-powered localization support
- **Multiple Selection Modes** - Single, multiple, and range selection
- **Controlled & Uncontrolled** - Flexible state management
- **React Compiler Optimized** - Built for performance with React's compiler
- **TypeScript First** - Full type safety and IntelliSense

## Installation

```bash
npm install @legeannd/react-modular-datepicker
# or
pnpm add @legeannd/react-modular-datepicker
```

**Peer Dependencies:** React 19+, Day.js

## Quick Start

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider
      type='single'
      onSelectionChange={(date) => console.log(date)}
    >
      <DatePicker.Header>
        <DatePicker.Button type='previous'>←</DatePicker.Button>
        <DatePicker.Label />
        <DatePicker.Button type='next'>→</DatePicker.Button>
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

Components can also be imported individually:

```tsx
import { DatePickerProvider, Calendar } from '@legeannd/react-modular-datepicker'
```

## Components

| Component  | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| `Provider` | Root component — manages state, selection mode, disabled dates, and localization |
| `Calendar` | Calendar grid with granular day-button state classes                             |
| `Header`   | Navigation container; coordinates multiple calendars via React Portals           |
| `Button`   | Previous/next month navigation; accepts any content (text, icons)                |
| `Label`    | Month/year display; auto-shows a range label when multiple calendars are present |

For full prop references see the [API docs →](https://legeannd.github.io/react-modular-datepicker/)

## What's Possible

- **Range & multi-month selection** — add multiple `<DatePicker.Calendar />` inside one `Provider` with a `Header` and they automatically display consecutive months with shared navigation.
- **Localization** — pass a custom Day.js instance with any locale to `Provider`'s `dayjs` prop.
- **Custom styling** — use `className` props and `dayButtonClassNames` on every component, or override CSS variables (`--color-selected`, `--color-primary`, `--radius`, …).
- **Custom month/year navigation** — the `useDateSelect` hook provides locale-aware month/year lists and change handlers for building dropdown pickers.

<p align="center">
  <img src="public/withHeader.png" alt="DatePicker with Header Example" width="600" />
</p>

## Development

```bash
git clone https://github.com/legeannd/react-modular-datepicker.git
cd react-modular-datepicker
pnpm install
pnpm storybook  # Interactive docs at http://localhost:6006
pnpm test       # Run tests
pnpm build      # Build library
```

## License

MIT © [legeannd](https://github.com/legeannd)
