import { useCallback } from 'react'

import type { CalendarDate, CalendarView } from '../types/calendar'
import { getNextDate, getPreviousDate } from '../core/navigation'
import { getToday } from '../core/date'

interface UseCalendarNavigationOptions {
    date: CalendarDate
    view: CalendarView

    onDateChange: (date: CalendarDate) => void
}

export function useCalendarNavigation({
    date,
    view,
    onDateChange,
}: UseCalendarNavigationOptions) {
    const goPrevious = useCallback(() => {
        onDateChange(getPreviousDate(date, view))
    }, [date, view, onDateChange])

    const goNext = useCallback(() => {
        onDateChange(getNextDate(date, view))
    }, [date, view, onDateChange])

    const goToday = useCallback(() => {
        onDateChange(getToday())
    }, [onDateChange])

    return {
        goPrevious,
        goNext,
        goToday,
    }
}