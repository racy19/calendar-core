import { useState } from 'react'
import { Calendar } from './calendar'
import type { CalendarView } from './calendar/types/calendar'

function App() {
  const [view, setView] = useState<CalendarView>('month')

  return (
    <main>
      <Calendar
        view={view}
        onViewChange={setView}
      />
    </main>
  )
}

export default App