
import {
  useCallback,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { getToday } from '../../core/date'
import { formatPeriodLabel } from '../../core/format'
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
import { useCalendarSelection } from '../../hooks/useCalendarSelection'
import { useCalendarNavigation } from '../../hooks/useCalendarNavigation'
import { useCalendarFocus } from '../../hooks/useCalendarFocus'

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
  } = useCalendarContext();

  const today = getToday();

  /* locale resolution */
  const periodLabel = formatPeriodLabel(date, view, locale, firstDayOfWeek);

  /* selection management */
  const rootRef = useRef<HTMLDivElement>(null);

  const {
    selectedDate: currentSelectedDate,
    changeSelection,
  } = useCalendarSelection({ selectedDate, defaultSelectedDate, onSelectedDateChange, });

  const navigation = useCalendarNavigation({ date, view, onDateChange });

  const focus = useCalendarFocus({
    date,
    view,
    firstDayOfWeek,

    selectedDate: currentSelectedDate,

    selectionEnabled,
    arrowNavEnabled,
  })

  const isTodayVisible = isDateVisible(today, date, view, firstDayOfWeek, false);

  /* keyboard navigation */

  const keyboardNavigation = useCalendarKeyboardNavigation({
    rootRef,

    date,
    view,
    firstDayOfWeek,

    focusedDate: focus.activeDate,
    onFocusedDateChange: focus.focus,

    onDateChange,
  })

  /* day click */
  const handleDayClick = (clickedDate: CalendarDate) => {
    const isSelected =
      selectionEnabled &&
      currentSelectedDate === clickedDate

    if (isSelected) {
      changeSelection(null)

      if (focus.focusedDate === clickedDate) {
        focus.focus(null)

        rootRef.current
          ?.querySelector<HTMLButtonElement>(
            `button[data-calendar-day][data-date="${clickedDate}"]`,
          )
          ?.blur()
      }
    } else {
      if (arrowNavEnabled) {
        focus.focus(clickedDate)
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

    if (
      dayButton.dataset.date === currentSelectedDate &&
      focus.focusedDate !== currentSelectedDate
    ) {
      event.preventDefault()
    }
  }

  /* dismiss */
  const handleDismiss = useCallback(() => {
    keyboardNavigation.cancelPendingFocus();

    if (  focus.focusedDate !== null) {
      const isSameDate =
        focus.focusedDate === currentSelectedDate

      focus.focus(null)
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
    keyboardNavigation.cancelPendingFocus,
    focus.focusedDate,
    currentSelectedDate,
    selectionEnabled,
    changeSelection,
  ])

  const handleCalendarKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.defaultPrevented) {
      return
    }

    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const isDayButton = Boolean(
      target.closest('button[data-calendar-day]'),
    )

    // ESCAPE
    if (event.key === 'Escape') {
      if (
        target.closest(
          'input, textarea, select, [contenteditable="true"], [role="dialog"]',
        )
      ) {
        return
      }

      const hasFocus = focus.focusedDate !== null

      const hasSelection =
        selectionEnabled &&
        currentSelectedDate !== null

      if (!hasFocus && !hasSelection) {
        return
      }

      handleDismiss()

      event.preventDefault()
      event.stopPropagation()

      event.currentTarget.focus({
        preventScroll: true,
      })

      return
    }

    // ENTER + SPACE
    if (
      isDayButton &&
      !keySelectionEnabled &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault()
      return
    }

    // ARROWS
    if (arrowNavEnabled) {
      keyboardNavigation.onKeyDown(event)
    }
  }

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: navigation.goNext,
    onSwipeRight: navigation.goPrevious,
  })

  /* render */
  return (
    <div
      ref={rootRef}
      tabIndex={-1}
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
          : undefined
      }
    >
      <Toolbar
        view={view}
        periodLabel={periodLabel}
        todayDisabled={isTodayVisible}
        onViewChange={onViewChange}
        onPrevious={navigation.goPrevious}
        onToday={navigation.goToday}
        onNext={navigation.goNext}
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
            focusedDate={focus.activeDate}
            tabStopDate={ focus.tabStopDate}
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
            focusedDate={focus.activeDate}
            tabStopDate={ focus.tabStopDate}
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
            focusedDate={focus.activeDate}
            tabStopDate={ focus.tabStopDate}
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
            focusedDate={focus.activeDate}
            tabStopDate={ focus.tabStopDate}
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}
      </div>
    </div>
  )
}
