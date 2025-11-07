# Basic Usage

The simplest datepicker implementations.

## Single Date Selection

Select one date at a time.

**Controlled:**

```tsx
import { useState } from 'react'
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'

function App() {
  const [selectedDate, setSelectedDate] = useState<SingleSelection>(null)

  return (
    <div>
      <DatePicker.Provider
        value={selectedDate}
        onSelectionChange={setSelectedDate}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>

      <p>Selected: {selectedDate || 'None'}</p>
    </div>
  )
}
```

**Uncontrolled:**

```tsx
import * as DatePicker from '@legeannd/react-modular-datepicker'

function App() {
  return (
    <DatePicker.Provider onSelectionChange={(date) => console.log('Selected:', date)}>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

## With Navigation

Add month/year controls.

```tsx
import { useState } from 'react'
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'

function App() {
  const [selectedDate, setSelectedDate] = useState<SingleSelection>(null)

  return (
    <DatePicker.Provider
      value={selectedDate}
      onSelectionChange={setSelectedDate}
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

## Default Selected Date

Pre-select a date on mount.

```tsx
import { useState } from 'react'
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import dayjs from 'dayjs'

function App() {
  // Default to today
  const [selectedDate, setSelectedDate] = useState<SingleSelection>(dayjs().toISOString())

  return (
    <DatePicker.Provider
      value={selectedDate}
      onSelectionChange={setSelectedDate}
    >
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}
```

### Popup (With Radix UI Popover)

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import * as DatePicker from '@legeannd/react-modular-datepicker'
import type { SingleSelection } from '@legeannd/react-modular-datepicker'
import { useState } from 'react'
import dayjs from 'dayjs'

function App() {
  const [selectedDate, setSelectedDate] = useState<SingleSelection>(null)

  return (
    <Popover>
      <PopoverTrigger>
        {selectedDate ? dayjs(selectedDate).format('MMM D, YYYY') : 'Select date'}
      </PopoverTrigger>

      <PopoverContent>
        <DatePicker.Provider
          value={selectedDate}
          onSelectionChange={setSelectedDate}
        >
          <DatePicker.Header>
            <DatePicker.Button type='previous'>←</DatePicker.Button>
            <DatePicker.Label />
            <DatePicker.Button type='next'>→</DatePicker.Button>
          </DatePicker.Header>
          <DatePicker.Calendar />
        </DatePicker.Provider>
      </PopoverContent>
    </Popover>
  )
}
```
