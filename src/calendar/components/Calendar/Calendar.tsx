import type { CalendarView } from '../../types/calendar'
import { Toolbar } from '../Toolbar'
import styles from './Calendar.module.css'

interface CalendarProps {
  view: CalendarView
  onViewChange: (view: CalendarView) => void
}

export function Calendar({ view, onViewChange }: CalendarProps) {
  return (
    <div className={styles.calendar}>
      <Toolbar
        view={view}
        onViewChange={onViewChange}
      />

      <div>
        Calendar view: {view}
      </div>
    </div>
  )
}