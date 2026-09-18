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
  <div className={styles.controls}>
    <select
      value={view}
      onChange={(event) =>
        onViewChange(event.target.value as CalendarView)
      }
    >
      <option value="year">Rok</option>
      <option value="month">Měsíc</option>
      <option value="week">Týden</option>
      <option value="day">Den</option>
    </select>

    <button
      type="button"
      onClick={onToday}
    >
      Dnes
    </button>
  </div>

  <div className={styles.navigation}>
    <button
      type="button"
      onClick={onPrevious}
      aria-label="Předchozí období"
    >
      ‹
    </button>

    <span className={styles.period}>
      {periodLabel}
    </span>

    <button
      type="button"
      onClick={onNext}
      aria-label="Následující období"
    >
      ›
    </button>
  </div>

  <div />
</div>
  )
}