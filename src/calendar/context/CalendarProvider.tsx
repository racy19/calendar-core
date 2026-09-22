import type { ReactNode } from 'react'

import type {
  CalendarTranslations,
  FirstDayOfWeek,
} from '../types/calendar'

import { CalendarContext } from './CalendarContext'

import { csTranslations } from '../locale/cs'
import { enTranslations } from '../locale/en'
import { deTranslations } from '../locale/de'

interface CalendarProviderProps {
  children: ReactNode
  locale?: string
  firstDayOfWeek?: FirstDayOfWeek
}

const translationsMap: Record<string, CalendarTranslations> = {
  cs: csTranslations,
  en: enTranslations,
  de: deTranslations,
}

export function CalendarProvider({
  children,
  locale,
  firstDayOfWeek = 1,
}: CalendarProviderProps) {
  const requestedLocale =
    locale ??
    (typeof navigator !== 'undefined'
      ? navigator.language
      : 'cs-CZ')

  const language = requestedLocale.split('-')[0].toLowerCase()

  const translations = translationsMap[language] ?? csTranslations

  const resolvedLocale = translationsMap[language]
    ? requestedLocale
    : 'cs-CZ'

  return (
    <CalendarContext.Provider
      value={{
        locale: resolvedLocale,
        firstDayOfWeek,
        translations,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}