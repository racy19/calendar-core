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
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    view: 'month',
    date: '2024-06-01',
    onViewChange: () => {},
    onDateChange: () => {},
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