import type { CalendarDate } from '../../types/calendar'
import { isToday, parseCalendarDate } from '../../core/date'
import styles from './DayView.module.css'
import type { ReactNode } from 'react'
import { DayCell } from '../DayCell'

interface DayViewProps {
  date: CalendarDate
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function DayView({
  date,
  onDayClick,
  renderDayContent
}: DayViewProps) {
  const day = parseCalendarDate(date).getDate();

  return (
    <div className={styles.dayView}>
      <DayCell
        date={date}
        day={day}
        isToday={isToday(date)}
        onClick={() => onDayClick?.(date)}
      >
        {renderDayContent?.(date)}
      </DayCell>
    </div>
  )
}