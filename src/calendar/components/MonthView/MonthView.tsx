import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getMonthDays } from '../../core/month'
import { DayCell } from '../DayCell'

import styles from './MonthView.module.css'
import { isToday } from '../../core/date'

interface MonthViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
}

export function MonthView({
  date,
  firstDayOfWeek = 1,
}: MonthViewProps) {
  const days = getMonthDays(date, firstDayOfWeek)

  return (
    <div className={styles.month}>
      {days.map((day) => (
        <DayCell
          key={day.date}
          day={day}
          isToday={isToday(day.date)}
        />
      ))}
    </div>
  )
}