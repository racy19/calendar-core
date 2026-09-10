import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'
import { useState } from 'storybook/internal/preview-api'
import type { CalendarView } from '../../types/calendar'

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,
  args: {
    view: 'month',
  },
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
  render: (args) => {
    const [view, setView] = useState<CalendarView>(args.view)

    return (
      <Calendar
        {...args}
        view={view}
        onViewChange={setView}
      />
    )
  },
  args: {
    view: 'month',
    onViewChange: () => {},
  },
}