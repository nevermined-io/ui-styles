import { inputDisabled, purple, purple20, purple5, red } from '@/styles/colors';
import { errorMessageStyle } from '@/styles/styles';

import { css, type Interpolation, type Theme } from '@emotion/react';
import React, {
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Row from './Row';
import Column from './Column';
import { PlacesType, Tooltip } from '@/ui/tooltip/Tooltip';

export interface InputProps extends HTMLProps<HTMLInputElement> {
  info?: string | null;
  infoPosition?: PlacesType;
  name?: string;
  cssStyle?: Interpolation<Theme>;
  inputWrapperCssStyle?: Interpolation<Theme>;
  inputCssStyle?: Interpolation<Theme>;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  innerLabel?: ReactNode | null;
  innerSecondaryLabel?: ReactNode | null;
  icon?: ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      cssStyle,
      inputWrapperCssStyle,
      inputCssStyle,
      innerLabel,
      innerSecondaryLabel,
      errorMessage,
      disabled,
      icon,
      info,
      infoPosition,
      required,
      value,
      isInvalid,
      ...rest
    }: InputProps,
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [active, setActive] = useState(false);
    const [raisedLabel, setRaisedLabel] = useState(!!(active || value));

    useEffect(() => {
      setRaisedLabel(!!(active || value));
    }, [active, value]);

    const onCreditsChanged = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        if (
          e.currentTarget.type === 'number' &&
          e.currentTarget.min &&
          e.currentTarget.max
        ) {
          e.currentTarget.value = Math.max(
            Number(e.currentTarget.min),
            Math.min(Number(e.currentTarget.max), Number(e.currentTarget.value))
          ).toString();
        }
        rest.onChange?.(e);
      },
      [rest.onChange]
    );

    return innerLabel ? (
      <Column cssStyle={[inputRowContainerStyle, cssStyle]}>
        <Row>
          <Row
            css={[
              baseStyle,
              active && inputWithInnerLabelActiveStyle(!!errorMessage),
              disabled && disabledStyle,
              (errorMessage || isInvalid) && inputInvalidStyle,
              !!icon && inputWithIconStyle,
              inputWrapperCssStyle,
            ]}
          >
            {innerLabel && (
              <label
                css={[
                  innerLabelStyle,
                  raisedLabel && raisedInnerLabelStyle,
                  disabled && { color: 'rgba(255, 255, 255, 0.3)' },
                ]}
                htmlFor={name}
              >
                {innerLabel}
                {innerSecondaryLabel && (
                  <span css={requiredLabelStyle}>{innerSecondaryLabel}</span>
                )}
                {required && <>*</>}
              </label>
            )}
            <input
              ref={ref}
              name={name}
              css={[
                inputWithInnerLabelStyle,
                disabled && disabledStyle,
                inputCssStyle,
              ]}
              disabled={disabled}
              value={value}
              {...rest}
              onChange={onCreditsChanged}
              placeholder=""
              onFocus={(e) => {
                rest.onFocus?.(e);
                setActive(true);
                setRaisedLabel(true);
              }}
              onBlur={(e) => {
                rest.onBlur?.(e);
                setActive(false);
                setRaisedLabel(!!inputRef.current?.value?.length);
              }}
            />
            {icon}
          </Row>
          {info && infoPosition && (
            <Tooltip
              cssStyle={css({
                marginLeft: 18,
              })}
              place={infoPosition}
              showIcon
            >
              {info}
            </Tooltip>
          )}
        </Row>
        {errorMessage && <span css={errorMessageStyle}>{errorMessage}</span>}
      </Column>
    ) : (
      <>
        <Row css={[{ gap: 10 }, cssStyle]}>
          <Row css={[cssStyle, !!icon && inputWithIconStyle]}>
            <input
              ref={ref}
              name={name}
              css={[
                baseStyle,
                (errorMessage || isInvalid) && inputInvalidStyle,
                disabled && disabledStyle,
                inputCssStyle,
              ]}
              disabled={disabled}
              value={value}
              {...rest}
              onChange={onCreditsChanged}
            />
            {icon}
          </Row>
          {info && infoPosition && (
            <Tooltip
              cssStyle={css({
                marginLeft: 5,
              })}
              place={infoPosition}
              showIcon
            >
              {info}
            </Tooltip>
          )}
        </Row>
        {errorMessage && <span css={errorMessageStyle}>{errorMessage}</span>}
      </>
    );
  }
);

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

const inputInvalidStyle = css({
  boxShadow: `0 0 0 1px  #FF5F5F`,
  border: `1px solid transparent`,
});

export const inputWithInnerLabelActiveStyle = (isInvalid = false) =>
  css({
    boxShadow: `0 0 0 2px ${isInvalid ? red : purple}`,
    backgroundColor: purple5,
  });

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

const raisedInnerLabelStyle = css({
  top: '25px',
  transform: 'translateY(-150%)',
  fontSize: '10px',
});

const inputWithInnerLabelStyle = css({
  ...commonBorderStyle,
  outline: 'none',
  border: 'none',
  display: 'block',
  background: 'transparent',
  padding: '8px 16px 0',
  width: '100%',
  height: '100%',
  fontSize: 15,
});

const disabledStyle = css({
  color: 'rgba(0, 0, 0, 0.3)',
  backgroundColor: inputDisabled,
});

const inputWithIconStyle = css({
  position: 'relative',
});

const inputRowContainerStyle = css({
  alignSelf: 'stretch',
  width: '100%',
  gap: 10,
  alignItems: 'flex-start',
});

const requiredLabelStyle = css({
  color: 'rgba(0, 0, 0, 0.5)',
});
