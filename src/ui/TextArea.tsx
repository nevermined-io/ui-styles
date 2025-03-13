import * as React from "react"
import { css, Interpolation } from "@emotion/react"
import { purple } from "@/styles/colors"

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  cssStyle?: Interpolation
}

const textareaStyles = css`
  all: unset;
  min-height: 4rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${purple};
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  cursor: text;
  resize: vertical;

  &:focus-visible {
    border-color: ${purple};
    box-shadow: 0 0 0 3px rgba(${purple}, 0.3);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[aria-invalid="true"] {
    border-color: red;
    box-shadow: 0 0 0 1px rgba(255, 0, 0, 0.2);
  }
`

function TextArea({ ...props }: TextAreaProps) {
  return <textarea data-slot="textarea" css={textareaStyles} {...props} />
}

export { TextArea }
