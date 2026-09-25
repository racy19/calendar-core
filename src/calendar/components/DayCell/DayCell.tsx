import type { ReactNode } from 'react'
import type { CalendarDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: CalendarDay
  isToday?: boolean
  isCurrentMonth?: boolean
  children?: ReactNode
  isSelected?: boolean
  isFocused?: boolean
  tabIndex?: 0 | -1
  onClick?: () => void
}

export function DayCell({
  day,
  isToday = false,
  isCurrentMonth = true,
  children,
  isSelected = false,
  isFocused = false,
  tabIndex = 0,
  onClick,
}: DayCellProps) {
  return (
    <div
      className={styles.day}
      data-today={isToday}
      data-current-month={isCurrentMonth}
      data-selected={isSelected}
      data-focused={isFocused}
    >
      <button
        type="button"
        className={styles.dayTrigger}
        data-calendar-day
        data-date={day.date}
        aria-pressed={isSelected}
        tabIndex={tabIndex}
        onClick={onClick}
      >
        <span className={styles.dayNumber}>
          {day.day}
        </span>
      </button>

      {children != null && (
        <div className={styles.dayContent}>
          {children}
        </div>
      )}
    </div>
  )
}