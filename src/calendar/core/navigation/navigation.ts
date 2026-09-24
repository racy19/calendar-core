import type { CalendarDate, CalendarView } from '../../types/calendar'
import {
  shiftCalendarDate,
} from '../date'

export function getPreviousDate(
  date: CalendarDate,
  view: CalendarView,
): CalendarDate {
  return shiftCalendarDate(date, -1, view) ?? date
}

export function getNextDate(
  date: CalendarDate,
  view: CalendarView,
): CalendarDate {
  return shiftCalendarDate(date, 1, view) ?? date
}