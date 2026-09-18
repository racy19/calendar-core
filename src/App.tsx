import { useState } from 'react'
import { Calendar } from './calendar'
import type { CalendarDate, CalendarView } from './calendar/types/calendar'
import { getToday } from './calendar/core/date';

function App() {
  const [view, setView] = useState<CalendarView>('month');
  const [date, setDate] = useState<CalendarDate>(getToday());

  const resolvedLocale = (typeof navigator !== 'undefined' && navigator.language)
    ? navigator.language
    : 'cs-CZ';

  return (
    <main>
      <Calendar
        view={view}
        date={date}
        locale={resolvedLocale}
        onViewChange={setView}
        onDateChange={setDate}
      />
    </main>
  )
}

export default App