import type { Meta, StoryObj } from '@storybook/react-vite'

import { MonthView } from './MonthView'
import { withCalendarProvider } from '../../stories/withCalendarProvider'

const meta = {
  title: 'Calendar/MonthView',
  component: MonthView,

  decorators: [withCalendarProvider('month')],
} satisfies Meta<typeof MonthView>

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
        ? <span>2 události</span>
        : null,
  },
}