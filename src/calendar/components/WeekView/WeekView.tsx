import type {
  CalendarDate,
} from '../../types/calendar'

import { getWeekDays } from '../../core/week'
import { isToday } from '../../core/date'

import styles from './WeekView.module.css'
import { DayCell } from '../DayCell'
import type { ReactNode } from 'react'
import { WeekdayHeader } from '../WeekdayHeader'
import { useCalendarContext } from '../../context'

interface WeekViewProps {
  date: CalendarDate
  selectedDate?: CalendarDate | null
  focusedDate?: CalendarDate | null
  tabStopDate?: CalendarDate | null
  onDayClick?: (date: CalendarDate) => void
  renderDayContent?: (date: CalendarDate) => ReactNode
}

export function WeekView({
  date,
  selectedDate = null,
  focusedDate = null,
  tabStopDate,
  onDayClick,
  renderDayContent,
}: WeekViewProps) {
  const { locale, firstDayOfWeek } = useCalendarContext();

  const days = getWeekDays(date, firstDayOfWeek);

  return (
    <>
      <WeekdayHeader
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
      />
      <div className={styles.week}>
        {days.map((day) => {
          const tabIndex =
            tabStopDate === undefined ||
              tabStopDate === day.date
              ? 0
              : -1

          return (
            <DayCell
              key={day.date}
              day={day}
              isToday={isToday(day.date)}
              isSelected={selectedDate === day.date}
              isFocused={focusedDate === day.date}
              tabIndex={tabIndex}
              onClick={() => onDayClick?.(day.date)}
            >
              {renderDayContent?.(day.date)}
            </DayCell>
          )
        })}
      </div>
    </>
  )
}