import type { CalendarDate } from '../../types/calendar'
import { isToday, parseCalendarDate } from '../../core/date'
import styles from './DayView.module.css'
import type { ReactNode } from 'react'
import { DayCell } from '../DayCell'

interface DayViewProps {
  date: CalendarDate
  selectedDate?: CalendarDate | null
  focusedDate?: CalendarDate | null
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function DayView({
  date,
  selectedDate = null,
  focusedDate = null,
  onDayClick,
  renderDayContent
}: DayViewProps) {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return null
  }

  const day = {
    date,
    day: parsedDate.getDate(),
  }

  return (
    <div className={styles.dayView}>
      <DayCell
        day={day}
        isSelected={selectedDate === date}
        isFocused={focusedDate === date}
        isToday={isToday(date)}
        tabIndex={focusedDate === date ? 0 : -1}
        onClick={() => onDayClick?.(date)}
      >
        {renderDayContent?.(date)}
      </DayCell>
    </div>
  )
}