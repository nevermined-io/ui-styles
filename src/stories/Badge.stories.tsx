import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "../ui/Badge" // Adjust the path to your Badge component
import { css } from "@emotion/react"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
}

export default meta

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "Model",
  },
}

export const YellowBadge: StoryObj<typeof Badge> = {
  args: {
    children: "Plan",
    cssStyle: css`
      background-color: #ffdd67;
      color: black;
    `,
  },
}

export const BlueBadge: StoryObj<typeof Badge> = {
  args: {
    children: "Dataset",
    cssStyle: css`
      background-color: #6e8dde;
      color: white;
    `,
  },
}
