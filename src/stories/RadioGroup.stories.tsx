import { Label } from '@/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/ui/RadioGroup'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">default</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">comfortable</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">compact</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" orientation="horizontal">
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">default</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">comfortable</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">compact</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithOnValueChanged: Story = {
  render: () => (
    <RadioGroup
      defaultValue="comfortable"
      onValueChange={(value) => {
        console.log(value)
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">default</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">comfortable</Label>
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">compact</Label>
      </div>
    </RadioGroup>
  ),
}
