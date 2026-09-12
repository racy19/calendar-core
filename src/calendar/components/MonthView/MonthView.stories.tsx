import type { Meta, StoryObj } from '@storybook/react-vite'

import { MonthView } from './MonthView'

const meta = {
  title: 'Calendar/MonthView',
  component: MonthView,
} satisfies Meta<typeof MonthView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '2026-09-12',
    firstDayOfWeek: 1,
    onDayClick: () => {},
  },
}