export type CalendarView = 'year' | 'month' | 'week' | 'day'

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

export interface WeekDay {
  date: CalendarDate
  day: number
}

export type MonthViewVariant = 'default' | 'compact'

export type CalendarTheme = 'light' | 'dark'

export type CalendarAccent = 'gray' |'blue' | 'green'