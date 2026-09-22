import { useCalendarContext } from '../../context'
import type { CalendarView } from '../../types/calendar'

import styles from './Toolbar.module.css'

interface ToolbarProps {
  view: CalendarView
  periodLabel: string

  onViewChange: (view: CalendarView) => void
  onPrevious: () => void
  onToday: () => void
  onNext: () => void
}

export function Toolbar({
  view,
  periodLabel,
  onViewChange,
  onPrevious,
  onToday,
  onNext,
}: ToolbarProps) {
  const { translations } = useCalendarContext();

  return (
    <div className={styles.toolbar}>
      <div className={styles.controls}>
        <select
          value={view}
          onChange={(event) =>
            onViewChange(event.target.value as CalendarView)
          }
        >
          <option value="year">{translations.year}</option>
          <option value="month">{translations.month}</option>
          <option value="week">{translations.week}</option>
          <option value="day">{translations.day}</option>
        </select>

        <button
          type="button"
          onClick={onToday}
        >
          {translations.today}
        </button>
      </div>

      <div className={styles.navigation}>
        <button
          type="button"
          onClick={onPrevious}
          aria-label={translations.previousPeriod}
        >
          ‹
        </button>

        <span className={styles.period}>
          {periodLabel}
        </span>

        <button
          type="button"
          onClick={onNext}
          aria-label={translations.nextPeriod}
        >
          ›
        </button>
      </div>

      <div />
    </div>
  )
}