import Row from '@/ui/Row'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Row',
  component: Row,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cssStyle: { control: 'object' },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'header', 'footer'],
    },
  },
} satisfies Meta<typeof Row>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Row component',
    cssStyle: {
      backgroundColor: '#f0f0f0',
      padding: '16px',
    },
  },
}

export const CustomElement: Story = {
  args: {
    children: 'This is a custom Row with an article element',
    as: 'article',
    cssStyle: {
      backgroundColor: '#d3d3d3',
      padding: '20px',
    },
  },
}

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>
    ),
    cssStyle: {
      backgroundColor: '#e0e0e0',
      padding: '12px',
      gap: '100px',
    },
  },
}
