import type { MonthDay } from '../../types/calendar'

import styles from './DayCell.module.css'

interface DayCellProps {
  day: MonthDay
  isToday?: boolean
}

export function DayCell({
  day,
  isToday = false,
}: DayCellProps) {
  return (
    <div
      className={styles.day}
      data-current-month={day.isCurrentMonth}
      data-today={isToday}
    >
      {day.day}
    </div>
  )
}