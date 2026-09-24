import type { ReactNode } from 'react'
import type { CalendarDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: CalendarDay
  isToday?: boolean
  isCurrentMonth?: boolean
  children?: ReactNode
  isSelected?: boolean
  tabIndex?: 0 | -1
  onClick?: () => void
}

export function DayCell({
  day,
  isToday = false,
  isCurrentMonth = true,
  children,
  isSelected = false,
  tabIndex = 0,
  onClick,
}: DayCellProps) {
  return (
    <button
      type="button"
      className={styles.day}

      data-calendar-day
      data-date={day.date}

      data-today={isToday}
      data-current-month={isCurrentMonth}
      data-selected={isSelected}

      aria-pressed={isSelected}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <span className={styles.dayNumber}>
        {day.day}
      </span>

      {children}
    </button>
  )
}