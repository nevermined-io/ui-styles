import { black, white, buttonPrimary, buttonSecondary, red } from './colors';
import {
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_MOBILE_OR_TABLET,
} from './breakpoints';
import { css, keyframes } from '@emotion/react';

export const maxViewportWidth = '1440px';

export const sideGutter = '2.5rem';

export const fontSizeBase = '100%';
export const lineHeightBase = 1.65;

export const headingFontWeight = 'normal';
export const headingLineHeight = 1.25;

export const subheadingFontWeight = 600;
export const subheadingFontSize = '16px';
export const subheadingLineHeight = 1.07;

export const h1FontSize = '42px';
export const h1FontWeight = 500;
export const h1LetterSpacing = '-1px';

export const h2FontSize = '24px';
export const h2FontWeight = 500;

export const h3FontSize = '18px';
export const h3FontWeight = 500;

export const linkColor = '';
export const linkHoverColor = '';
export const linkTransitionFast = '200ms';
export const linkTransitionTimingDefault = 'cubic-bezier(0.08, 0.52, 0.52, 1)';

export const paragraphLargeFontSize = '16px';
export const paragraphLargeLineHeight = 1.25;

export const paragraphSmallFontSize = '14px';
export const paragraphSmallLineHeight = 1.5;
export const paragraphSmallLetterSpacing = '0.02em';

export const navbarLinkFontFamily = 'Exo';
export const navbarLinkFontSize = '16px';
export const navbarLinkFontWeight = 500;
export const navbarLinkLetterSpacing = '-0.01em';

export const formValidationFontSize = '11px';

export const buttonLargeFontSize = '16px';
export const buttonLargeFontWeight = 500;

export const buttonSmallFontSize = '14px';
export const buttonSmallFontWeight = 500;

export const buttonLabelFontSize = '13px';
export const buttonLabelFontWeight = 400;
export const buttonLabelLineHeight = 1.5;

export const preFontSize = '14px';
export const preLineHeight = 1.4;

export const footerHeight = 245;

export const textHoverUnderline = css({
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '7%',
    borderRadius: '2px',
    left: '0',
    bottom: '-2px',
    transform: 'scale(0)',
    transition: 'transform .3s ease-in-out',
    transformOrigin: 'right',
  },

  '&:hover': {
    '&::after': {
      transform: 'scale(1)',
      transformOrigin: 'left',
    },
  },
});

export const BASE_PADDING = 48;
export const screenReaderOnlyCss = css({
  position: 'absolute',
  left: -10_000,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden',
});

export const flexStyle = css({ display: 'flex' });

export const flexRowStyle = css({
  display: 'flex',
  flexDirection: 'row',
});

export const roundedBorder = css({
  borderRadius: 24,
});

export const hideOnMobile = css({
  [WHEN_MOBILE]: {
    display: 'none',
  },
});

export const hideDesktop = css({
  [WHEN_DESKTOP]: {
    display: 'none',
  },
});

export const cardShadow = css({
  boxShadow: `0px 0px 8px rgba(46, 51, 56, 0.2)`,
});

export const softShadowStyle = css({
  boxShadow: `0px 0px 16px rgba(46, 51, 56, 0.1)`,
});

export const subShadowStyle = css({
  boxShadow: '0px 5px 20px 0px rgba(116, 113, 106, 0.1)',
});

export const inputCommonStyle = css(roundedBorder, 'Exo', subShadowStyle, {
  borderWidth: 1,
  width: '100%',
  padding: 12,
  '&:focus': {
    outline: 0,
    boxShadow: 'inset 0px 0px 4px 0px rgba(2,97,166,0.9)',
  },
});

export const hide = css({ display: 'none' });

export const enum ZINDEX {
  OVERLAY = 100_000,
  FAR_FRONT = 10_000,
  FRONT = 1000,
  MIDDLE = 100,
  BACK = 10,
  FAR_BACK = 1,
}

export const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const pageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const pageContainerRowStyle = css`
  ${pageContainerStyle}
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
`;

