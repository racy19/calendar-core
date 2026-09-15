import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getMonthDays } from '../../core/month'
import { DayCell } from '../DayCell'

import styles from './MonthView.module.css'
import { isToday } from '../../core/date'
import { WeekdayHeader } from '../WeekdayHeader'

interface MonthViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  locale?: string
  onDayClick?: (date: CalendarDate) => void
}

export function MonthView({
  date,
  firstDayOfWeek = 1,
  locale,
  onDayClick
}: MonthViewProps) {
  const days = getMonthDays(date, firstDayOfWeek)

return (
  <div>
    <WeekdayHeader
      firstDayOfWeek={firstDayOfWeek}
      locale={locale}
    />

    <div className={styles.month}>
      {days.map((day) => (
        <DayCell
          key={day.date}
          day={day}
          isToday={isToday(day.date)}
          onClick={() => onDayClick?.(day.date)}
        />
      ))}
    </div>
  </div>
)
}