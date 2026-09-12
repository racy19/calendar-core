import type { Meta, StoryObj } from '@storybook/react-vite'

import { DayView } from './DayView'

const meta = {
  title: 'Calendar/DayView',
  component: DayView,
} satisfies Meta<typeof DayView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '2026-09-12',
    onDayClick: () => {},
  },
}