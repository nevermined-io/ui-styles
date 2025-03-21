import { Interpolation, Theme, css } from '@emotion/react';
import React, {
  AriaAttributes,
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

type Ref = HTMLElement | SVGElement;
export interface RowProps
  extends AriaAttributes,
    ComponentPropsWithRef<React.ElementType>,
    HTMLAttributes<React.ElementType> {
  cssStyle?: Interpolation<Theme>;
  children?: ReactNode;
  as?: React.ElementType;
  testid?: object;
}

const Row = React.memo(
  React.forwardRef<Ref, RowProps>(
    ({ cssStyle, children, as = 'div', ...rest }: RowProps, ref) => {
      const Component = as;

      return (
        <Component ref={ref} css={[rowStyle, cssStyle]} {...rest}>
          {children}
        </Component>
      );
    }
  )
);
const rowStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

Row.displayName = 'Row';
export default Row;
