import * as React from 'react';
import { css, Interpolation, Theme } from '@emotion/react';
import { CircleCheck, TriangleAlert } from 'lucide-react';

const alertBaseStyles = css({
  padding: '12px 16px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px',
});

const successStyles = css`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const errorStyles = css`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

function Alert({
  variant = 'success',
  message,
  cssStyle,
  title,
  ...props
}: React.ComponentProps<'div'> & {
  message: string;
  variant?: 'success' | 'error';
  cssStyle?: Interpolation<Theme>;
  title?: string | React.ReactNode;
}) {
  return (
    <div
      role="alert"
      css={[
        alertBaseStyles,
        cssStyle,
        variant === 'success' ? successStyles : errorStyles,
      ]}
      {...props}
    >
      <div css={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div>{variant === 'success' ? <CircleCheck /> : <TriangleAlert />}</div>
        <div css={{ fontWeight: '600' }}>
          {variant === 'success' ? (
            <span>{title ? title : 'Success!'}</span>
          ) : (
            <span>{title ? title : 'Error!'}</span>
          )}
        </div>
      </div>
      <div>{message}</div>
    </div>
  );
}

export { Alert };
