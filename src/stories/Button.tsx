type ButtonProps = {
  primary?: boolean
  label: string
  size?: "small" | "large"
  backgroundColor?: string
  onClick?: () => void
}

const Button = ({
  primary = true,
  label,
  size = "small",
  onClick,
}: ButtonProps) => {
  const buttonStyles = [
    buttonBaseStyle,
    primary ? primaryButtonStyle : secondaryButtonStyle,
    size === "small"
      ? smallButtonStyle
      : size === "large"
      ? largeButtonStyle
      : null,
  ]

  return (
    <button css={buttonStyles} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button

// Button.styles.ts
import { css } from "@emotion/react"

export const buttonBaseStyle = css`
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;

  &:focus {
    outline: none;
  }
`

export const primaryButtonStyle = css`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`

export const secondaryButtonStyle = css`
  background-color: #ccc;

  &:hover {
    background-color: #999;
  }
`

export const smallButtonStyle = css`
  padding: 8px 16px;
  font-size: 14px;
`

export const largeButtonStyle = css`
  padding: 16px 32px;
  font-size: 18px;
`
