import {
    useCallback,
    useState,
    type MouseEvent,
} from 'react'

import type {
    CalendarDate,
    CalendarView,
    FirstDayOfWeek,
} from '../types/calendar'

import { isDateVisible } from '../core/navigation/isDateVisible'

interface UseCalendarFocusOptions {
    date: CalendarDate
    view: CalendarView
    firstDayOfWeek: FirstDayOfWeek

    selectedDate: CalendarDate | null

    selectionEnabled: boolean
    arrowNavEnabled: boolean
}

export function useCalendarFocus({
    date,
    view,
    firstDayOfWeek,
    selectedDate,
    selectionEnabled,
    arrowNavEnabled,
}: UseCalendarFocusOptions) {
    const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(selectedDate)

    const isFocusedDateVisible = isDateVisible(
        focusedDate,
        date,
        view,
        firstDayOfWeek,
    )

    const isSelectedDateVisible = isDateVisible(
        selectedDate,
        date,
        view,
        firstDayOfWeek,
    )

    const activeDate =
        arrowNavEnabled &&
            focusedDate !== null &&
            isFocusedDateVisible
            ? focusedDate
            : null

    const tabStopDate =
        activeDate ??
        (
            selectionEnabled &&
                selectedDate !== null &&
                isSelectedDateVisible
                ? selectedDate
                : date
        )

    const rovingTabStopDate =
        arrowNavEnabled
            ? tabStopDate
            : undefined

    const focus = useCallback(
        (nextDate: CalendarDate) => {
            setFocusedDate(nextDate)
        },
        [],
    )

    const clear = useCallback(() => {
        setFocusedDate(null)
    }, [])

    const handleDayMouseDownCapture = (
        event: MouseEvent<HTMLDivElement>,
    ) => {
        if (!arrowNavEnabled || !selectionEnabled) {
            return
        }

        const target = event.target

        if (!(target instanceof Element)) {
            return
        }

        const dayButton =
            target.closest<HTMLButtonElement>(
                'button[data-calendar-day]',
            )

        if (
            !dayButton ||
            !event.currentTarget.contains(dayButton)
        ) {
            return
        }

        if (
            dayButton.dataset.date === selectedDate &&
            focusedDate !== selectedDate
        ) {
            event.preventDefault()
        }
    }

    return {
        focusedDate,
        activeDate,
        tabStopDate: rovingTabStopDate,

        focus,
        clear,

        onMouseDownCapture:
            handleDayMouseDownCapture,
    }
}