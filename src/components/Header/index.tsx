import { useEffect, useState } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Header() {
  const { initialDate, calendarRefs, handleSetHeaderRef } = useDatePicker()
  const [date, setDate] = useState(dayjs(initialDate))
  const [monthRangeText, setMonthRangeText] = useState(dayjs.monthsShort()[date.get('M')])

  const handleChangeCalendarRange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setDate((prev) => prev.add(1, 'month'))
    } else {
      setDate((prev) => prev.subtract(1, 'month'))
    }
  }

  useEffect(() => {
    let newDate = date
    calendarRefs.forEach((ref, index) => {
      ref.updateMonthTable(newDate.toISOString())
      if (index < calendarRefs.length - 1) {
        newDate = newDate.add(1, 'month')
      }
    })
    if (newDate.isAfter(date) && newDate.diff(date, 'month') >= 1) {
      setMonthRangeText(
        `${dayjs.monthsShort()[date.get('M')]} - ${dayjs.monthsShort()[newDate.get('M')]}`
      )
    } else {
      setMonthRangeText(`${dayjs.monthsShort()[newDate.get('M')]}`)
    }
  }, [calendarRefs, date])

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.labels}>
          <span> {date.year()}</span>
          <span> {monthRangeText}</span>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.changeButton}
            onClick={() => handleChangeCalendarRange('decrease')}
          >
            <ChevronLeft />
          </button>
          <button
            className={styles.changeButton}
            onClick={() => handleChangeCalendarRange('increase')}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        className={styles.calendars}
        id='rmdp-header'
        ref={(ref) => handleSetHeaderRef(ref)}
      ></div>
    </div>
  )
}
