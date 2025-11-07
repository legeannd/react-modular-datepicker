# Controlled vs Uncontrolled

React Modular DatePicker supports both controlled and uncontrolled modes, following React's standard form component patterns.

## Uncontrolled Mode

In uncontrolled mode, the Provider manages the state internally. You don't need to manage state yourself.

### Basic Uncontrolled

The simplest way to use the datepicker:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider type='single'>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

The Provider handles all state internally. You can still access the selected value through callbacks.

### Uncontrolled with Callback

Read the selected value when it changes:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'

function App() {
  const handleChange = (date: SingleSelection) => {
    console.log('Selected:', date)
    // Send to API, update URL, etc.
  }

  return (
    <DatePicker.Provider
      type='single'
      onSelectionChange={handleChange}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Default Selected Value

Provide an initial value for uncontrolled mode:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider
      type='single'
      defaultSelected={{ days: ['2025-01-15'] }}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

**Important:** `defaultSelected` only sets the **initial** value. After mount, the Provider manages the state.

## Controlled Mode

In controlled mode, you manage the state and pass it to the Provider. This gives you full control over the selection.

### Basic Controlled

Manage state with `useState`:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<SingleSelection>(null)

  return (
    <div>
      <DatePicker.Provider
        type='single'
        value={date}
        onSelectionChange={setDate}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>

      {date && <p>Selected: {date}</p>}
    </div>
  )
}
```

### Controlled Range

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { RangeSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [range, setRange] = useState<RangeSelection>(null)

  return (
    <div>
      <DatePicker.Provider
        type='range'
        value={range}
        onSelectionChange={setRange}
      >
        <DatePicker.Header>
          <DatePicker.Button type='previous'>←</DatePicker.Button>
          <DatePicker.Label />
          <DatePicker.Button type='next'>→</DatePicker.Button>
        </DatePicker.Header>
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </DatePicker.Provider>

      {range && (
        <p>
          Range: {range.start} to {range.end}
        </p>
      )}
    </div>
  )
}
```

### Controlled Multiple

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { MultipleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [dates, setDates] = useState<MultipleSelection>(null)

  return (
    <div>
      <DatePicker.Provider
        type='multiple'
        value={dates}
        onSelectionChange={setDates}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>

      {dates && <p>Selected {dates.length} date(s)</p>}
    </div>
  )
}
```

## When to Use Each Mode

### Use Uncontrolled When:

- **Simple forms** - Just need to read the value on submit
- **No validation** - Don't need to validate or transform the value
- **No derived state** - Don't need to compute anything from the selected date
- **Minimal code** - Want the simplest implementation

### Use Controlled When:

- **Complex validation** - Need to validate date selections
- **State synchronization** - Need to sync with URL, localStorage, or server state
- **Derived values** - Need to compute something from the selected date
- **External control** - Need to programmatically set or clear the selection
- **Form integration** - Integrating with form libraries like React Hook Form

## Advanced Controlled Patterns

### Validation

Validate selections before accepting them:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { RangeSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [range, setRange] = useState<RangeSelection>(null)

  const handleChange = (newRange: RangeSelection) => {
    if (!newRange) {
      setRange(null)
      return
    }

    const start = new Date(newRange.start)
    const end = new Date(newRange.end)
    const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    // Only allow ranges up to 30 days
    if (daysDiff <= 30) {
      setRange(newRange)
    } else {
      alert('Please select a range of 30 days or less')
    }
  }

  return (
    <DatePicker.Provider
      type='range'
      value={range}
      onSelectionChange={handleChange}
    >
      <DatePicker.Calendar />
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Programmatic Control

Control the selection with external buttons:

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<SingleSelection>(null)

  const setToday = () => {
    const today = new Date().toISOString()
    setDate(today)
  }

  return (
    <div>
      <div>
        <button onClick={setToday}>Today</button>
        <button onClick={() => setDate(null)}>Clear</button>
      </div>

      <DatePicker.Provider
        type='single'
        value={date}
        onSelectionChange={setDate}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
    </div>
  )
}
```
