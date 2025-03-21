import { SerializedStyles, css } from '@emotion/react'
import React, { AriaAttributes, ComponentPropsWithRef, HTMLAttributes, ReactNode } from 'react'

type Ref = HTMLElement | SVGElement

export interface ColumnProps
  extends AriaAttributes,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentPropsWithRef<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HTMLAttributes<any> {
  cssStyle?: SerializedStyles
  children: ReactNode
  as?: React.ElementType
}

const Column = React.memo(
  React.forwardRef<Ref, ColumnProps>(({ cssStyle, children, as = 'div', ...rest }, ref) => {
    const Component = as

    return (
      <Component ref={ref} css={css(columnStyle, cssStyle)} {...rest}>
        {children}
      </Component>
    )
  }),
)
const columnStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})

Column.displayName = 'Column'
export default Column
