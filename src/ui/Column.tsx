import { SerializedStyles, css } from "@emotion/react"
import React, {
  AriaAttributes,
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
} from "react"

type Ref = HTMLElement | SVGElement
interface ColumnProps
  extends AriaAttributes,
    ComponentPropsWithRef<any>,
    HTMLAttributes<any> {
  cssStyle?: SerializedStyles
  children: ReactNode
  as?: React.ElementType
}

const Column = React.memo(
  React.forwardRef<Ref, ColumnProps>(
    ({ cssStyle, children, as = "div", ...rest }, ref) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Component = as

      return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        <Component ref={ref} css={css(columnStyle, cssStyle)} {...rest}>
          {children}
        </Component>
      )
    }
  )
)
const columnStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
})

Column.displayName = "Column"
export default Column