export const pageContentStyle = css`
  width: 400px;

  ${WHEN_MOBILE_OR_TABLET} {
    width: 100%;
  }
`;

export const pageTitleStyle = css`
  margin-bottom: 2rem;
`;

export const pageSubtitleStyle = css`
  padding-top: 8px;
  line-height: 1.5rem;
`;

export const primaryButtonStyle = css`
  color: ${white};
  background: ${buttonPrimary};
  padding: 11px 23px;
  border-radius: 28px;
  border-width: 0;
  font-size: 1rem;
  line-height: 1rem;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  gap: 12px;
  word-wrap: unset;
`;

export const secondaryButtonStyle = css`
  color: ${black};
  background-color: ${buttonSecondary};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.875rem 1.5rem;
  border-radius: 56px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  display: inline-block;
`;

export const dropdownPrimaryButtonStyle = css`
  ${primaryButtonStyle}
  background-color: ${primaryButtonStyle};
  color: ${black};
`;

const animationSpinKeyframes = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

export const animationSpin = css`
  animation-delay: -1ms;
  animation-duration: 1ms;
  animation-iteration-count: 1;
  transition-delay: 0s;
  transition-duration: 0s;
  animation-name: ${animationSpinKeyframes};
  animation-direction: normal;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(8);
`;

export const centerTextStyle = css({
  textAlign: 'center',
  padding: '50px 0 36px',
});

export const tabBodyStyle = css({
  borderBottom: '1px solid rgba(197, 197, 197, 0.8);',
  borderLeft: '1px solid rgba(197, 197, 197, 0.8);',
  borderRight: '1px solid rgba(197, 197, 197, 0.8);',
  width: '100%',
  display: 'grid',
  borderRadius: '0 0 16px 16px',
});

export const newAssetStyle = css({
  position: 'relative',
  justifyContent: 'flex-start',
  gap: '1rem',
});

export const stepContentStyle = css(
  `
  gap: 5rem;
  justify-self: center;
  margin-bottom: 40px;

  ${WHEN_MOBILE_OR_TABLET} {
    gap: 3rem;
  }
`
);

export const viewPageContainerStyle = css`
  display: flex;
  margin-top: 30px;
  width: 100%;
`;

export const viewPageStyle = css`
  flex: 1 1 auto;
`;

export const rowStyle = css`
  display: flex;
  gap: 2rem;
`;

export const columnStyle = css`
  flex: 1 1 8%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &:nth-child(2) {
    flex: 1 1 60%;
  }
`;

export const cardPlanStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid rgba(197, 197, 197, 0.8);
  border-radius: 15px;
  gap: 1rem;
`;

export const cardPlanHeaderStyle = css`
  height: 150px;
  position: relative;
`;

export const cardPlanBodyStyle = css`
  padding: 20px;
`;

export const cardPlanBodyTopStyle = css`
  margin-bottom: 22px;
  display: flex;
  justify-content: space-between;
`;

export const fieldStyle = css({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  letterSpacing: '-0.02em',
  lineHeight: '21px',
});

export const fieldVerticalStyle = css`
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

export const gutter = '2.5rem';

export const gutterMobileOrTablet = '1rem';

export const turnRowDirectionStyle = css({
  flexDirection: 'row',
});

export const linkStyle = css({
  textDecoration: 'underline',
  alignItems: 'baseline',
  '&:hover': {
    textDecoration: 'none',
  },
});

export const errorMessageStyle = css({
  color: red,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: '-2%',
});

export const dropdownMenuStyle = css({
  position: 'absolute',
  right: 0,
  zIndex: -1,
  display: 'none',
  inset: '0px 0px auto auto',
  margin: 0,
  padding: 0,
  backgroundColor: white,
  transform: 'translate3d(0px, 3rem, 0px)',
  textAlign: 'center',
  listStyle: 'none',
  border: '1px solid #dcdcdc',
  minWidth: '100%',
});

export const loadingOverlayStyle = css({
  width: '100%',
  height: '100%',
  zIndex: 1,
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 'inherit',
});

export const spinnerStyle = css({
  position: 'relative',
  height: 100,
});
