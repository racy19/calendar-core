import {
    useCallback,
    useState,
} from 'react'

import type { CalendarDate } from '../types/calendar'

interface UseCalendarSelectionOptions {
    selectedDate?: CalendarDate | null
    defaultSelectedDate?: CalendarDate | null

    onSelectedDateChange?: (date: CalendarDate | null) => void
}

export function useCalendarSelection({
    selectedDate,
    defaultSelectedDate = null,
    onSelectedDateChange,
}: UseCalendarSelectionOptions) {
    const [internalSelectedDate, setInternalSelectedDate] = useState<CalendarDate | null>(defaultSelectedDate)

    const currentSelectedDate =
        selectedDate !== undefined
            ? selectedDate
            : internalSelectedDate

    const changeSelection = useCallback(
        (nextDate: CalendarDate | null) => {
            if (nextDate === currentSelectedDate) {
                return
            }

            if (selectedDate === undefined) {
                setInternalSelectedDate(nextDate)
            }

            onSelectedDateChange?.(nextDate)
        },
        [
            currentSelectedDate,
            selectedDate,
            onSelectedDateChange,
        ],
    )

    return {
        selectedDate: currentSelectedDate,
        changeSelection,
    }
}