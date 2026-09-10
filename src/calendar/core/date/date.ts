import type {
  CalendarDate,
  CalendarDateUnit,
} from '../../types/calendar'

/**
 * Converts a Date object to a CalendarDate in YYYY-MM-DD format.
 *
 * Uses local date values intentionally.
 * Do not replace this with date.toISOString(), because ISO strings
 * are converted to UTC and could represent a different calendar day.
 *
 * @example
 * formatCalendarDate(new Date(2026, 8, 10))
 * // "2026-09-10"
 */
export function formatCalendarDate(date: Date): CalendarDate {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Parses a CalendarDate (YYYY-MM-DD) into a local Date object.
 *
 * Returns null for invalid values.
 *
 * @example
 * parseCalendarDate("2026-09-10")
 * // Date
 *
 * parseCalendarDate("2026-02-31")
 * // null
 */
export function parseCalendarDate(date: CalendarDate): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  const parsedDate = new Date(year, month - 1, day)

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null
  }

  return parsedDate
}

/**
 * Checks whether a string represents a valid CalendarDate.
 *
 * @example
 * isValidCalendarDate("2026-09-10") // true
 * isValidCalendarDate("2026-02-31") // false
 * isValidCalendarDate("10.09.2026") // false
 */
export function isValidCalendarDate(date: string): date is CalendarDate {
  return parseCalendarDate(date) !== null
}

/**
 * Returns today's local date in YYYY-MM-DD format.
 *
 * @example
 * getToday()
 * // "2026-09-10"
 */
export function getToday(): CalendarDate {
  return formatCalendarDate(new Date())
}

/**
 * Returns year, month and day parts of a Date.
 *
 * Month follows JavaScript Date convention:
 * 0 = January
 * 11 = December
 */
export function getDateParts(date: Date): {
  year: number
  month: number
  day: number
} {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  }
}

/**
 * Checks whether a Date or CalendarDate represents today.
 */
export function isToday(date: Date | CalendarDate): boolean {
  const calendarDate =
    date instanceof Date
      ? formatCalendarDate(date)
      : date

  return calendarDate === getToday()
}

/**
 * Checks whether two Date objects represent the same calendar day.
 */
export function isSameDay(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

/**
 * Returns the number of days in a given month.
 *
 * Month uses JavaScript indexing:
 * 0 = January
 * 1 = February
 * ...
 * 11 = December
 *
 * @example
 * getDaysInMonth(2026, 1)
 * // 28
 */
export function getDaysInMonth(
  year: number,
  month: number,
): number {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Shifts a CalendarDate by the specified amount.
 *
 * Supports days, weeks, months and years.
 *
 * Month/year shifting safely handles dates at the end of a month.
 *
 * For example:
 * January 31 + 1 month -> February 28
 * instead of accidentally becoming a date in March.
 *
 * Returns null if the input date is invalid.
 */
export function shiftCalendarDate(
  date: CalendarDate,
  amount: number,
  unit: CalendarDateUnit,
): CalendarDate | null {
  const parsedDate = parseCalendarDate(date)

  if (!parsedDate) {
    return null
  }

  switch (unit) {
    case 'day':
      parsedDate.setDate(parsedDate.getDate() + amount)
      break

    case 'week':
      parsedDate.setDate(parsedDate.getDate() + amount * 7)
      break

    case 'month': {
      const originalDay = parsedDate.getDate()

      parsedDate.setDate(1)
      parsedDate.setMonth(parsedDate.getMonth() + amount)

      const daysInTargetMonth = getDaysInMonth(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
      )

      parsedDate.setDate(
        Math.min(originalDay, daysInTargetMonth),
      )

      break
    }

    case 'year': {
      const originalDay = parsedDate.getDate()
      const originalMonth = parsedDate.getMonth()

      parsedDate.setDate(1)
      parsedDate.setFullYear(parsedDate.getFullYear() + amount)
      parsedDate.setMonth(originalMonth)

      const daysInTargetMonth = getDaysInMonth(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
      )

      parsedDate.setDate(
        Math.min(originalDay, daysInTargetMonth),
      )

      break
    }
  }

  return formatCalendarDate(parsedDate)
}

/**
 * Returns the ISO week number (1-53).
 *
 * ISO weeks start on Monday.
 */
export function getISOWeek(date: Date): number {
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ),
  )

  const dayNumber = utcDate.getUTCDay() || 7

  utcDate.setUTCDate(
    utcDate.getUTCDate() + 4 - dayNumber,
  )

  const yearStart = new Date(
    Date.UTC(utcDate.getUTCFullYear(), 0, 1),
  )

  return Math.ceil(
    ((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) /
      7,
  )
}

/**
 * Returns the earliest and latest CalendarDate from an array.
 *
 * Because YYYY-MM-DD strings are lexicographically sortable,
 * we don't need to convert them to Date objects.
 *
 * Invalid dates are ignored.
 */
export function getMinMaxDate(
  dates: CalendarDate[],
): {
  min: CalendarDate | null
  max: CalendarDate | null
} {
  const validDates = dates.filter(isValidCalendarDate)

  if (validDates.length === 0) {
    return {
      min: null,
      max: null,
    }
  }

  const sortedDates = [...validDates].sort()

  return {
    min: sortedDates[0] ?? null,
    max: sortedDates[sortedDates.length - 1] ?? null,
  }
}