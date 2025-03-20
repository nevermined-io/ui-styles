import ExternalLinkIcon from '@/assets/icons/external-link.svg?react';
import { black, buttonLabel, purple, white } from '@/styles/colors';
import {
  buttonLabelFontSize,
  buttonLabelFontWeight,
  buttonLabelLineHeight,
  buttonLargeFontSize,
  buttonLargeFontWeight,
  buttonSmallFontSize,
  buttonSmallFontWeight,
} from '@/styles/styles';
import { Interpolation, Theme, css } from '@emotion/react';
import React, { ReactNode } from 'react';

export interface ButtonCommonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'large' | 'medium' | 'small' | 'label' | 'label-small';
  inactive?: boolean;
  disabled?: boolean;
  css?: Interpolation<Theme>;
  cssStyle?: Interpolation<Theme>;
}

export interface HTMLButtonProps extends React.ButtonHTMLAttributes<unknown> {
  children?: ReactNode;
}

export type ButtonProps = ButtonCommonProps & HTMLButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = 'button',
      cssStyle,
      variant = 'primary',
      size = 'medium',
      inactive = false,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      css={[
        buttonStyle,
        // icon !== undefined && buttonWithIconStyle,
        variant === 'primary' && primaryStyle,
        variant === 'secondary' && secondaryStyle,
        size === 'large' && largeStyle,
        size === 'medium' && mediumStyle,
        size === 'small' && smallStyle,
        size === 'label' && labelStyle,
        size === 'label-small' && labelSmallStyle,
        inactive && labelInactiveStyle,

        cssStyle,
      ]}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
);

interface HTMLAnchorProps extends React.AnchorHTMLAttributes<unknown> {
  children?: ReactNode;
}

type ButtonLinkProps = ButtonCommonProps &
  HTMLAnchorProps & {
    as?: React.ElementType;
    isExternal?: boolean;
    withoutLanguagePrefix?: boolean;
  } & Record<string, unknown>;

export const ButtonLink = ({
  as,
  children,
  cssStyle,
  variant = 'primary',
  size = 'medium',
  inactive = false,
  isExternal,
  ...rest
}: ButtonLinkProps) => {
  const Link = as || 'a';

  return (
    <Link
      css={[
        buttonStyle,
        size === 'large' && largeStyle,
        size === 'medium' && mediumStyle,
        size === 'small' && smallStyle,
        size === 'label' && labelStyle,
        size === 'label-small' && labelSmallStyle,
        inactive && labelInactiveStyle,
        variant === 'primary' && primaryStyle,
        variant === 'secondary' && secondaryStyle,
        cssStyle,
      ]}
      {...rest}
    >
      {children}
      {isExternal && <ExternalLinkIcon css={{ width: 13, height: 13 }} />}
    </Link>
  );
};

const primaryStyle = css({
  color: white,
  backgroundColor: purple,
  '&:hover': {
    backgroundColor: 'rgba(118, 62, 255, 0.6)',
  },
});

const secondaryStyle = css({
  backgroundColor: 'transparent',
  border: `1px solid ${purple}`,
  color: purple,

  'svg path': {
    fill: purple,
  },

  '&:hover svg path': {
    fill: white,
  },

  '&:hover': {
    backgroundColor: 'rgba(118, 62, 255, 0.6)',
    color: white,
  },
});

const largeStyle = css({
  height: '48px',
  padding: '16px 28px',
  fontSize: buttonLargeFontSize,
  fontWeight: buttonLargeFontWeight,
});

const mediumStyle = css({
  height: '42px',
  padding: '16px 28px',
  fontSize: buttonLargeFontSize,
  fontWeight: buttonLargeFontWeight,
});

const smallStyle = css({
  height: '36px',
  padding: '16px 24px',
  fontSize: buttonSmallFontSize,
  fontWeight: buttonSmallFontWeight,
});

const buttonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 56,
  gap: 10,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.2,
  },
});

const labelInactiveStyle = css({
  opacity: 0.5,
});

const labelStyle = css({
  height: '24px',
  fontSize: buttonLabelFontSize,
  fontWeight: buttonLabelFontWeight,
  lineHeight: buttonLabelLineHeight,
  backgroundColor: buttonLabel,
  color: black,
  borderRadius: '40px',
  padding: '0 15px',
});

const labelSmallStyle = css({
  height: '17px',
  fontSize: buttonLabelFontSize,
  fontWeight: buttonLabelFontWeight,
  lineHeight: buttonLabelLineHeight,
  backgroundColor: buttonLabel,
  color: black,
  borderRadius: '40px',
  padding: '0 15px',
});
