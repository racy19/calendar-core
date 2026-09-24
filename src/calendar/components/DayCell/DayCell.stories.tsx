import type { Meta, StoryObj } from '@storybook/react-vite'

import { DayCell } from './DayCell'
import { withCalendarProvider } from '../../stories/withCalendarProvider'

const meta = {
  title: 'Calendar/DayCell',
  component: DayCell,

  decorators: [withCalendarProvider('month')],
} satisfies Meta<typeof DayCell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    day: {
      date: '2026-09-12',
      day: 12,
    },
    isCurrentMonth: true,
    isToday: false,
  },
}

export const Today: Story = {
  args: {
    day: {
      date: '2026-09-12',
      day: 12,
    },
    isCurrentMonth: true,
    isToday: true,
  },
}

export const OutsideMonth: Story = {
  args: {
    day: {
      date: '2026-08-31',
      day: 31,
    },
    isToday: false,
    isCurrentMonth: false,
  },
}

export const WithContent: Story = {
  args: {
    day: {
      date: '2026-09-12',
      day: 12,
    },
    isCurrentMonth: true,

    children: <span>2 události</span>,
  },
}

export const Selected: Story = {
  args: {
    day: {
      date: '2026-09-12',
      day: 12,
    },
    isSelected: true,
    isCurrentMonth: true,
  },
}