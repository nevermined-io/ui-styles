/** @jsxImportSource @emotion/react */
import * as React from "react"
import { css } from "@emotion/react"
import { CircleCheck, TriangleAlert } from "lucide-react"

const successBackground = "#d4edda" // Açık yeşil
const errorBackground = "#f8d7da" // Açık kırmızı

const alertBaseStyles = css({
  padding: "12px 16px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
})

const successStyles = css`
  background-color: ${successBackground};
  color: #155724;
  border: 1px solid #c3e6cb;
`

const errorStyles = css`
  background-color: ${errorBackground};
  color: #721c24;
  border: 1px solid #f5c6cb;
`

function Alert({
  variant = "success",
  message,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "success" | "error"
  message: string
}) {
  return (
    <div
      role="alert"
      css={[
        alertBaseStyles,
        variant === "success" ? successStyles : errorStyles,
      ]}
      {...props}
    >
      <div css={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div>{variant === "success" ? <CircleCheck /> : <TriangleAlert />}</div>
        <div css={{ fontWeight: "600" }}>
          {variant === "success" ? <span>Success!</span> : <span>Error!</span>}
        </div>
      </div>

      <div>{message}</div>
    </div>
  )
}

export { Alert }
