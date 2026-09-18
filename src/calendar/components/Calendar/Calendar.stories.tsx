import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar } from './Calendar'
import type {
  CalendarDate,
  CalendarView,
} from '../../types/calendar'
import { MockEventChip } from '../../__fixtures__/MockEventChip'
import { mockEvents } from '../../__fixtures__/mockEvents'

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,

  argTypes: {
    view: {
      control: 'select',
      options: ['month', 'week', 'day'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    accent: {
      control: 'select',
      options: ['gray', 'blue', 'green'],
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
    },
    locale: {
      control: 'select',
      options: ['cs-CZ', 'en-US', 'de-DE'],
    },
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    view: 'month',
    date: '2026-09-16',
    theme: 'light',
    accent: 'gray',
    firstDayOfWeek: 1,
    locale: 'cs-CZ',

    onViewChange: () => { },
    onDateChange: () => { },
    onDayClick: (date) => {
      console.log('Clicked day:', date)
    },
  },

  render: (args) => {
    const [view, setView] = useState<CalendarView>(args.view)
    const [date, setDate] = useState<CalendarDate>(args.date)

    return (
      <Calendar
        {...args}
        view={view}
        date={date}
        onViewChange={setView}
        onDateChange={setDate}
      />
    )
  },
}

export const WithMockEvents: Story = {
  args: {
    view: 'month',
    date: '2026-09-01',
    theme: 'dark',
    accent: 'blue',
    firstDayOfWeek: 1,
    locale: 'cs-CZ',

    onViewChange: () => {},
    onDateChange: () => {},
  },

  render: (args) => {
    const [view, setView] = useState<CalendarView>(args.view)
    const [date, setDate] = useState<CalendarDate>(args.date)

    const renderDayContent = (dayDate: CalendarDate) => {
      const dayEvents = mockEvents.filter(
        (event) => event.date === dayDate,
      )

      if (dayEvents.length === 0) {
        return null
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}
        >
          {dayEvents.map((event) => (
            <MockEventChip
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )
    }

    return (
      <Calendar
        {...args}
        view={view}
        date={date}
        onViewChange={setView}
        onDateChange={setDate}
        renderDayContent={renderDayContent}
      />
    )
  },
}