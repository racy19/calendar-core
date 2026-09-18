import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getWeekDays } from '../../core/week'
import { isToday } from '../../core/date'

import styles from './WeekView.module.css'
import { DayCell } from '../DayCell'
import type { ReactNode } from 'react'

interface WeekViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function WeekView({
  date,
  firstDayOfWeek = 1,
  onDayClick,
  renderDayContent
}: WeekViewProps) {
  const days = getWeekDays(date, firstDayOfWeek)

  return (
    <div className={styles.week}>
      {days.map((day) => (
          <DayCell
            key={day.date}
            date={day.date}
            day={day.day}
            isToday={isToday(day.date)}
            onClick={() => onDayClick?.(day.date)}
          >
            {renderDayContent?.(day.date)}
          </DayCell>
      ))}
    </div>
  )
}