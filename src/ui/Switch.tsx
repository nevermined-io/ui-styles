import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { css, SerializedStyles } from '@emotion/react'
import { purple } from '@/styles/colors'

interface CssStyledProps {
  cssStyle?: SerializedStyles
}

const switchRootStyle = css`
  all: unset;
  width: 42px;
  height: 24px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.2s;
  cursor: pointer;

  &[data-state='checked'] {
    background-color: ${purple};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const thumbStyle = css`
  display: block;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
  will-change: transform;

  [data-state='checked'] & {
    transform: translateX(18px);
  }
`

function Switch({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" css={[switchRootStyle, cssStyle]} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" css={thumbStyle} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
