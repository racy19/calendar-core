import { useState } from 'react'
import { Calendar } from './calendar'
import type { CalendarAccent, CalendarDate, CalendarTheme, CalendarView } from './calendar/types/calendar'
import { getToday } from './calendar/core/date';

function App() {
  const [view, setView] = useState<CalendarView>('month');
  const [date, setDate] = useState<CalendarDate>(getToday());
  const [theme, setTheme] = useState<CalendarTheme>('light')
  const [accent, setAccent] = useState<CalendarAccent>('gray')

  return (
    <main>
      <select
        value={theme}
        onChange={(event) =>
          setTheme(event.target.value as CalendarTheme)
        }
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <select
        value={accent}
        onChange={(event) =>
          setAccent(event.target.value as CalendarAccent)
        }
      >
        <option value="gray">Gray</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
      <Calendar
        view={view}
        date={date}
        theme={theme}
        accent={accent}
        onViewChange={setView}
        onDateChange={setDate}
        onDayClick={(date) => {
          console.log('Clicked day:', date)
        }}
      />
    </main>
  )
}

export default App