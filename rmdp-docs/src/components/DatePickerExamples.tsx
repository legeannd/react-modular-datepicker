import React from 'react'
import * as DatePicker from '../../../src/main'
import { useDateSelect } from '../../../src/main'
import type { SingleSelection, RangeSelection, MultipleSelection } from '../../../src/main'
import '../../../src/styles/main.css'

// Quick Start Example
export function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = React.useState<SingleSelection>(null)

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        value={selectedDate}
        onSelectionChange={setSelectedDate}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Selected: {selectedDate ? new Date(selectedDate).toDateString() : 'None'}
      </p>
    </div>
  )
}

// Controlled State Example
export function ControlledDatePicker() {
  const [selectedDate, setSelectedDate] = React.useState<SingleSelection>(null)

  const setToday = () => {
    const today = new Date()
    setSelectedDate(today.toISOString())
  }

  const setNextWeek = () => {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    setSelectedDate(nextWeek.toISOString())
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        value={selectedDate}
        onSelectionChange={setSelectedDate}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Selected: {selectedDate ? new Date(selectedDate).toDateString() : 'None'}
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
        <button
          onClick={setToday}
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Set to Today
        </button>
        <button
          onClick={setNextWeek}
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Set to Next Week
        </button>
      </div>
    </div>
  )
}

// Navigation Example
export function NavigationDatePicker() {
  const [selectedDate, setSelectedDate] = React.useState<SingleSelection>(null)

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
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
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Selected: {selectedDate ? new Date(selectedDate).toDateString() : 'None'}
      </p>
    </div>
  )
}

// Range Selection Example
export function RangeDatePicker() {
  const [dateRange, setDateRange] = React.useState<RangeSelection>(null)

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        value={dateRange}
        onSelectionChange={setDateRange}
        type='range'
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        {dateRange ? (
          <>
            Start: {new Date(dateRange.start).toDateString()} <br />
            End: {new Date(dateRange.end).toDateString()}
          </>
        ) : (
          'No range selected'
        )}
      </p>
    </div>
  )
}

// Multiple Selection Example
export function MultipleDatePicker() {
  const [selectedDates, setSelectedDates] = React.useState<MultipleSelection>(null)

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        value={selectedDates}
        onSelectionChange={setSelectedDates}
        type='multiple'
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        {selectedDates && selectedDates.length > 0 ? (
          <>
            Selected {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''}:
            <br />
            {selectedDates.map((date) => new Date(date).toDateString()).join(', ')}
          </>
        ) : (
          'No dates selected'
        )}
      </p>
    </div>
  )
}

// Architecture Examples

// Uncontrolled Mode Example
export function UncontrolledDatePicker() {
  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        type='single'
        onSelectionChange={(date) => console.log('Selected:', date)}
      >
        <DatePicker.Calendar />
      </DatePicker.Provider>
    </div>
  )
}

// Multiple Calendars With Header Example
export function MultipleCalendarsWithHeader() {
  const [dateRange, setDateRange] = React.useState<RangeSelection>(null)

  return (
    <div style={{ maxWidth: 'auto', margin: '20px auto' }}>
      <DatePicker.Provider
        type='range'
        value={dateRange}
        onSelectionChange={setDateRange}
        initialMonth='2025-01-01'
      >
        <DatePicker.Header>
          <DatePicker.Button type='previous'>←</DatePicker.Button>
          <DatePicker.Label />
          <DatePicker.Button type='next'>→</DatePicker.Button>
        </DatePicker.Header>
        <DatePicker.Calendar />
        <DatePicker.Calendar />
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        {dateRange ? (
          <>
            Start: {new Date(dateRange.start).toDateString()} <br />
            End: {new Date(dateRange.end).toDateString()}
          </>
        ) : (
          'Select a date range across multiple months'
        )}
      </p>
    </div>
  )
}

// Multiple Calendars Without Header Example
export function MultipleCalendarsWithoutHeader() {
  const [selectedDate, setSelectedDate] = React.useState<SingleSelection>(null)

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <DatePicker.Provider
        type='single'
        value={selectedDate}
        onSelectionChange={setSelectedDate}
      >
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <DatePicker.Calendar />
          <DatePicker.Calendar />
        </div>
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Selected: {selectedDate ? new Date(selectedDate).toDateString() : 'None'}
        <br />
        <small>(All calendars show the same month without Header)</small>
      </p>
    </div>
  )
}

// Visual Grouping with groupingMode Example
export function GroupingModeExample() {
  const [dateRange, setDateRange] = React.useState<RangeSelection>(null)

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto' }}>
      <DatePicker.Provider
        type='range'
        value={dateRange}
        onSelectionChange={setDateRange}
        initialMonth='2025-01-01'
      >
        <div
          style={{
            border: '2px solid #8b5cf6',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#8b5cf6',
            }}
          >
            Header Container (with cal1 & cal2)
          </p>
          <DatePicker.Header groupingMode={['cal1', 'cal2']}>
            <DatePicker.Button type='previous'>←</DatePicker.Button>
            <DatePicker.Label />
            <DatePicker.Button type='next'>→</DatePicker.Button>
          </DatePicker.Header>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ border: '2px dashed #10b981', padding: '10px', borderRadius: '8px' }}>
            <p
              style={{
                textAlign: 'center',
                marginBottom: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#10b981',
              }}
            >
              Calendar 1 (id='cal1')
            </p>
            <DatePicker.Calendar id='cal1' />
          </div>

          <div style={{ border: '2px dashed #10b981', padding: '10px', borderRadius: '8px' }}>
            <p
              style={{
                textAlign: 'center',
                marginBottom: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#10b981',
              }}
            >
              Calendar 2 (id='cal2')
            </p>
            <DatePicker.Calendar id='cal2' />
          </div>

          <div style={{ border: '2px dashed #f59e0b', padding: '10px', borderRadius: '8px' }}>
            <p
              style={{
                textAlign: 'center',
                marginBottom: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#f59e0b',
              }}
            >
              Calendar 3 (id='cal3')
            </p>
            <DatePicker.Calendar id='cal3' />
          </div>
        </div>
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>
        {dateRange ? (
          <>
            Start: {new Date(dateRange.start).toDateString()} <br />
            End: {new Date(dateRange.end).toDateString()}
          </>
        ) : (
          <>Cal1 & Cal2 render in Header (green). Cal3 stays below (orange).</>
        )}
      </p>
    </div>
  )
}

// Month/Year Selector Component using useDateSelect hook
function MonthYearSelector() {
  const { months, currentMonth, years, currentYear, onMonthChange, onYearChange } = useDateSelect()

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
      <select
        value={currentMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      >
        {months.map((month, index) => (
          <option
            key={month}
            value={index}
          >
            {month}
          </option>
        ))}
      </select>

      <select
        value={currentYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      >
        {years.map((year) => (
          <option
            key={year}
            value={year}
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

// Custom Hooks Example - useDateSelect
export function CustomHooksExample() {
  const [selectedDate, setSelectedDate] = React.useState<SingleSelection>(null)

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <DatePicker.Provider
        type='single'
        value={selectedDate}
        onSelectionChange={setSelectedDate}
      >
        <DatePicker.Header>
          <MonthYearSelector />
        </DatePicker.Header>
        <DatePicker.Calendar />
      </DatePicker.Provider>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Selected: {selectedDate ? new Date(selectedDate).toDateString() : 'None'}
      </p>
    </div>
  )
}
