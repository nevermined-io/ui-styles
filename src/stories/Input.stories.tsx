// Input.stories.tsx

import { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/ui/Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    errorMessage: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    info: { control: 'text' },
    infoPosition: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    required: false,
    errorMessage: '',
    info: '',
    infoPosition: 'right',
  },
}

export const WithLabel: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    required: true,
    innerLabel: 'Username',
    innerSecondaryLabel: '(min 6 characters)',
    info: '',
    infoPosition: 'right',
  },
}

export const Disabled: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    disabled: true,
    errorMessage: '',
    info: '',
    infoPosition: 'right',
  },
}

export const WithErrorMessage: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    errorMessage: 'Invalid input',
    info: '',
    infoPosition: 'right',
  },
}

export const WithInfoTooltip: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    info: 'This is a helpful hint',
    infoPosition: 'right',
  },
}

export const WithIcon: StoryObj<typeof Input> = {
  args: {
    name: 'inputField',
    value: '',
    icon: <span>🔍</span>, // Example icon
    info: '',
    infoPosition: 'right',
  },
}
