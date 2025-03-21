import { Tooltip } from '@/ui/tooltip/Tooltip'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    place: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    showIcon: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    events: { control: 'check', options: ['hover', 'click', 'focus'] },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a tooltip',
    showIcon: true,
    place: 'top',
  },
}

export const BottomPosition: Story = {
  args: {
    children: 'Tooltip at the bottom',
    showIcon: true,
    place: 'bottom',
  },
}

export const LeftPosition: Story = {
  args: {
    children: 'Tooltip on the left',
    showIcon: true,
    place: 'left',
  },
}

export const RightPosition: Story = {
  args: {
    children: 'Tooltip on the left',
    showIcon: true,
    place: 'right',
  },
}

export const ClickTrigger: Story = {
  args: {
    children: 'Click to see tooltip',
    showIcon: true,
    place: 'right',
    events: ['click'],
  },
}
