import { TextArea } from '@/ui/TextArea';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Text area',
    placeholder: 'Description...',
    disabled: false,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    name: 'Text area',
    placeholder: 'This is disabled...',
    disabled: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    name: 'Text area',
    placeholder: 'This field has an error...',
    disabled: false,
    isInvalid: true,
    onChange: () => {},
  },
};
