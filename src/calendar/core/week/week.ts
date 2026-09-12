import type {
  CalendarDate,
  FirstDayOfWeek,
  WeekDay,
} from '../../types/calendar'

import {
  formatCalendarDate,
  parseCalendarDate,
} from '../date'

export function getWeekDays(
  date: CalendarDate,
  firstDayOfWeek: FirstDayOfWeek = 1,
): WeekDay[] {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return []
  }

  const currentDayOfWeek = parsedDate.getDay()

  const daysFromWeekStart =
    (currentDayOfWeek - firstDayOfWeek + 7) % 7

  const weekStart = new Date(parsedDate)

  weekStart.setDate(
    parsedDate.getDate() - daysFromWeekStart,
  )

  return Array.from({ length: 7 }, (_, index): WeekDay => {
    const currentDate = new Date(weekStart)

    currentDate.setDate(
      weekStart.getDate() + index,
    )

    return {
      date: formatCalendarDate(currentDate),
      day: currentDate.getDate(),
    }
  })
}