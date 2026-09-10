import type { CalendarView } from '../../types/calendar'
import styles from './Toolbar.module.css'

interface ToolbarProps {
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onPrevious: () => void
  onToday: () => void
  onNext: () => void
}

export function Toolbar({ view, onViewChange, onPrevious, onToday, onNext }: ToolbarProps) {
  return (
    <div>
        <div className={styles.toolbarButtons}>
      <button
        type="button"
        onClick={onPrevious}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={onToday}
      >
        Today
      </button>

      <button
        type="button"
        onClick={onNext}
      >
        Next
      </button>
        </div>

<div className={styles.toolbarButtons}>
      <button
        type="button"
        onClick={() => onViewChange('month')}
        disabled={view === 'month'}
      >
        Month
      </button>

      <button
        type="button"
        onClick={() => onViewChange('week')}
        disabled={view === 'week'}
      >
        Week
      </button>

      <button
        type="button"
        onClick={() => onViewChange('day')}
        disabled={view === 'day'}
      >
        Day
      </button>
</div>

    </div>
  )
}