import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { css } from "@emotion/react"

const labelStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
})

function Label({ ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" css={labelStyle} {...props} />
}

export { Label }
