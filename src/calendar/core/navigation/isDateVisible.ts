import type {
  CalendarDate,
  CalendarView,
  FirstDayOfWeek,
} from '../../types/calendar'
import { parseCalendarDate } from '../date';

import { getMonthDays } from '../month'
import { getWeekDays } from '../week'

export function isDateVisible(
  targetDate: CalendarDate | null,
  date: CalendarDate,
  view: CalendarView,
  firstDayOfWeek: FirstDayOfWeek,
  considerAdjacentDays = true,
): boolean {
  if (!targetDate) return false;

  switch (view) {
    case 'year':
      return targetDate.slice(0, 4) === date.slice(0, 4)

    case 'month':
      return considerAdjacentDays
        ? getMonthDays(date, firstDayOfWeek).some((day) => day.date === targetDate)
        : parseCalendarDate(targetDate).getFullYear() === parseCalendarDate(date).getFullYear() &&
        parseCalendarDate(targetDate).getMonth() === parseCalendarDate(date).getMonth();

    case 'week':
      return getWeekDays(date, firstDayOfWeek).some(
        (day) => day.date === targetDate,
      )

    case 'day':
      return targetDate === date
  }
}