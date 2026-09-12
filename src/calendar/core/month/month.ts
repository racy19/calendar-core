import type {
  CalendarDate,
  FirstDayOfWeek,
  MonthDay,
} from '../../types/calendar'

import {
  formatCalendarDate,
  parseCalendarDate,
} from '../date'

const DAYS_IN_MONTH_GRID = 42

export function getMonthDays(
  date: CalendarDate,
  firstDayOfWeek: FirstDayOfWeek = 1,
): MonthDay[] {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return []
  }

  const year = parsedDate.getFullYear()
  const month = parsedDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)

  const daysBeforeMonth =
    (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7

  const gridStartDate = new Date(
    year,
    month,
    1 - daysBeforeMonth,
  )

  return Array.from(
    { length: DAYS_IN_MONTH_GRID },
    (_, index): MonthDay => {
      const currentDate = new Date(gridStartDate)

      currentDate.setDate(
        gridStartDate.getDate() + index,
      )

      return {
        date: formatCalendarDate(currentDate),
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month,
      }
    },
  )
}