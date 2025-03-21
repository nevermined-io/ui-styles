import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselProvider } from '@/ui/Carousel'
import Row from '@/ui/Row'

const CarouselDecorator: Decorator = (Story) => (
  <CarouselProvider>
    <Story />
  </CarouselProvider>
)

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  decorators: [CarouselDecorator],
  argTypes: {},
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    withPagination: false,
    children: [
      <Row>
        <h1>1</h1>
      </Row>,
      <Row>
        <h1>2</h1>
      </Row>,
      <Row>
        <h1>3</h1>
      </Row>,
    ],
  },
}
