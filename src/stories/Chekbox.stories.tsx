import { Checkbox } from "@/ui/Checkbox"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    color: { control: "radio", options: ["purple", "slate", "outlined"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "changed" }, // Storybook'un action panelinde gösterilecek
  },
  args: { checked: false },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "checkbox",
    color: "purple",
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    label: "checkbox",
    color: "slate",
    onChange: () => {},
  },
}

export const Outlined: Story = {
  args: {
    label: "checkbox",
    color: "outlined",
    onChange: () => {},
  },
}
