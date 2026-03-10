# Accessibility

React Modular DatePicker is built to be fully usable by keyboard and screen reader users. This page describes the patterns implemented and what they mean for your users.

## ARIA Grid Pattern

The `<Calendar>` component renders as an ARIA `grid` composite widget — the correct role for a 2D table of interactive cells. The full structure looks like this:

```text
role="grid"  aria-label="March, 2026"
  role="row"                             ← weekday header row (showWeekdays)
    role="columnheader" aria-label="Sunday"
    role="columnheader" aria-label="Monday"
    …
  role="rowgroup"
    role="row"                           ← one per week
      <button tabIndex={0|-1} aria-label="March 9, 2026" …>
```

A `grid` is preferred over a plain `table` because it contains **interactive** cells (focusable buttons), and over a `listbox` because it is two-dimensional. This follows the [ARIA Authoring Practices Guide — Date Picker Dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/).

## Keyboard Navigation

### Standalone calendar (no `<Header>`)

| Key                        | Behavior                                   |
| -------------------------- | ------------------------------------------ |
| `ArrowRight` / `ArrowLeft` | ±1 day                                     |
| `ArrowDown` / `ArrowUp`    | ±7 days (next/prev week)                   |
| `Home`                     | First day of current week                  |
| `End`                      | Last day of current week                   |
| `PageDown`                 | +1 month                                   |
| `PageUp`                   | −1 month                                   |
| `Shift + PageDown`         | +1 year                                    |
| `Shift + PageUp`           | −1 year                                    |
| `Enter` / `Space`          | Select focused day                         |
| `Escape`                   | Propagates to parent (for closing dialogs) |
| `Tab`                      | Exits the grid entirely                    |

When an arrow key crosses a month boundary the calendar re-renders to the new month automatically, keeping the focused day visible.

### Multi-calendar mode (with `<Header>`)

All navigation keys work in header mode. When multiple calendars are rendered together, the calendar set is aware of which months are already visible:

- **Target month is already rendered** — focus moves directly to the target day in the already-visible grid. No re-render.
- **Target month is not rendered** — the entire calendar set slides forward or backward to bring the target month into view, then focus lands on the target day.

This applies to all navigation — `PageDown`, `PageUp`, `Shift+PageDown`, `Shift+PageUp`, and arrow keys that cross a month boundary. Pressing `ArrowRight` on the last day of March, for example, moves focus to April 1 in the adjacent grid without any extra key press.

## Roving `tabIndex`

Only one day button ever has `tabIndex=0`; all others have `tabIndex=-1`. This is the [roving tabIndex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) pattern required for composite widgets:

- `Tab` enters the grid and lands on the currently focused day.
- `Tab` again exits the grid to the next focusable element in the page.
- Arrow keys move within the grid without affecting the page's tab sequence.

The `focusedDay` state in `DatePickerProvider` tracks which date holds the `tabIndex=0`. It is initialized to the first day of `initialMonth` and updated by keyboard events, mouse clicks, and programmatic selection changes.

## Day Button ARIA Attributes

Each day button carries the following attributes:

| Attribute         | When set                          | Value                                                                                |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| `aria-label`      | Always                            | Full date, e.g. `"March 9, 2026"`                                                    |
| `aria-selected`   | Selection modes                   | `true` when visually selected                                                        |
| `aria-current`    | Today only                        | `"date"`                                                                             |
| `aria-pressed`    | `type="multiple"` only            | Mirrors `aria-selected` for toggle semantics                                         |
| `aria-disabled`   | Disabled date **inside a range**  | `"true"` — keeps the button focusable so screen readers can announce the obstruction |
| `disabled` (HTML) | Disabled date **outside a range** | Removes the button from tab order entirely                                           |

The distinction between `aria-disabled` and HTML `disabled` is intentional. A date that is disabled but falls inside a selected range should still be reachable by keyboard so the user understands why the range cannot be completed.

The visible label is just the day number (e.g. `9`). Without `aria-label`, a screen reader would announce that bare number with no date context. The full `"March 9, 2026"` format respects the active Day.js locale for the month name.

## Navigation Header

The `<Header>` renders with `role="navigation"` and `aria-label="Calendar navigation"`.

### `<Button>`

When the button contains a non-text child (typically an icon), a default `aria-label` is auto-applied — `"Next month"` or `"Previous month"`. A custom `aria-label` prop overrides it. This ensures icon-only buttons are not announced as unlabeled.

```tsx
;<DatePicker.Button type='next'>→</DatePicker.Button>
{
  /* aria-label="Next month" applied automatically */
}

;<DatePicker.Button
  type='next'
  aria-label='Nächster Monat'
>
  →
</DatePicker.Button>
{
  /* custom label overrides default */
}
```

### `<Label>`

```tsx
<span
  aria-live='polite'
  aria-atomic='true'
  aria-label='March to April of 2026'
>
  Mar - Apr 2026
</span>
```

- `aria-live="polite"` — announces the updated month range after every prev/next navigation without interrupting ongoing speech.
- `aria-atomic="true"` — ensures the entire label is re-read as a unit, not just the changed characters.
- `aria-label` — the full, unabbreviated form ("March to April of 2026") for screen readers, while the visible text can use short month names ("Mar - Apr 2026").

## Range Selection Announcements

The library deliberately does **not** provide a built-in live region for range selection state. This is intentional:

- The correct announcement text depends on the app's language and tone.
- Consumers already receive the current selection via `onSelectionChange`.

To implement your own:

```tsx
const [announcement, setAnnouncement] = useState('')

<DatePicker.Provider
  type="range"
  onSelectionChange={(range) => {
    if (!range) return setAnnouncement('')
    setAnnouncement(
      range.end
        ? `Selected range: ${range.start} to ${range.end}.`
        : `Start date: ${range.start}. Select end date.`
    )
  }}
>
  ...
</DatePicker.Provider>

{/* Place this anywhere in the document */}
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {announcement}
</div>
```
