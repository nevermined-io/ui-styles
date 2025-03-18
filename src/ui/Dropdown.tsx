import ChevronIcon from '@/assets/icons/chevron.svg?react';
import { white } from '@/styles/colors';
import { css, Interpolation, Theme } from '@emotion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type DropdownItem = {
  text: string;
  onClick?: () => void;
  [key: string]: unknown;
};

export type DropdownCloseMenuActionType = () => void;

export type DropdownChildrenType = (renderProps: {
  isMenuOpen: boolean;
  closeMenu: DropdownCloseMenuActionType;
}) => React.ReactNode;

export type DropdownButtonRendererProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.RefObject<any>;
  clickHandler: DropdownCloseMenuActionType;
  isMenuOpen: boolean;
};

export type DropdownButtonRendererType = (
  props: DropdownButtonRendererProps
) => React.ReactNode;

type DropdownProps = {
  id?: string;
  children?: DropdownChildrenType;
  buttonRenderer?: DropdownButtonRendererType;
  dropdownCssStyle?: Interpolation<Theme>;
  buttonCssStyle?: Interpolation<Theme>;
  menuCssStyle?: Interpolation<Theme>;
  title?: React.ReactNode;
  items?: DropdownItem[];
  onItemSelected?: (item: DropdownItem) => void;
};

export const Dropdown = ({
  id,
  buttonRenderer,
  dropdownCssStyle,
  buttonCssStyle,
  menuCssStyle,
  title,
  items,
  children,
  onItemSelected,
}: DropdownProps) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownContainerRef?.current !== e.target &&
      !dropdownContainerRef?.current?.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const handleButtonClickWrapper = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleMenuItemClickWrapper = useCallback(
    (item: DropdownItem) => (e: React.SyntheticEvent) => {
      e.stopPropagation();

      if (item.onClick) {
        item.onClick();
      } else if (onItemSelected) {
        onItemSelected(item);
      }
    },
    [onItemSelected]
  );

  return (
    <div
      id={id}
      ref={dropdownContainerRef}
      css={[dropdownStyle, dropdownCssStyle]}
    >
      {buttonRenderer ? (
        buttonRenderer({
          ref: dropdownButtonRef,
          clickHandler: handleButtonClickWrapper,
          isMenuOpen,
        })
      ) : (
        <button
          ref={dropdownButtonRef}
          css={[toggleStyle, buttonCssStyle]}
          onClick={handleButtonClickWrapper}
        >
          <span css={titleStyle}>{title}</span>
          <div css={[caretStyle, isMenuOpen && caretOpenStyle]}>
            <ChevronIcon />
          </div>
        </button>
      )}
      {children ? (
        children({
          isMenuOpen,
          closeMenu: () => {
            setIsMenuOpen(false);
          },
        })
      ) : (
        <ul
          css={[
            dropdownMenuStyle,
            isMenuOpen && dropdownMenuOpenStyle,
            menuCssStyle,
          ]}
        >
          {items?.map((item, index) => (
            <li key={`menu-item-${index}`} css={menuItemStyle}>
              <button
                css={menuItemLinkStyle}
                onClick={handleMenuItemClickWrapper(item)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const dropdownMenuStyle = css({
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

const dropdownStyle = css({
  position: 'relative',
  whiteSpace: 'nowrap',
});

const dropdownMenuOpenStyle = css({
  display: 'block',
  zIndex: 1,
});

const toggleStyle = css({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 18,
  height: '100%',
  justifyContent: 'space-between',
});

const titleStyle = css({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const caretStyle = css({
  transform: 'rotate(0deg)',
  transition: 'all 200ms ease-in-out',
});

const caretOpenStyle = css({
  transform: 'rotate(180deg)',
});

const menuItemStyle = css({
  whiteSpace: 'nowrap',
});

const menuItemLinkStyle = css({
  display: 'block',
  padding: '0.5rem 1rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  font: 'var(--nvm-one-font-size-base) / var(--nvm-one-line-height-base) var(--nvm-one-font-family-base)',
});
