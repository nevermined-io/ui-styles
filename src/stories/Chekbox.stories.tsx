import { Checkbox } from '@/ui/Checkbox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: { checked: false },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: () => {},
  },
}
