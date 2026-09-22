import { createContext } from 'react'

import type {
  CalendarTranslations,
  FirstDayOfWeek,
} from '../types/calendar'

export interface CalendarContextValue {
  locale: string
  firstDayOfWeek: FirstDayOfWeek
  translations: CalendarTranslations
}

export const CalendarContext =
  createContext<CalendarContextValue | null>(null)