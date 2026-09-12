import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getWeekDays } from '../../core/week'
import { isToday } from '../../core/date'

import styles from './WeekView.module.css'

interface WeekViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  onDayClick?: (date: CalendarDate) => void
}

export function WeekView({
  date,
  firstDayOfWeek = 1,
  onDayClick,
}: WeekViewProps) {
  const days = getWeekDays(date, firstDayOfWeek)

  return (
    <div className={styles.week}>
      {days.map((day) => (
        <button
          key={day.date}
          type="button"
          className={styles.day}
          data-today={isToday(day.date)}
          onClick={() => onDayClick?.(day.date)}
        >
          {day.day}
        </button>
      ))}
    </div>
  )
}