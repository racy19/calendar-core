import type {
  CalendarDate,
  CalendarView,
  FirstDayOfWeek,
} from '../../types/calendar'

import { getMonthDays } from '../month'
import { getWeekDays } from '../week'

export function isDateVisible(
  targetDate: CalendarDate,
  date: CalendarDate,
  view: CalendarView,
  firstDayOfWeek: FirstDayOfWeek,
): boolean {
  switch (view) {
    case 'year':
      return targetDate.slice(0, 4) === date.slice(0, 4)

    case 'month':
      return getMonthDays(date, firstDayOfWeek).some(
        (day) => day.date === targetDate,
      )

    case 'week':
      return getWeekDays(date, firstDayOfWeek).some(
        (day) => day.date === targetDate,
      )

    case 'day':
      return targetDate === date
  }
}