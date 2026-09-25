import { useCalendarContext } from '../../context'
import type { CalendarView } from '../../types/calendar'
import { CalendarIcon } from '../icons/CalendarIcon/CalendarIcon'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'
import { ChevronRightIcon } from '../icons/ChevronRightIcon'

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

        <div
          onClick={onToday}
        >
          <CalendarIcon
            size='32'
            secondDotPalette='primary'
            disabled={view === 'day'}
            onClick={onToday}
            ariaLabel={translations.today}
          />
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          type="button"
          onClick={onPrevious}
          aria-label={translations.previousPeriod}
        >
          <ChevronLeftIcon size={12} />
        </button>

        <span className={styles.period}>
          {periodLabel}
        </span>

        <button
          className={styles.navButton}
          type="button"
          onClick={onNext}
          aria-label={translations.nextPeriod}
        >
          <ChevronRightIcon size={12} />
        </button>
      </div>

      <div />
    </div>
  )
}