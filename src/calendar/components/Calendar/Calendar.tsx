
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react'

import { getToday } from '../../core/date'
import { formatPeriodLabel } from '../../core/format'
import { getNextDate, getPreviousDate } from '../../core/navigation'
import type {
  CalendarAccent,
  CalendarDate,
  CalendarTheme,
  CalendarView,
  FirstDayOfWeek,
} from '../../types/calendar'

import { DayView } from '../DayView'
import { MonthView } from '../MonthView'
import { Toolbar } from '../Toolbar'
import { WeekView } from '../WeekView'
import { YearView } from '../YearView/YearView'

import styles from './Calendar.module.css'

import { useSwipeNavigation } from '../../hooks/useSwipeNavigation'
import { CalendarProvider, useCalendarContext } from '../../context'
import { useCalendarKeyboardNavigation } from '../../hooks/useCalendarKeyboardNavigation'
import { isDateVisible } from '../../core/navigation/isDateVisible'

interface CalendarProps {
  className?: string
  style?: CSSProperties

  view: CalendarView
  date: CalendarDate

  selectionEnabled?: boolean
  selectedDate?: CalendarDate | null
  defaultSelectedDate?: CalendarDate | null
  arrowNavEnabled?: boolean
  keySelectionEnabled?: boolean

  theme?: CalendarTheme
  accent?: CalendarAccent

  firstDayOfWeek?: FirstDayOfWeek
  locale?: string

  renderDayContent?: (date: CalendarDate) => ReactNode

  onViewChange: (view: CalendarView) => void
  onDateChange: (date: CalendarDate) => void
  onDayClick?: (date: CalendarDate) => void
  onSelectedDateChange?: (
    date: CalendarDate | null
  ) => void
}

export function Calendar(props: CalendarProps) {
  return (
    <CalendarProvider
      locale={props.locale}
      firstDayOfWeek={props.firstDayOfWeek}
    >
      <CalendarContent {...props} />
    </CalendarProvider>
  )
}

