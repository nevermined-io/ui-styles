import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '@/ui/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'dropdown',
    title: 'Dropdown',
  },
};

export const WithItems: Story = {
  args: {
    id: 'dropdown',
    title: 'Dropdown',
    onItemSelected: (value) => console.log(value),
    items: [
      {
        text: 'Item 1',
      },
      {
        text: 'Item 2',
      },
      {
        text: 'Item 3',
      },
    ],
  },
};

export const WithChildren: Story = {
  args: {
    id: 'dropdown',
    title: 'Dropdown',
    children: ({ isMenuOpen, closeMenu }) => (
      <div
        css={[
          { display: 'none', position: 'absolute' },
          isMenuOpen && [
            {
              display: 'block',
              zIndex: 1,
              background: '#fff',
              border: 'none',
              minWidth: '300px',
              boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
              left: 0,
              top: 30,
            },
          ],
        ]}
      >
        Menu content
        <button onClick={closeMenu}>Close</button>
      </div>
    ),
  },
};

export const WithButtonRenderer: Story = {
  args: {
    id: 'dropdown',
    title: 'Dropdown',
    buttonRenderer: ({ ref, clickHandler }) => (
      <button ref={ref} onClick={clickHandler}>
        Custom button
      </button>
    ),
    children: ({ isMenuOpen, closeMenu }) => (
      <div
        css={[
          { display: 'none', position: 'absolute' },
          isMenuOpen && [
            {
              display: 'block',
              zIndex: 1,
              background: '#fff',
              border: 'none',
              minWidth: '300px',
              boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
              left: 0,
              top: 30,
            },
          ],
        ]}
      >
        Menu content
        <button onClick={closeMenu}>Close</button>
      </div>
    ),
  },
};
