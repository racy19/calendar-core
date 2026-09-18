import type {
  CalendarDate,
  FirstDayOfWeek,
  MonthViewVariant,
} from '../../types/calendar'

import { getMonthDays } from '../../core/month'
import { DayCell } from '../DayCell'

import styles from './MonthView.module.css'
import { isToday } from '../../core/date'
import { WeekdayHeader } from '../WeekdayHeader'
import type { ReactNode } from 'react'

interface MonthViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  locale?: string
  variant?: MonthViewVariant
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function MonthView({
  date,
  firstDayOfWeek = 1,
  locale,
  variant = 'default',
  renderDayContent,
  onDayClick
}: MonthViewProps) {
  const days = getMonthDays(date, firstDayOfWeek)

  return (
    <div
      className={styles.monthView}
      data-variant={variant}
    >
      <WeekdayHeader
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
      />

      <div className={styles.month}>
        {days.map((day) => (
          <DayCell
            key={day.date}
            day={day}
            isToday={isToday(day.date)}
            onClick={() => onDayClick?.(day.date)}
          >
            {renderDayContent?.(day.date)}
          </DayCell>
        ))}
      </div>
    </div>
  )
}