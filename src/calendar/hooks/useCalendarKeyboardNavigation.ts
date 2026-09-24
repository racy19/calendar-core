import {
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type RefObject,
  type FocusEvent,
} from 'react'

import type {
  CalendarDate,
  CalendarView,
  FirstDayOfWeek,
} from '../types/calendar'

import { shiftCalendarDate } from '../core/date'
import { isDateInPeriod } from '../core/navigation/isDateInPeriod'

interface UseCalendarKeyboardNavigationOptions {
  rootRef: RefObject<HTMLDivElement | null>

  date: CalendarDate
  view: CalendarView
  firstDayOfWeek: FirstDayOfWeek

  focusedDate: CalendarDate

  onSelectDate?: (date: CalendarDate) => void
  onFocusedDateChange: (date: CalendarDate) => void
  onDateChange: (date: CalendarDate) => void
}

export function useCalendarKeyboardNavigation({
  rootRef,
  date,
  view,
  firstDayOfWeek,
  focusedDate,
  onSelectDate,
  onFocusedDateChange,
  onDateChange,
}: UseCalendarKeyboardNavigationOptions) {
  const pendingFocusRef = useRef<CalendarDate | null>(null)

  useLayoutEffect(() => {
    const targetDate = pendingFocusRef.current

    if (!targetDate || focusedDate !== targetDate) {
      return
    }

    if (
      !isDateInPeriod(
        targetDate,
        date,
        view,
        firstDayOfWeek,
      )
    ) {
      return
    }

    const dayElement =
      rootRef.current?.querySelector<HTMLButtonElement>(
        `button[data-calendar-day][data-date="${targetDate}"]`,
      )

    if (dayElement) {
      dayElement.focus()
      pendingFocusRef.current = null
    }
  }, [
    date,
    view,
    focusedDate,
    firstDayOfWeek,
    rootRef,
  ])

  const handleFocusCapture = (
  event: FocusEvent<HTMLDivElement>,
) => {
  if (!(event.target instanceof Element)) {
    return
  }

  const dayElement = event.target.closest<HTMLElement>(
    '[data-calendar-day]',
  )

  if (
    !dayElement ||
    !event.currentTarget.contains(dayElement)
  ) {
    return
  }

  const nextDate = dayElement.dataset.date

  if (nextDate) {
    onFocusedDateChange(nextDate)
  }
}

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    event.preventDefault()

    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    }

    const offset = offsets[event.key]

    if (offset === undefined) {
      return
    }

    // Only handle keyboard events originating from a DayCell.
    if (!(event.target instanceof Element)) {
      return
    }

    const dayElement = event.target.closest<HTMLButtonElement>(
      'button[data-calendar-day]',
    )

    if (
      !dayElement ||
      !event.currentTarget.contains(dayElement)
    ) {
      return
    }

    const currentDate = dayElement.dataset.date

    if (!currentDate) {
      return
    }

    const nextDate = shiftCalendarDate(
      currentDate,
      offset,
      'day',
    )

    if (!nextDate) {
      return
    }

    event.preventDefault()

    pendingFocusRef.current = nextDate

    onFocusedDateChange(nextDate)
    onSelectDate?.(nextDate)

    if (
      !isDateInPeriod(
        nextDate,
        date,
        view,
        firstDayOfWeek,
      )
    ) {
      onDateChange(nextDate)
    }
  }

  return {
    onKeyDown: handleKeyDown,
    onFocusCapture: handleFocusCapture,
  }
}