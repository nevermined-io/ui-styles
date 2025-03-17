import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { css, SerializedStyles } from "@emotion/react"

const badgeStyles = () => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 0.25rem;
  pointer-events: none;
  transition: color 0.2s, box-shadow 0.2s;
  overflow: hidden;
  border: 1px solid transparent;
  background-color: #d9a3ec;
  letter-spacing: 0.5px;

  svg {
    size: 0.75rem;
  }
`

function Badge({
  cssStyle,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  cssStyle?: SerializedStyles
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" css={[badgeStyles, cssStyle]} {...props} />
}

export { Badge }
