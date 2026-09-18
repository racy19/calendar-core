import type { ReactNode } from 'react'
import type { MonthDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: MonthDay
  isToday?: boolean
  children?: ReactNode
  onClick?: () => void
}

export function DayCell({
  day,
  isToday = false,
  children,
  onClick,
}: DayCellProps) {
  return (
    <button
      type="button"
      className={styles.day}
      data-current-month={day.isCurrentMonth}
      data-today={isToday}
      onClick={onClick}
    >
      <span className={styles.dayNumber}>
        {day.day}
      </span>
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </button>
  )
}