import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { css, SerializedStyles } from "@emotion/react"

interface CssStyledProps {
  cssStyle?: SerializedStyles
}

const labelStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
})

function Label({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      css={[labelStyle, cssStyle]}
      {...props}
    />
  )
}

export { Label }
