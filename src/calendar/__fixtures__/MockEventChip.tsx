import type { MockCalendarEvent } from './mockEvents'

import styles from './MockEventChip.module.css'

interface MockEventChipProps {
  event: MockCalendarEvent
}

export function MockEventChip({
  event,
}: MockEventChipProps) {
  return (
    <div
      className={styles.event}
      data-palette={event.palette}
    >
      {event.title}
    </div>
  )
}