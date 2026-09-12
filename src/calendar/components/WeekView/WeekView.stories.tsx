import type { Meta, StoryObj } from '@storybook/react-vite'

import { WeekView } from './WeekView'

const meta = {
  title: 'Calendar/WeekView',
  component: WeekView,
} satisfies Meta<typeof WeekView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '2026-09-12',
    firstDayOfWeek: 1,
    onDayClick: () => {},
  },
}