function CalendarContent({
  className,
  style,
  view,
  date,
  selectionEnabled = true,
  selectedDate,
  defaultSelectedDate = null,
  arrowNavEnabled = true,
  keySelectionEnabled = true,
  theme = 'light',
  accent = 'gray',
  renderDayContent,
  onViewChange,
  onDateChange,
  onDayClick,
  onSelectedDateChange,
}: CalendarProps) {
  const {
    locale,
    firstDayOfWeek,
  } = useCalendarContext()

  /* locale resolution */

  const periodLabel = formatPeriodLabel(
    date,
    view,
    locale,
    firstDayOfWeek,
  )

  /* selection management */

  const rootRef = useRef<HTMLDivElement>(null)

  const [internalSelectedDate, setInternalSelectedDate] =
    useState<CalendarDate | null>(defaultSelectedDate)

  const currentSelectedDate =
    selectedDate !== undefined
      ? selectedDate
      : internalSelectedDate

  const [focusedDate, setFocusedDate] =
    useState<CalendarDate | null>(
      currentSelectedDate ?? null,
    )

  const activeDate =
    arrowNavEnabled &&
      focusedDate !== null &&
      isDateVisible(
        focusedDate,
        date,
        view,
        firstDayOfWeek,
      )
      ? focusedDate
      : null

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

  /* keyboard navigation */

  const keyboardNavigation = useCalendarKeyboardNavigation({
    rootRef,

    date,
    view,
    firstDayOfWeek,

    focusedDate: activeDate,
    onFocusedDateChange: setFocusedDate,

    onDateChange,
  })

  const handleCalendarKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!keySelectionEnabled && event.key === 'Enter') {
      const target = event.target

      if (
        target instanceof Element &&
        target.closest('button[data-calendar-day]')
      ) {
        event.preventDefault()
        return
      }
    }

    if (arrowNavEnabled) {
      keyboardNavigation.onKeyDown(event)
    }
  }

  /* day click */

  const handleDayClick = (clickedDate: CalendarDate) => {
    const isSelected =
      selectionEnabled &&
      currentSelectedDate === clickedDate

    if (isSelected) {
      changeSelection(null)

      // Pokud je focusedDate stejné jako clickedDate,
      // zrušíme současně selection i focus.
      //
      // Pokud byl focus přesunut šipkami na jiné datum,
      // zachováme ho.

      if (focusedDate === clickedDate) {
        setFocusedDate(null)

        rootRef.current
          ?.querySelector<HTMLButtonElement>(
            `button[data-calendar-day][data-date="${clickedDate}"]`,
          )
          ?.blur()
      }
    } else {
      if (arrowNavEnabled) {
        setFocusedDate(clickedDate)
      }

      if (selectionEnabled) {
        changeSelection(clickedDate)
      }
    }

    onDayClick?.(clickedDate)
  }

  /* mouse focus management */

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

    // Pokud klikáme na selectedDate, ale focus už
    // pomocí šipek přešel na jiné datum, zabráníme
    // prohlížeči přesunout DOM focus zpět na selectedDate.

    if (
      dayButton.dataset.date === currentSelectedDate &&
      focusedDate !== currentSelectedDate
    ) {
      event.preventDefault()
    }
  }

  /* dismiss */

  const handleDismiss = useCallback(() => {
    if (focusedDate !== null) {
      const isSameDate =
        focusedDate === currentSelectedDate

      setFocusedDate(null)

      const focusedDay =
        rootRef.current?.querySelector<HTMLButtonElement>(
          'button[data-calendar-day]:focus',
        )

      focusedDay?.blur()

      if (isSameDate && selectionEnabled) {
        changeSelection(null)
      }

      return
    }

    if (
      selectionEnabled &&
      currentSelectedDate !== null
    ) {
      changeSelection(null)
    }
  }, [
    focusedDate,
    currentSelectedDate,
    selectionEnabled,
    changeSelection,
  ])

  /* navigation handlers */

  const handlePrevious = () => {
    onDateChange(getPreviousDate(date, view))
  }

  const handleNext = () => {
    onDateChange(getNextDate(date, view))
  }

  const handleToday = () => {
    onDateChange(getToday())
  }

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  })

  /* selection reset on Escape */

  useEffect(() => {
    if (
      !keySelectionEnabled ||
      (
        focusedDate === null &&
        (
          !selectionEnabled ||
          currentSelectedDate === null
        )
      )
    ) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDismiss()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [
    keySelectionEnabled,
    focusedDate,
    selectionEnabled,
    currentSelectedDate,
    handleDismiss,
  ])

  /* render */

  return (
    <div
      ref={rootRef}
      className={[
        styles.calendar,
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      data-theme={theme}
      data-accent={accent}
      data-view={view}
      onMouseDownCapture={handleDayMouseDownCapture}
      onKeyDown={handleCalendarKeyDown}
      onFocusCapture={
        arrowNavEnabled
          ? keyboardNavigation.onFocusCapture
          : () => { }
      }
    >
      <Toolbar
        view={view}
        onViewChange={onViewChange}
        periodLabel={periodLabel}
        onPrevious={handlePrevious}
        onToday={handleToday}
        onNext={handleNext}
      />

      <div
        className={styles.view}
        {...swipeHandlers}
      >
        {view === 'year' && (
          <YearView
            date={date}
            onDayClick={handleDayClick}
            selectedDate={
              selectionEnabled
                ? currentSelectedDate
                : null
            }
            focusedDate={activeDate}
          />
        )}

        {view === 'month' && (
          <MonthView
            date={date}
            selectedDate={
              selectionEnabled
                ? currentSelectedDate
                : null
            }
            focusedDate={activeDate}
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}

        {view === 'week' && (
          <WeekView
            date={date}
            selectedDate={
              selectionEnabled
                ? currentSelectedDate
                : null
            }
            focusedDate={activeDate}
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}

        {view === 'day' && (
          <DayView
            date={date}
            selectedDate={
              selectionEnabled
                ? currentSelectedDate
                : null
            }
            focusedDate={activeDate}
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}
      </div>
    </div>
  )
}
