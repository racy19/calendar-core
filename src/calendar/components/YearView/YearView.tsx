import type {
  CalendarDate,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getYearMonths } from '../../core/year'
import { parseCalendarDate } from '../../core/date'

import { MonthView } from '../MonthView'

import styles from './YearView.module.css'

interface YearViewProps {
  date: CalendarDate
  firstDayOfWeek?: FirstDayOfWeek
  locale?: string
  onDayClick?: (date: CalendarDate) => void
}

export function YearView({
  date,
  firstDayOfWeek = 1,
  locale,
  onDayClick,
}: YearViewProps) {
  const months = getYearMonths(date)

  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
  })

  return (
    <div className={styles.year}>
      {months.map((month) => {
        const parsedMonth = parseCalendarDate(month)

        if (!parsedMonth) {
          return null
        }

        return (
          <section
            key={month}
            className={styles.month}
          >
            <h3 className={styles.monthTitle}>
              {monthFormatter.format(parsedMonth)}
            </h3>

            <MonthView
              date={month}
              firstDayOfWeek={firstDayOfWeek}
              locale={locale}
              variant="compact"
              onDayClick={onDayClick}
            />
          </section>
        )
      })}
    </div>
  )
}