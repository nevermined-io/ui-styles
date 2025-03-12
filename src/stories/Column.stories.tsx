import type { Meta, StoryObj } from "@storybook/react"
import { css } from "@emotion/react"
import Column from "@/ui/Column"

const meta = {
  title: "Components/Column",
  component: Column,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    cssStyle: { control: "object" },
    as: {
      control: { type: "select" },
      options: ["div", "section", "article", "header", "footer"],
    },
  },
} satisfies Meta<typeof Column>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "This is a Column component",
    cssStyle: css({
      backgroundColor: "#f0f0f0",
      padding: "16px",
    }),
  },
}

export const CustomElement: Story = {
  args: {
    children: "This is a custom Column rendered as a section",
    as: "section",
    cssStyle: css({
      backgroundColor: "#d3d3d3",
      padding: "20px",
      borderRadius: "8px",
    }),
  },
}

export const WithMultipleChildren: Story = {
  args: {
    children: (
      <>
        <div>Item 1</div>
        <div>Item 2</div>
      </>
    ),
    cssStyle: css({
      backgroundColor: "#e0e0e0",
      padding: "12px",
      gap: "8px",
    }),
  },
}
