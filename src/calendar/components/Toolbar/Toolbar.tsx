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
  return (
    <div className={styles.toolbar}>
            <div className={styles.views}>
        <button
          type="button"
          data-active={view === 'month'}
          onClick={() => onViewChange('month')}
        >
          Month
        </button>

        <button
          type="button"
          data-active={view === 'week'}
          onClick={() => onViewChange('week')}
        >
          Week
        </button>

        <button
          type="button"
          data-active={view === 'day'}
          onClick={() => onViewChange('day')}
        >
          Day
        </button>
      </div>
      <div className={styles.navigation}>
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous period"
        >
          &lt;
        </button>

        <div className={styles.period}>
          {periodLabel}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next period"
        >
          &gt;
        </button>
      </div>
      <div className={styles.right}>
        <button type="button" onClick={onToday}>
          Today
        </button>
      </div>
    </div>
  )
}