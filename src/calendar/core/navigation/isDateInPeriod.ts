import type { CalendarDate, CalendarView, FirstDayOfWeek } from "../../types/calendar"
import { getWeekDays } from "../week"

/**
 * Checks whether a date belongs to the currently displayed period.
 */
export function isDateInPeriod(
  targetDate: CalendarDate,
  date: CalendarDate,
  view: CalendarView,
  firstDayOfWeek: FirstDayOfWeek,
): boolean {
  switch (view) {
    case 'year':
      return targetDate.slice(0, 4) === date.slice(0, 4)

    case 'month':
      return targetDate.slice(0, 7) === date.slice(0, 7)

    case 'week':
      return getWeekDays(date, firstDayOfWeek).some(
        (day) => day.date === targetDate,
      )

    case 'day':
      return targetDate === date
  }
}