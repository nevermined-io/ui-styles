import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Button } from "../ui/Button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Large",
  },
}

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Medium",
  },
}

export const Small: Story = {
  args: {
    size: "small",
    children: "Small",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}
