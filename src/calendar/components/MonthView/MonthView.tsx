import type {
  CalendarDate,
  MonthViewVariant,
} from '../../types/calendar'

import { getMonthDays } from '../../core/month'
import { DayCell } from '../DayCell'

import styles from './MonthView.module.css'
import { isToday } from '../../core/date'
import { WeekdayHeader } from '../WeekdayHeader'
import type { ReactNode } from 'react'
import { useCalendarContext } from '../../context'

interface MonthViewProps {
  date: CalendarDate
  variant?: MonthViewVariant
  selectedDate?: CalendarDate | null
  focusedDate?: CalendarDate
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function MonthView({
  date,
  variant = 'default',
  selectedDate = null,
  focusedDate = null,
  onDayClick,
  renderDayContent,
}: MonthViewProps) {
  const { locale, firstDayOfWeek } = useCalendarContext();

  const days = getMonthDays(date, firstDayOfWeek);

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
            isCurrentMonth={day.isCurrentMonth}
            isSelected={selectedDate === day.date}
            tabIndex={focusedDate === day.date ? 0 : -1}
            onClick={() => onDayClick?.(day.date)}
          >
            {renderDayContent?.(day.date)}
          </DayCell>
        ))}
      </div>
    </div>
  )
}