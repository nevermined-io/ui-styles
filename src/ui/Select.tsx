import ChevronIcon from '@/assets/icons/chevron.svg?react'
import { css, Interpolation, Theme } from '@emotion/react'
import { HTMLAttributes, HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import { Input } from './Input'
import { greyMedium, inputDisabled, purple15, white } from '@/styles/colors'

export type SelectOption = {
  text: string
  value: string
  disabled?: boolean
  testid?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & { [key: string]: any }

export interface SelectProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'placeholder' | 'type' | 'children'> {
  testid?: string
  name: string
  onSelectedValue: (option: string | number) => void
  defaultValue?: string
  options: SelectOption[]
  optionProps?: HTMLAttributes<HTMLButtonElement>
  cssStyle?: Interpolation<Theme>
  containerCssStyle?: Interpolation<Theme>
  dropdownMenuCssStyle?: Interpolation<Theme>
  searchable?: boolean
  placeholder?: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
  optionRenderer?: (option: SelectOption) => React.ReactNode
  requiredLabel?: string
}

export const Select = ({
  options,
  optionProps,
  defaultValue,
  onSelectedValue,
  cssStyle,
  containerCssStyle,
  dropdownMenuCssStyle,
  searchable,
  placeholder,
  required,
  requiredLabel,
  optionRenderer,
  testid,
  disabled,
  ...rest
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownMenuRef = useRef<HTMLDivElement>(null)
  const [searchInputValue, setSearchInputValue] = useState<string | undefined>('')
  const [highlighted, setHighlighted] = useState(-1)
  const [focus, setFocus] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [raisedLabel, setRaisedLabel] = useState<boolean>(false)

  const onSearchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value)
  }

  const highlightOption = (current: number, dir: 'up' | 'down', options: SelectOption[]) => {
    const max = options.length - 1
    let option: SelectOption | null = null
    let i = -1
    let newHighlighted = current

    while (i++ <= max && (!option || option.disabled)) {
      newHighlighted = dir === 'down' ? newHighlighted + 1 : newHighlighted - 1

      if (newHighlighted < 0) {
        newHighlighted = max
      } else if (newHighlighted > max) {
        newHighlighted = 0
      }

      option = options[newHighlighted]
    }

    return newHighlighted
  }

  const onSelect = (v: string) => {
    onSelectedValue(v)

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.blur()
      } else {
        setOpen(false)
      }
    }, 0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key.replace('Arrow', '').toLowerCase()

    if (key === 'down' || key === 'up') {
      e.preventDefault()
      setHighlighted(highlightOption(highlighted, key, visibleOptions))
    }
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      searchInputRef.current?.blur()
    } else if (e.key === 'Enter') {
      e.preventDefault()

      if (visibleOptions[highlighted]) {
        onSelect(visibleOptions[highlighted].value)
      }
    }
  }

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
    setSearchInputValue('')
    setHighlighted(-1)
    setShowInput(false)
  }

  const onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    if (focus) {
      e.preventDefault()
      searchInputRef.current?.blur()
    }
  }

  const selectedOption = useMemo(
    () => (defaultValue ? options.find((o) => o.value === defaultValue) : null),
    [options, defaultValue],
  )

  const visibleOptions = useMemo(() => {
    if (!searchable || !searchInputValue) {
      return options
    }

    return options.filter((o) =>
      o.text.toLocaleLowerCase().includes(searchInputValue?.toLocaleLowerCase()),
    )
  }, [searchable, searchInputValue, options])

  const value = useMemo(
    () => (focus && searchable ? searchInputValue : selectedOption?.text),
    [focus, searchable, searchInputValue, selectedOption],
  )

  useEffect(() => {
    setOpen(focus)
  }, [focus])

  useEffect(() => {
    if (!dropdownMenuRef.current || !selectedOption) {
      return
    }

    const { current } = dropdownMenuRef
    const val = selectedOption?.value

    const selected = current.querySelector(
      highlighted > -1 ? `[data-index="${highlighted}"]` : `[value="${encodeURIComponent(val)}"]`,
    ) as HTMLElement

    if (selected) {
      const rect = current.getBoundingClientRect()
      const selectedRect = selected.getBoundingClientRect()

      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2
    }
  }, [selectedOption, highlighted])

  useEffect(() => {
    if (showInput) {
      searchInputRef.current?.focus()
    }
  }, [showInput])

  useEffect(() => {
    setRaisedLabel(!!value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownButtonRef?.current?.contains(event.target as Node) &&
        !dropdownMenuRef?.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div css={[selectContainerStyle, containerCssStyle]}>
      {searchable && (
        <Input
          {...(testid && { 'data-testid': `${testid}-input` })}
          ref={searchInputRef}
          type="text"
          innerLabel={placeholder}
          value={value}
          onChange={onSearchInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseDown={onMouseDown}
          tabIndex={0}
          required={required}
          inputWrapperCssStyle={[{ visibility: showInput ? 'visible' : 'hidden' }, cssStyle]}
        />
      )}
      {!!(searchable && !showInput) && (
        <div css={{ position: 'absolute', top: 0, width: '100%' }}>
          <div css={{ position: 'relative' }}>
            <label css={[innerLabelStyle, raisedLabel && raisedInnerLabelStyle]}>
              {placeholder}
              {required && (
                <>
                  *<span css={requiredLabelStyle}>{requiredLabel}</span>
                </>
              )}
            </label>
            {options.length <= 1 && (
              <div
                {...(testid && { 'data-testid': `${testid}-menu` })}
                css={[inputStyle, optionWrapperStyle, cssStyle]}
              >
                {!!(optionRenderer && selectedOption) && optionRenderer(selectedOption)}
                {!!(!optionRenderer && selectedOption) && selectedOption.text}
              </div>
            )}
            {options.length > 1 && (
              <button
                {...rest}
                {...(testid && { 'data-testid': `${testid}-button` })}
                ref={dropdownButtonRef}
                tabIndex={0}
                onKeyUp={() => setOpen(!open)}
                onClick={() => {
                  if (searchable) {
                    setShowInput(true)
                    // setFocus(true)
                    return
                  }

                  setOpen(!open)
                }}
                css={[inputStyle, selectStyle, buttonWithInnerLabelStyle, cssStyle]}
              >
                <div css={{ width: '100%' }}>
                  {!!(optionRenderer && selectedOption) && optionRenderer(selectedOption)}
                  {!!(!optionRenderer && selectedOption) && selectedOption.text}
                </div>
                <div css={[caretStyle, open && caretOpenStyle]}>
                  <ChevronIcon />
                </div>
              </button>
            )}
          </div>
        </div>
      )}
      {options.length <= 1 && (
        <div css={[inputStyle, optionWrapperStyle, cssStyle]}>
          {!!(optionRenderer && selectedOption) && optionRenderer(selectedOption)}
          {!!(!optionRenderer && selectedOption) && selectedOption.text}
        </div>
      )}
      {!searchable && options.length > 1 && (
        <button
          {...rest}
          {...(testid && { 'data-testid': `${testid}-button` })}
          ref={dropdownButtonRef}
          tabIndex={0}
          onKeyUp={() => setOpen(!open)}
          onClick={() => (searchable ? setShowInput(true) : setOpen(!open))}
          disabled={disabled}
          css={[
            inputStyle,
            selectStyle,
            { gap: 10, padding: 16 },
            disabled && disabledStyle,
            cssStyle,
          ]}
        >
          <div css={{ width: '100%' }}>
            {!!(optionRenderer && selectedOption) && optionRenderer(selectedOption)}
            {!!(!optionRenderer && selectedOption) && selectedOption.text}
          </div>
          <div css={[caretStyle, open && caretOpenStyle, disabled && disabledIconStyle]}>
            <ChevronIcon />
          </div>
        </button>
      )}
      {open && (
        <div
          ref={dropdownMenuRef}
          css={[dropdownMenuStyle, dropdownMenuCssStyle]}
          onMouseDown={(e) => e.preventDefault()}
        >
          {visibleOptions.map((optionItem, index) => (
            <button
              {...(testid && {
                'data-testid': `${testid}-option-button-${optionItem.text}`,
              })}
              tabIndex={0}
              data-index={index}
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(e.currentTarget.value)
              }}
              css={[optionStyle, highlighted === index && highlightedOptionStyle]}
              key={optionItem.value}
              value={optionItem.value}
              {...optionProps}
            >
              {optionRenderer ? optionRenderer?.(optionItem) : optionItem.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const selectContainerStyle = css({
  position: 'relative',
  zIndex: '1',
})

const innerLabelStyle = css({
  fontSize: 16,
  fontWeight: 400,
  color: greyMedium,
  position: 'absolute',
  top: 28,
  left: 8,
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingRight: 32,
  width: '100%',
  display: 'flex',
  gap: '0.25rem',
})

const raisedInnerLabelStyle = css({
  top: 25,
  transform: 'translateY(-150%)',
  fontSize: '.75em',
})

const requiredLabelStyle = css({
  color: 'rgba(0, 0, 0, 0.5)',
})

const inputStyle = css({
  boxShadow: `0 0 0 1px ${purple15}`,
  borderRadius: 4,
  fontSize: 15,
})

const optionWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: 4,
  padding: '16px 30px 16px 16px',
})

const selectStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: white,
  cursor: 'pointer',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  borderRadius: 4,
  '&:focus': {
    display: 'flex',
    alignItems: 'center',
    boxShadow: `0px 0px 0px 2px ${purple15}`,
  },
  '&:-moz-focusring': {
    color: 'transparent',
    textShadow: '0 0 0 #000',
  },
})

const buttonWithInnerLabelStyle = css({
  padding: '16px 8px 16px',
  width: '100%',
})

const caretStyle = css({
  transform: 'rotate(0deg)',
  transition: 'all 200ms ease-in-out',
  svg: {
    width: '14px',
    height: '10px',
  },
})

const caretOpenStyle = css({
  transform: 'rotate(180deg)',
})

const disabledStyle = css({
  color: 'rgba(0, 0, 0, 0.3)',
  backgroundColor: inputDisabled,
})

const disabledIconStyle = css({
  '& > svg': {
    path: {
      fill: 'rgba(197, 197, 197, 0.5)',
      stroke: 'rgba(197, 197, 197, 0.5)',
    },
  },
})

const dropdownMenuStyle = css({
  background: white,
  width: 'auto',
  minWidth: '100%',
  position: 'absolute',
  boxShadow: `0px 0px 30px 0px ${purple15}`,
  zIndex: '1',
  top: '115%',
  borderRadius: 4,
  overflow: 'hidden',
})

const optionStyle = css({
  padding: 8,
  ':hover': {
    background: '#763EFF1A',
  },
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '21px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

const highlightedOptionStyle = css({
  background: '#f6f6f6',
})
