import type { MonthDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: MonthDay
  isToday?: boolean
  onClick?: () => void
}

export function DayCell({
  day,
  isToday = false,
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
      {day.day}
    </button>
  )
}