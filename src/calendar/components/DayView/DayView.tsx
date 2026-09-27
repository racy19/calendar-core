import type { CalendarDate } from '../../types/calendar'
import { isToday, parseCalendarDate } from '../../core/date'
import styles from './DayView.module.css'
import type { ReactNode } from 'react'
import { DayCell } from '../DayCell'

interface DayViewProps {
  date: CalendarDate
  selectedDate?: CalendarDate | null
  focusedDate?: CalendarDate | null
  tabStopDate?: CalendarDate | null
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function DayView({
  date,
  selectedDate = null,
  focusedDate = null,
  tabStopDate,
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

  const tabIndex =
            tabStopDate === undefined ||
              tabStopDate === day.date
              ? 0
              : -1

  return (
    <div className={styles.dayView}>
      <DayCell
        day={day}
        isToday={isToday(date)}
        isSelected={selectedDate === date}
        isFocused={focusedDate === date}
        tabIndex={tabIndex}
        onClick={() => onDayClick?.(date)}
      >
        {renderDayContent?.(date)}
      </DayCell>
    </div>
  )
}