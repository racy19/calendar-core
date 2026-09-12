import { getToday } from '../../core/date'
import { getNextDate, getPreviousDate } from '../../core/navigation'
import type { CalendarDate, CalendarView, FirstDayOfWeek } from '../../types/calendar'
import { DayView } from '../DayView'
import { MonthView } from '../MonthView'
import { Toolbar } from '../Toolbar'
import { WeekView } from '../WeekView'
import styles from './Calendar.module.css'

interface CalendarProps {
  view: CalendarView
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  onViewChange: (view: CalendarView) => void
  onDateChange: (date: CalendarDate) => void
  onDayClick?: (date: CalendarDate) => void
}

export function Calendar({ view, date, firstDayOfWeek = 1,onViewChange, onDateChange, onDayClick }: CalendarProps) {
  return (
    <div className={styles.calendar}>
      <Toolbar
        view={view}
        onViewChange={onViewChange}
        onPrevious={() => onDateChange(getPreviousDate(date, view))}
        onToday={() => onDateChange(getToday())}
        onNext={() => onDateChange(getNextDate(date, view))}
      />

      <div>
        {view === 'month' && (
          <MonthView
            date={date}
            firstDayOfWeek={firstDayOfWeek}
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