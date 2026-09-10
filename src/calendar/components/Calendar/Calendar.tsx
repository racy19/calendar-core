import { getToday } from '../../core/date'
import { getNextDate, getPreviousDate } from '../../core/navigation'
import type { CalendarDate, CalendarView } from '../../types/calendar'
import { Toolbar } from '../Toolbar'
import styles from './Calendar.module.css'

interface CalendarProps {
  view: CalendarView
  date: CalendarDate
  onViewChange: (view: CalendarView) => void
  onDateChange: (date: CalendarDate) => void
}

export function Calendar({ view, date, onViewChange, onDateChange }: CalendarProps) {
  return (
    <div className={styles.calendar}>
<Toolbar
  view={view}
  onViewChange={onViewChange}
  onPrevious={() => onDateChange(getPreviousDate(date, view))}
  onToday={() => onDateChange(getToday())}
  onNext={() => onDateChange(getNextDate(date, view))}
/>

      <div>
        <p>Calendar view: {view}</p>
        <p>Calendar date: {date}</p>
      </div>
    </div>
  )
}