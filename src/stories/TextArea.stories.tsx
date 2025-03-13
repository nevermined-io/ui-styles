import { TextArea } from "@/ui/TextArea"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Components/Textarea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    onChange: { action: "changed" },
  },
  args: {},
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Description...",
    disabled: false,
    "aria-invalid": false,
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "This is disabled...",
    disabled: true,
    "aria-invalid": false,
    onChange: () => {},
  },
}

export const WithError: Story = {
  args: {
    placeholder: "This field has an error...",
    disabled: false,
    "aria-invalid": true,
    onChange: () => {},
  },
}
