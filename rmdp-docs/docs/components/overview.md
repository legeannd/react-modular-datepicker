# Components Overview

React Modular DatePicker provides five core components that you can compose to build your datepicker UI.

## DatePickerProvider

The root component that manages state and coordinates all child components.

**Required for:** All use cases

```tsx
<DatePickerProvider
  type='single'
  value={selectedDate}
  onSelectionChange={setSelectedDate}
>
  {/* Other components */}
</DatePickerProvider>
```

## Calendar

The calendar grid showing days of the month.

**Required for:** All use cases

```tsx
<Calendar
  className='my-calendar'
  weekdaysContainerClassName='weekdays'
  daysContainerClassName='days'
  dayButtonClassNames={{
    base: 'day',
    selected: 'selected',
    // ... more states
  }}
/>
```

## Header

Container for navigation controls. Coordinates all Calendar components to show consecutive months.

**Required for:** Multi-calendar views and month/year navigation

```tsx
<Header className='nav-header'>
  <Button type='previous'>←</Button>
  <Label />
  <Button type='next'>→</Button>
</Header>
```

## Button

Previous/next month navigation buttons.

**Required for:** Month navigation

```tsx
<Button type="previous" className="nav-btn">
  ← Previous
</Button>

<Button type="next" className="nav-btn">
  Next →
</Button>
```

## Label

Displays current month/year. Automatically shows ranges when multiple calendars present.

**Required for:** Showing current month

```tsx
{/* Single calendar */}
<Label /> {/* "January 2025" */}

{/* Multiple calendars */}
<Label /> {/* "January - March 2025" */}

{/* Custom render */}
<Label>
  {({ start, end }) => (
    <h2>
      {start.month} {start.year}
      {end.month !== start.month && ` - ${end.month} ${end.year}`}
    </h2>
  )}
</Label>
```

## Component Relationships

```
DatePickerProvider (required)
│
├── Header (optional, enables multi-calendar coordination and navigation)
│   ├── Button type="previous" (optional)
│   ├── Label (optional)
│   └── Button type="next" (optional)
│
└── Calendar (required, can have multiple)
```

**Note:** Button and Label components can be used outside the Header, but the Header is required for:

- Multi-calendar views (to show consecutive months)
- Month/year navigation functionality
- Using the `useDateSelect` hook
