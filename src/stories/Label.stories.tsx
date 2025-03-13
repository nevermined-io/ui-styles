import { Label } from "@/ui/Label"
import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/ui/Input"
import { css } from "@emotion/react"

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  render: () => {
    return (
      <div css={{ display: "grid", gap: "8px" }}>
        <Label htmlFor="terms">Email</Label>
        <Input cssStyle={css({ width: "300px" })} />
      </div>
    )
  },
}
