import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type CheckboxProps } from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { css, Interpolation, Theme } from '@emotion/react';
import { purple } from '@/styles/colors';

interface CssStyledProps {
  cssStyle?: Interpolation<Theme>;
}

const checkboxStyles = css`
  all: unset;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${purple};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${purple};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${purple};
    border-color: ${purple};
  }
`;

const indicatorStyles = css`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Checkbox({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      css={[checkboxStyles, cssStyle]}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        css={indicatorStyles}
      >
        <CheckIcon size={16} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, type CheckboxProps };
