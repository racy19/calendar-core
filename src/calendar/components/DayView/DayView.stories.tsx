import type { Meta, StoryObj } from '@storybook/react-vite'

import { DayView } from './DayView'
import { withCalendarProvider } from '../../stories/withCalendarProvider'

const meta = {
  title: 'Calendar/DayView',
  component: DayView,

  decorators: [withCalendarProvider('day')],
} satisfies Meta<typeof DayView>

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

    renderDayContent: () => (
      <span>Posilovna</span>
    ),
  },
}