import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/ui/Card'
import { css } from '@emotion/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <CardContent>Content Only Card</CardContent>,
  },
}

export const CardHeaderOnly: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>This is the card title</CardTitle>
          <CardDescription>This is the card description</CardDescription>
        </CardHeader>
      </>
    ),
  },
}

export const CardHeaderAndContent: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>This is the card title</CardTitle>
          <CardDescription>This is the card description</CardDescription>
        </CardHeader>
        <CardContent>Card With Content</CardContent>
      </>
    ),
  },
}

export const CardHeaderAndFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>This is the card title</CardTitle>
          <CardDescription>This is the card description</CardDescription>
        </CardHeader>
        <CardContent>Card With Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
}

export const CardCustomContentOnly: Story = {
  args: {
    children: (
      <>
        <CardContent
          cssStyle={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100px',
            width: '300px',
          })}
        >
          <div>Plans</div>
          <div>0 purchased</div>
        </CardContent>
      </>
    ),
  },
}

export const CardWithBorderRadius: Story = {
  args: {
    cssStyle: css({ borderRadius: '12px' }),
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Border Radius</CardTitle>
          <CardDescription>This card has rounded corners</CardDescription>
        </CardHeader>
        <CardContent>Styled Card</CardContent>
      </>
    ),
  },
}
