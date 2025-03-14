import { Select } from '@/ui/Select';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'select',
    onSelectedValue: (value) => console.log(value),
    options: [
      {
        text: 'Option 1',
        value: 'option1',
      },
      {
        text: 'Option 2',
        value: 'option2',
      },
      {
        text: 'Option 3',
        value: 'option3',
      },
    ],
  },
};

export const WithDefaultValue: Story = {
  args: {
    name: 'select',
    onSelectedValue: (value) => console.log(value),
    defaultValue: 'option2',
    options: [
      {
        text: 'Option 1',
        value: 'option1',
      },
      {
        text: 'Option 2',
        value: 'option2',
      },
    ],
  },
};

export const WithOptionRenderer: Story = {
  args: {
    name: 'select',
    onSelectedValue: (value) => console.log(value),
    optionRenderer: (option) => (
      <div>
        <strong>{option.text}</strong>
        <p>{option.text} description</p>
      </div>
    ),
    options: [
      {
        text: 'Option 1',
        value: 'option1',
      },
      {
        text: 'Option 2',
        value: 'option2',
      },
    ],
  },
};

export const WithSearchableInput: Story = {
  args: {
    name: 'select',
    defaultValue: 'option2',
    onSelectedValue: (value) => console.log(value),
    searchable: true,
    options: [
      {
        text: 'Option 1',
        value: 'option1',
      },
      {
        text: 'Option 2',
        value: 'option2',
      },
    ],
  },
};
