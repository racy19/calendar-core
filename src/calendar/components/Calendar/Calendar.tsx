import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { getToday } from '../../core/date'
import { formatPeriodLabel } from '../../core/format'
import { getNextDate, getPreviousDate } from '../../core/navigation'
import type { CalendarAccent, CalendarDate, CalendarTheme, CalendarView, FirstDayOfWeek } from '../../types/calendar'
import { DayView } from '../DayView'
import { MonthView } from '../MonthView'
import { Toolbar } from '../Toolbar'
import { WeekView } from '../WeekView'
import { YearView } from '../YearView/YearView'
import styles from './Calendar.module.css'
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation'
import { CalendarProvider, useCalendarContext } from '../../context'

interface CalendarProps {
  view: CalendarView
  date: CalendarDate

  selectionEnabled?: boolean
  selectedDate?: CalendarDate | null
  defaultSelectedDate?: CalendarDate | null

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
  view,
  date,
  selectionEnabled = true,
  selectedDate,
  defaultSelectedDate = null,
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

  const handleDayClick = (clickedDate: CalendarDate) => {
    if (selectionEnabled) {
      changeSelection(
        currentSelectedDate === clickedDate
          ? null
          : clickedDate,
      )
    }

    onDayClick?.(clickedDate)
  }

  /* nav handlers */
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

  /* selection reset on outside click or escape key */
  useEffect(() => {
    if (!selectionEnabled || currentSelectedDate === null) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        changeSelection(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      if (
        rootRef.current?.contains(document.activeElement)
      ) {
        changeSelection(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    selectionEnabled,
    currentSelectedDate,
    changeSelection,
  ])

  /* render */
  return (
    <div
      ref={rootRef}
      className={styles.calendar}
      data-theme={theme}
      data-accent={accent}
      data-view={view}
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
              selectionEnabled ? currentSelectedDate : null
            }
          />
        )}
        {view === 'month' && (
          <MonthView
            date={date}
            selectedDate={
              selectionEnabled ? currentSelectedDate : null
            }
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            date={date}
            selectedDate={
              selectionEnabled ? currentSelectedDate : null
            }
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}
        {view === 'day' && (
          <DayView
            date={date}
            selectedDate={
              selectionEnabled ? currentSelectedDate : null
            }
            renderDayContent={renderDayContent}
            onDayClick={handleDayClick}
          />
        )}
      </div>
    </div>
  )
}