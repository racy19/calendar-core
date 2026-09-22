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
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation'
import { CalendarProvider, useCalendarContext } from '../../context'

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

export function Calendar(props: CalendarProps) {
  return (
    <CalendarProvider
      locale={props.locale}
      firstDayOfWeek={props.firstDayOfWeek}
    >
      <CalendarContent {...props} />
    </CalendarProvider>
  )
}

function CalendarContent({
  view,
  date,
  theme = 'light',
  accent = 'gray',
  renderDayContent,
  onViewChange,
  onDateChange,
  onDayClick,
}: CalendarProps) {
  const {
    locale,
    firstDayOfWeek,
  } = useCalendarContext();
  
  /* locale resolution */
  const periodLabel = formatPeriodLabel(
    date,
    view,
    locale,
    firstDayOfWeek,
  )

  /* nav handlers */
  const handlePrevious = () => {
    onDateChange(getPreviousDate(date, view))
  }

  const handleNext = () => {
    onDateChange(getNextDate(date, view))
  }

  const handleToday = () => {
    onDateChange(getToday())
  }

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  })

  /* render */
  return (
    <div
      className={styles.calendar}
      data-theme={theme}
      data-accent={accent}
      data-view={view}
    >
      <Toolbar
        view={view}
        onViewChange={onViewChange}
        periodLabel={periodLabel}
        onPrevious={handlePrevious}
        onToday={handleToday}
        onNext={handleNext}
      />

      <div
        className={styles.view}
        {...swipeHandlers}
      >
        {view === 'year' && (
          <YearView
            date={date}
            onDayClick={onDayClick}
          />
        )}
        {view === 'month' && (
          <MonthView
            date={date}
            renderDayContent={renderDayContent}
            onDayClick={onDayClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            date={date}
            renderDayContent={renderDayContent}
            onDayClick={onDayClick}
          />
        )}
        {view === 'day' && (
          <DayView
            date={date}
            renderDayContent={renderDayContent}
            onDayClick={onDayClick}
          />
        )}
      </div>
    </div>
  )
}