import { Meta, StoryObj } from "@storybook/react"
import { Alert } from "@/ui/Alert"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

export const SuccessAlert: StoryObj<typeof Alert> = {
  args: {
    variant: "success",
    message: "Your action was successful",
  },
}

export const ErrorAlert: StoryObj<typeof Alert> = {
  args: {
    variant: "error",
    message: "Something went wrong",
  },
}
