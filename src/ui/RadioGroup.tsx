import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { css } from "@emotion/react"
import { purple } from "@/styles/colors"

const radioGroupStyle = css`
  display: grid;
  gap: 12px;
`

const radioItemStyle = css`
  border: 2px solid #000;
  color: #000;
  outline: none;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: color 0.2s, box-shadow 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state="checked"] {
    border-color: #000;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);
  }

  &[aria-invalid="true"] {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }
`

const indicatorStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  color: #000;
`

function RadioGroup({
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      css={radioGroupStyle}
      {...props}
    />
  )
}

function RadioGroupItem({
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      css={radioItemStyle}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        css={indicatorStyle}
      >
        <CircleIcon size={10} fill={purple} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
