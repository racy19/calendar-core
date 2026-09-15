import type {
  CalendarDate,
  CalendarView,
  FirstDayOfWeek,
} from '../../types/calendar'

import { parseCalendarDate } from '../date'
import { getWeekDays } from '../week'

export function formatPeriodLabel(
  date: CalendarDate,
  view: CalendarView,
  locale?: string,
  firstDayOfWeek: FirstDayOfWeek = 1,
): string {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return ''
  }

  switch (view) {
    case 'month':
      return new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }).format(parsedDate)

    case 'day':
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(parsedDate)

    case 'week': {
      const weekDays = getWeekDays(date, firstDayOfWeek)

      const firstDay = weekDays[0]
      const lastDay = weekDays[weekDays.length - 1]

      if (!firstDay || !lastDay) {
        return ''
      }

      const startDate = parseCalendarDate(firstDay.date)
      const endDate = parseCalendarDate(lastDay.date)

      if (!startDate || !endDate) {
        return ''
      }

      const formatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      return formatter.formatRange(startDate, endDate)
    }
  }
}