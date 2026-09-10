import type { CalendarView } from '../../types/calendar'
import styles from './Toolbar.module.css'

interface ToolbarProps {
  view: CalendarView
  onViewChange: (view: CalendarView) => void
}

export function Toolbar({ view, onViewChange }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
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
  )
}