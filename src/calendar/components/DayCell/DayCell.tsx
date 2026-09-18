import type { ReactNode } from 'react'
import type { CalendarDate } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  date: CalendarDate
  day: number

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
      data-today={isToday}
      data-current-month={isCurrentMonth}
      onClick={onClick}
    >
      <span className={styles.dayNumber}>
        {day}
      </span>

      {children}
    </button>
  )
}