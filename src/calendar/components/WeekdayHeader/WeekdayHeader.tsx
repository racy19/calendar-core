import type { FirstDayOfWeek } from '../../types/calendar'

import styles from './WeekdayHeader.module.css'

interface WeekdayHeaderProps {
  firstDayOfWeek?: FirstDayOfWeek
  locale?: string
}

export function WeekdayHeader({
  firstDayOfWeek = 1,
  locale,
}: WeekdayHeaderProps) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  })

  const days = Array.from({ length: 7 }, (_, index) => {
    const dayIndex = (firstDayOfWeek + index) % 7

    // 4. 1. 2026 je neděle
    const date = new Date(2026, 0, 4 + dayIndex)

    return formatter.format(date)
  })

  return (
    <div className={styles.header}>
      {days.map((day, index) => (
        <div
          key={index}
          className={styles.day}
        >
          {day}
        </div>
      ))}
    </div>
  )
}