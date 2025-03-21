import { Switch } from '@/ui/Switch'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch defaultChecked={false} />
      </div>
    )
  },
}

export const Checked: Story = {
  render: () => {
    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch defaultChecked={true} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch defaultChecked={false} disabled />
      </div>
    )
  },
}
