import type { SVGProps } from "react"

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

export interface CalendarDay {
  date: CalendarDate
  day: number
}

export interface MonthDay extends CalendarDay {
  isCurrentMonth: boolean
}

export type WeekDay = CalendarDay

export type MonthViewVariant = 'default' | 'compact'

export type CalendarTheme = 'light' | 'dark'

export type CalendarAccent = 'gray' | 'blue' | 'green'

export interface CalendarTranslations {
  year: string
  month: string
  week: string
  day: string

  today: string

  previousPeriod: string
  nextPeriod: string
}

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}