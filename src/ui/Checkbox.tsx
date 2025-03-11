import {
  checkboxCheckedBackground,
  purple,
  slate,
  white,
} from "@/styles/colors"
import { css, Interpolation, Theme } from "@emotion/react"
import React, { ReactNode } from "react"

type CheckboxProps = {
  checked: boolean
  onChange: () => void
  id?: string
  tabIndex?: number
  label?: ReactNode
  cssStyle?: Interpolation<Theme>
  color?: "purple" | "slate" | "outlined"
  testid?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = ({
  id,
  label,
  tabIndex,
  cssStyle,
  color = "purple",
  disabled,
  testid,
  ...rest
}: CheckboxProps) => {
  const checkbox = (
    <>
      <input
        {...rest}
        id={id}
        type="checkbox"
        tabIndex={tabIndex || -1}
        disabled={disabled}
        css={[
          hiddenCheckboxStyle,
          disabled && checkboxDisabledStyle,
          color === "purple" && purpleCheckedStyle,
          color === "slate" && slateCheckedStyle,
          color === "outlined" && outlinedCheckedStyle,
        ]}
      />
      <span
        css={[
          uncheckedStyle,
          disabled && checkboxDisabledStyle,
          color === "purple" && purpleUncheckedStyle,
          color === "slate" && slateUncheckedStyle,
          color === "outlined" && outlinedUncheckedStyle,
        ]}
      />
    </>
  )

  return label ? (
    <label htmlFor={id} css={[checkboxContainer, cssStyle]}>
      {label}
      {checkbox}
    </label>
  ) : (
    checkbox
  )
}

const uncheckedStyle = css`
  position: absolute;
  left: 0;
  height: 24px;
  width: 24px;
  border-radius: 6px;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: 1px solid ${white};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`

const purpleUncheckedStyle = css({
  backgroundColor: purple,
})

const slateUncheckedStyle = css({
  backgroundColor: slate,
})

const outlinedUncheckedStyle = css({
  backgroundImage:
    "url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuNDY4NiA1Ljk3Njg2VjIyLjcxMjJINi43MzMzMVY1Ljk3Njg2SDIzLjQ2ODZaTTIzLjQ2ODcgMy41ODYxNEg2LjczMzM1QzUuNDE4NDMgMy41ODYxNCA0LjM0MjU5IDQuNjYxOTggNC4zNDI1OSA1Ljk3NjlWMjIuNzEyMkM0LjM0MjU5IDI0LjAyNzEgNS40MTg0MyAyNS4xMDMgNi43MzMzNSAyNS4xMDNIMjMuNDY4N0MyNC43ODM2IDI1LjEwMyAyNS44NTk0IDI0LjAyNzEgMjUuODU5NCAyMi43MTIyVjUuOTc2OUMyNS44NTk0IDQuNjYxOTggMjQuNzgzNiAzLjU4NjE0IDIzLjQ2ODcgMy41ODYxNFoiIGZpbGw9IiM2MzYzNjYiLz4KPC9zdmc+Cg==)",
  backgroundRepeat: "no-repeat",
})

const checkboxContainer = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingLeft: "2rem",
  cursor: "pointer",
  userSelect: "none",
})

const checkboxDisabledStyle = css({
  opacity: 0.2,
  cursor: "not-allowed",
})

const purpleCheckedStyle = css`
  &:checked ~ ${purpleUncheckedStyle.next} {
    background-color: ${checkboxCheckedBackground};

    &:after {
      display: block;
    }
  }
`

const slateCheckedStyle = css`
  &:checked ~ ${slateUncheckedStyle.next} {
    background-color: ${checkboxCheckedBackground};

    &:after {
      display: block;
      left: 9px;
      top: 5px;
      width: 3px;
      height: 7px;
      border: 1px solid #636366;
      border-width: 0 3px 3px 0;
    }
  }
`

const outlinedCheckedStyle = css`
  &:checked ~ ${outlinedUncheckedStyle.next} {
    border: 2px solid #636366;

    &:after {
      display: block;
      left: 9px;
      top: 5px;
      width: 3px;
      height: 7px;
      border: 1px solid #636366;
      border-width: 0 3px 3px 0;
    }
  }
`

const hiddenCheckboxStyle = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`
