import type { CalendarDate } from '../../types/calendar'

import {
  formatCalendarDate,
  parseCalendarDate,
} from '../date'

export function getYearMonths(
  date: CalendarDate,
): CalendarDate[] {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return []
  }

  const year = parsedDate.getFullYear()

  return Array.from({ length: 12 }, (_, month) =>
    formatCalendarDate(
      new Date(year, month, 1),
    ),
  )
}