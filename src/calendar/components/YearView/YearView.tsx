import type {
  CalendarDate,
} from '../../types/calendar'

import { getYearMonths } from '../../core/year'
import { parseCalendarDate } from '../../core/date'

import { MonthView } from '../MonthView'

import styles from './YearView.module.css'
import { useCalendarContext } from '../../context'

interface YearViewProps {
  date: CalendarDate
  onDayClick?: (date: CalendarDate) => void
}

export function YearView({
  date,
  onDayClick,
}: YearViewProps) {
  const { locale } = useCalendarContext();

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
              variant="compact"
              onDayClick={onDayClick}
            />
          </section>
        )
      })}
    </div>
  )
}