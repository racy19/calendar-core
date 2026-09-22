import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getWeekDays } from '../../core/week'
import { isToday } from '../../core/date'

import styles from './WeekView.module.css'
import { DayCell } from '../DayCell'
import type { ReactNode } from 'react'
import { WeekdayHeader } from '../WeekdayHeader'

interface WeekViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  locale: string
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function WeekView({
  date,
  firstDayOfWeek = 1,
  locale,
  onDayClick,
}: WeekViewProps) {
  const days = getWeekDays(date, firstDayOfWeek)

  return (
    <>
      <WeekdayHeader
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
      />
      <div className={styles.week}>
        {days.map((day) => (
          <DayCell
            key={day.date}
            day={day}
            isToday={isToday(day.date)}
            onClick={() => onDayClick?.(day.date)}
          >
          </DayCell>
        ))}
      </div>
    </>
  )
}