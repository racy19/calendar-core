import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar } from './Calendar'
import type {
  CalendarDate,
  CalendarView,
} from '../../types/calendar'

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

    onViewChange: () => {},
    onDateChange: () => {},
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