import type { Meta, StoryObj } from '@storybook/react-vite'

import { WeekView } from './WeekView'
import { withCalendarProvider } from '../../stories/withCalendarProvider'

const meta = {
  title: 'Calendar/WeekView',
  component: WeekView,

  decorators: [withCalendarProvider('week')],
} satisfies Meta<typeof WeekView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '2026-09-12',
    onDayClick: () => {},
  },
}

export const WithContent: Story = {
  args: {
    date: '2026-09-12',
    onDayClick: () => {},

    renderDayContent: (date) =>
      date === '2026-09-12'
        ? <span>Trénink</span>
        : null,
  },
}