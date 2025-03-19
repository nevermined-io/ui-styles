import React, { useEffect } from 'react';
import { css, Interpolation, Theme } from '@emotion/react';
import { greyMedium, purple, purple20, purple5, red } from '@/styles/colors';
import { setComponentRefs } from '@/utils';

const commonBorderStyle = {
  borderRadius: 4,
};

const baseStyle = css({
  ...commonBorderStyle,
  border: `1px solid ${purple20}`,
  width: '100%',
  height: 56,
  position: 'relative',
  backgroundColor: 'transparent',
});

const textareaBaseStyle = css({
  ...commonBorderStyle,
  padding: '8px 0px 8px 16px',
  border: `1px solid ${purple}`,
  resize: 'none',
  minWidth: 400,
  width: '100%',
  minHeight: 120,
  position: 'relative',
  '&:focus-visible': {
    borderColor: purple,
    boxShadow: `0 0 0 3px rgba(${purple}, 0.3)`,
  },
  '&::placeholder': {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '&[aria-invalid="true"]': {
    borderColor: red,
    boxShadow: '0 0 0 1px rgba(255, 0, 0, 0.2)',
  },
});

const inputInvalidStyle = css({
  boxShadow: `0 0 0 1px #FF5F5F`,
  border: `1px solid transparent`,
});

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  cssStyle?: Interpolation<Theme>;
  textareaCssStyle?: Interpolation<Theme>;
  required?: boolean;
  requiredLabel?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  autoSize?: boolean;
  testid?: string;
  innerLabel?: React.ReactNode | null;
  secondaryInnerLabel?: React.ReactNode | null;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      cssStyle,
      textareaCssStyle,
      innerLabel,
      errorMessage,
      required,
      requiredLabel,
      autoSize,
      value,
      testid,
      ...rest
    }: TextAreaProps,
    ref
  ) => {
    const [active, setActive] = React.useState(false);
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      if (autoSize && textAreaRef.current) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.current.style.height = '0px';

        const { scrollHeight, style } = textAreaRef.current;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        style.height = `${scrollHeight}px`;
      }
    }, [textAreaRef, value, autoSize]);

    return innerLabel ? (
      <>
        <div
          css={[
            textareaBaseStyle,
            active && inputWithInnerLabelActiveStyle(!!errorMessage),
            errorMessage && inputInvalidStyle,
            cssStyle,
          ]}
          onClick={() => textAreaRef.current?.focus()}
          onKeyDown={() => {}}
        >
          <label
            css={[innerLabelStyle, textareaInnerLabelStyle]}
            htmlFor={name}
          >
            {innerLabel}
            {required && (
              <>
                *
                {requiredLabel && (
                  <span css={requiredLabelStyle}>{requiredLabel}</span>
                )}
              </>
            )}
          </label>
          <textarea
            ref={setComponentRefs(textAreaRef, ref)}
            css={[textAreaWithInnerLabelStyle, textareaCssStyle]}
            value={value}
            {...rest}
            onBlur={(e) => {
              rest.onBlur?.(e);
              setActive(false);
            }}
            onFocus={(e) => {
              rest.onFocus?.(e);
              setActive(true);
            }}
          />
        </div>
        {errorMessage && (
          <span css={[errorMessageStyle, textareaErrorMessageStyle]}>
            {errorMessage}
          </span>
        )}
      </>
    ) : (
      <>
        <textarea
          ref={setComponentRefs(textAreaRef, ref)}
          css={[
            baseStyle,
            errorMessage && inputInvalidStyle,
            cssStyle || textareaCssStyle,
          ]}
          value={value}
          {...rest}
        />
      </>
    );
  }
);

const innerLabelStyle = css({
  fontSize: '14px',
  fontWeight: 400,
  color: '#00003866',
  position: 'absolute',
  top: '28px',
  left: '16px',
  transform: 'translateY(-50%)',
  transition: 'transform 150ms ease-out, font-size 150ms ease-out',
  pointerEvents: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingRight: '32px',
  width: '100%',
  display: 'flex',
  gap: '0.25rem',
});

const textAreaWithInnerLabelStyle = css({
  ...commonBorderStyle,
  outline: 'none',
  border: 'none',
  resize: 'none',
  display: 'block',
  background: 'transparent',
  marginTop: '28px',
  paddingBottom: '10px',
  width: '100%',
  height: 120,
  '&::placeholder': {
    fontSize: 14,
    color: greyMedium,
  },
});

const inputWithInnerLabelActiveStyle = (isInvalid = false) =>
  css({
    boxShadow: `0 0 0 2px ${isInvalid ? red : purple}`,
    backgroundColor: purple5,
  });

const textareaInnerLabelStyle = css({
  top: 22,
});

const requiredLabelStyle = css({
  color: 'rgba(0, 0, 0, 0.5)',
});

const errorMessageStyle = css({
  color: red,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: '-2%',
});

const textareaErrorMessageStyle = css({
  marginTop: 20,
  display: 'block',
});
