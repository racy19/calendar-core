export type CalendarView = 'month' | 'week' | 'day'

/**
 * Calendar day represented as YYYY-MM-DD.
 *
 * Example:
 * "2026-09-10"
 */
export type CalendarDate = string

export type CalendarDateUnit = 'day' | 'week' | 'month' | 'year'

export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface MonthDay {
  date: CalendarDate
  day: number
  isCurrentMonth: boolean
}