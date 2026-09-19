import type { ReactNode } from 'react'
import type { CalendarDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: CalendarDay
  isToday?: boolean
  isCurrentMonth?: boolean
  children?: ReactNode
  onClick?: () => void
}

export function DayCell({
  day,
  isToday = false,
  isCurrentMonth = true,
  children,
  onClick,
}: DayCellProps) {
  return (
    <button
      type="button"
      className={styles.day}
      data-date={day.date}
      data-today={isToday}
      data-current-month={isCurrentMonth}
      onClick={onClick}
    >
      <span className={styles.dayNumber}>
        {day.day}
      </span>

      {children}
    </button>
  )
}