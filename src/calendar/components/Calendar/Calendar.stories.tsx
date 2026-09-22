import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Calendar } from './Calendar'

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,

  argTypes: {
    view: {
      control: 'select',
      options: ['year', 'month', 'week', 'day'],
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
  },

  render: function Render(args) {
    const [, updateArgs] = useArgs()

    return (
      <Calendar
        {...args}
        onViewChange={(view) => updateArgs({ view })}
        onDateChange={(date) => updateArgs({ date })}
      />
    )
  },
}