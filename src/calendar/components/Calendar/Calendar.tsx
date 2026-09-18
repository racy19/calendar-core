import type { ReactNode } from 'react'
import { getToday } from '../../core/date'
import { formatPeriodLabel } from '../../core/format'
import { getNextDate, getPreviousDate } from '../../core/navigation'
import type { CalendarAccent, CalendarDate, CalendarTheme, CalendarView, FirstDayOfWeek } from '../../types/calendar'
import { DayView } from '../DayView'
import { MonthView } from '../MonthView'
import { Toolbar } from '../Toolbar'
import { WeekView } from '../WeekView'
import { YearView } from '../YearView/YearView'
import styles from './Calendar.module.css'

interface CalendarProps {
  view: CalendarView
  date: CalendarDate

  theme?: CalendarTheme
  accent?: CalendarAccent

  firstDayOfWeek?: FirstDayOfWeek
  locale?: string

  renderDayContent?: (date: CalendarDate) => ReactNode
  onViewChange: (view: CalendarView) => void
  onDateChange: (date: CalendarDate) => void
  onDayClick?: (date: CalendarDate) => void
}

export function Calendar({
  view,
  date,
  theme = 'light',
  accent = 'gray',
  firstDayOfWeek = 1,
  locale,
  renderDayContent,
  onViewChange,
  onDateChange,
  onDayClick
}: CalendarProps) {
  const periodLabel = formatPeriodLabel(
    date,
    view,
    locale,
    firstDayOfWeek,
  )
  return (
    <div
      className={styles.calendar}
      data-theme={theme}
      data-accent={accent}
    >
      <Toolbar
        view={view}
        onViewChange={onViewChange}
        periodLabel={periodLabel}
        onPrevious={() => onDateChange(getPreviousDate(date, view))}
        onToday={() => onDateChange(getToday())}
        onNext={() => onDateChange(getNextDate(date, view))}
      />

      <div>
        {view === 'year' && (
          <YearView
            date={date}
            firstDayOfWeek={firstDayOfWeek}
            locale={locale}
            onDayClick={onDayClick}
          />
        )}
        {view === 'month' && (
          <MonthView
            date={date}
            firstDayOfWeek={firstDayOfWeek}
            locale={locale}
            renderDayContent={renderDayContent}
            onDayClick={onDayClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            date={date}
            firstDayOfWeek={firstDayOfWeek}
            onDayClick={onDayClick}
          />
        )}
        {view === 'day' && (
          <DayView
            date={date}
            onDayClick={onDayClick}
          />
        )}
      </div>
    </div>
  )
}