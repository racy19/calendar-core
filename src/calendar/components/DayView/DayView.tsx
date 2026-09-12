import type { CalendarDate } from '../../types/calendar'
import { isToday } from '../../core/date'

import styles from './DayView.module.css'

interface DayViewProps {
  date: CalendarDate
  onDayClick?: (date: CalendarDate) => void
}

export function DayView({
  date,
  onDayClick,
}: DayViewProps) {
  return (
    <button
      type="button"
      className={styles.day}
      data-today={isToday(date)}
      onClick={() => onDayClick?.(date)}
    >
      {date}
    </button>
  )
}