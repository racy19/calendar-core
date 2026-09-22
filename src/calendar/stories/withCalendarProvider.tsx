import type { Decorator } from '@storybook/react-vite'

import { CalendarProvider } from '../context'
import type {
  CalendarAccent,
  CalendarTheme,
  CalendarView,
  FirstDayOfWeek,
} from '../types/calendar'

import styles from '../components/Calendar/Calendar.module.css'

interface CalendarStoryOptions {
  locale?: string
  firstDayOfWeek?: FirstDayOfWeek
  theme?: CalendarTheme
  accent?: CalendarAccent
}

export function withCalendarProvider(
  view: CalendarView,
  {
    locale = 'cs-CZ',
    firstDayOfWeek = 1,
    theme = 'light',
    accent = 'gray',
  }: CalendarStoryOptions = {},
): Decorator {
  return (Story) => (
    <CalendarProvider
      locale={locale}
      firstDayOfWeek={firstDayOfWeek}
    >
      <div
        className={styles.calendar}
        data-theme={theme}
        data-accent={accent}
        data-view={view}
      >
        <Story />
      </div>
    </CalendarProvider>
  )
}