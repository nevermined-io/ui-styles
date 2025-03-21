import InfoIcon from "@/assets/icons/info.svg?react"
import { purple } from "@/styles/colors"

import { css, Interpolation, Theme } from "@emotion/react"
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { computeToolTipPosition, debounce } from "./tooltip-utils"

export type PlacesType = "top" | "right" | "bottom" | "left"

export type WrapperType = ElementType | "div" | "span"

export type ChildrenType = Element | ElementType | ReactNode

export type EventsType = "hover" | "click"

export type PositionStrategy = "absolute" | "fixed"

type TooltipContentProps = React.PropsWithChildren<{
  elementRef?: Element | null
  place?: PlacesType
  events?: EventsType[]
  positionStrategy?: PositionStrategy
  offset?: number
  delayShow?: number
  delayHide?: number
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
  children: ChildrenType
  classNameArrow?: string
  classNameContent?: string
}>

type TooltipProps = React.PropsWithChildren<{
  place?: PlacesType
  events?: EventsType[]
  positionStrategy?: PositionStrategy
  cssStyle?: Interpolation<Theme>
  iconCssStyle?: Interpolation<Theme>
  offset?: number
  delayShow?: number
  delayHide?: number
  isOpen?: boolean
  showIcon?: boolean
  targetElementRef?: Element | null
  setIsOpen?: (value: boolean) => void
  children: ChildrenType
  classNameArrow?: string
  classNameContent?: string
}>

const TooltipContent = ({
  children,
  elementRef,
  events,
  place = "top",
  offset = 10,
  delayShow,
  delayHide,
  isOpen,
  setIsOpen,
  positionStrategy,
  classNameArrow,
  classNameContent,
}: TooltipContentProps) => {
  const tooltipRef = useRef<Element>(null)
  const tooltipArrowRef = useRef<Element>(null)
  const tooltipShowDelayTimerRef = useRef<NodeJS.Timeout>()
  const tooltipHideDelayTimerRef = useRef<NodeJS.Timeout>()
  const [show, setShow] = useState<boolean>(false)
  const [inlineStyles, setInlineStyles] = useState({})
  const [inlineArrowStyles, setInlineArrowStyles] = useState({})

  const handleShow = (value: boolean) => {
    if (setIsOpen) {
      setIsOpen(value)
    } else if (isOpen === undefined) {
      setShow(value)
    }
  }

  const handleShowTooltipDelayed = () => {
    if (tooltipShowDelayTimerRef.current) {
      clearTimeout(tooltipShowDelayTimerRef.current)
    }

    tooltipShowDelayTimerRef.current = setTimeout(() => {
      handleShow(true)
    }, delayShow)
  }

  const handleHideTooltipDelayed = () => {
    if (tooltipHideDelayTimerRef.current) {
      clearTimeout(tooltipHideDelayTimerRef.current)
    }

    tooltipHideDelayTimerRef.current = setTimeout(() => {
      handleShow(false)
    }, delayHide)
  }

  const handleShowTooltip = () => {
    if (delayShow) {
      handleShowTooltipDelayed()
    } else {
      handleShow(true)
    }

    if (tooltipHideDelayTimerRef.current) {
      clearTimeout(tooltipHideDelayTimerRef.current)
    }
  }

  const handleHideTooltip = () => {
    if (delayHide) {
      handleHideTooltipDelayed()
    } else {
      handleShow(false)
    }

    if (tooltipShowDelayTimerRef.current) {
      clearTimeout(tooltipShowDelayTimerRef.current)
    }
  }

  const handleClickTooltipAnchor = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen)
    } else if (isOpen === undefined) {
      setShow((currentValue) => !currentValue)
    }
  }

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      !isOpen ||
      elementRef === (e.target as Node) ||
      tooltipRef.current?.contains(e.target as Node)
    ) {
      return
    }

    if (setIsOpen) {
      setIsOpen(false)
    } else if (isOpen === undefined) {
      setShow(false)
    }
  }

  /**
   * @description debounce handler to prevent call twice when
   * mouse enter and focus events being triggered toggether
   */
  const debouncedHandleShowTooltip = debounce(handleShowTooltip, 50)
  const debouncedHandleHideTooltip = debounce(handleHideTooltip, 50)

  useEffect(() => {
    if (!elementRef) {
       
      return () => {}
    }

    const enabledEvents: { event: string; listener: (e: unknown) => void }[] = []

    if (events) {
      if (events.includes("click")) {
        enabledEvents.push({
          event: "click",
          listener: handleClickTooltipAnchor,
        })

        if (isOpen) {
          document.addEventListener("click", handleDocumentClick, true)
        } else {
          document.removeEventListener("click", handleDocumentClick, true)
        }
      }

      if (events.includes("hover")) {
        enabledEvents.push(
          { event: "mouseenter", listener: debouncedHandleShowTooltip },
          { event: "mouseleave", listener: debouncedHandleHideTooltip },
          { event: "focus", listener: debouncedHandleShowTooltip },
          { event: "blur", listener: debouncedHandleHideTooltip }
        )
      }
    }

    if (elementRef) {
      for (const { event, listener } of enabledEvents) {
        elementRef.addEventListener(event, listener)
      }
    }

    return () => {
      if (elementRef) {
        for (const { event, listener } of enabledEvents) {
          elementRef.removeEventListener(event, listener)
        }
      }
      document.removeEventListener("click", handleDocumentClick, true)
    }
  }, [
    events,
    delayHide,
    delayShow,
    debouncedHandleHideTooltip,
    debouncedHandleShowTooltip,
    isOpen,
    setIsOpen,
    handleDocumentClick,
    handleClickTooltipAnchor,
    elementRef,
  ])

  useEffect(() => {
    void (async () => {
      if (!elementRef || !tooltipRef.current || !tooltipArrowRef.current) {
        return undefined
      }

      try {
        const computedStylesData = await computeToolTipPosition({
          place,
          offset,
          elementReference: elementRef,
          tooltipReference: tooltipRef.current,
          tooltipArrowReference: tooltipArrowRef.current,
          strategy: positionStrategy,
        })

        if (Object.keys(computedStylesData.tooltipStyles).length > 0) {
          setInlineStyles(computedStylesData.tooltipStyles)
        }

        if (Object.keys(computedStylesData.tooltipArrowStyles).length > 0) {
          setInlineArrowStyles(computedStylesData.tooltipArrowStyles)
        }
      } catch {
         
        console.error("Error computing tooltip position")
      }

      return () => {
        tooltipShowDelayTimerRef.current = undefined
        tooltipHideDelayTimerRef.current = undefined
        return undefined
      }
    })()
  }, [show, isOpen, children])

  return (
    <div
      role="tooltip"
      css={[
        tooltipContentStyle,
        Boolean(isOpen || show) && tooltipOpenContentStyle,
        positionStrategy === "fixed" && tooltipFixedContentStyle,
        classNameContent,
      ]}
      style={inlineStyles}
      ref={tooltipRef as React.RefObject<HTMLDivElement>}
    >
      {children}
      <div
        ref={tooltipArrowRef as React.RefObject<HTMLDivElement>}
        css={[tooltipArrowStyle, classNameArrow]}
        style={inlineArrowStyles}
      />
    </div>
  )
}

export const Tooltip = ({
  children,
  cssStyle,
  iconCssStyle,
  isOpen,
  setIsOpen,
  showIcon = false,
  targetElementRef,
  place = "top",
  offset = 10,
  events = ["hover"],
  positionStrategy = "absolute",
  classNameArrow,
  classNameContent,
}: TooltipProps) => {
  const [elementRef, setElementRef] = useState<SVGSVGElement | null>(null)

  return (
    <div css={[tooltipStyle, cssStyle]}>
      {showIcon && (
        <InfoIcon
          css={[{ path: { fill: purple } }, iconCssStyle]}
          {...(targetElementRef ? {} : { ref: (elem) => setElementRef(elem) })}
          tabIndex={0}
        />
      )}
      <TooltipContent
        elementRef={targetElementRef || elementRef}
        events={events}
        place={place}
        offset={offset}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        positionStrategy={positionStrategy}
        classNameArrow={classNameArrow}
        classNameContent={classNameContent}
      >
        {children}
      </TooltipContent>
    </div>
  )
}

type TooltipLayoutProps = {
  title?: string
  description?: string
}

Tooltip.DefaultLayout = function ({ title, description }: TooltipLayoutProps) {
  return (
    <div css={tooltipLayoutStyle}>
      <div css={tooltipLayoutHeaderStyle}>
        <div css={tooltipIconStyle}>
          <InfoIcon />
        </div>
        <div css={tooltipTitleStyle}>{title}</div>
      </div>
      <div css={tooltipDescriptionStyle}>{description}</div>
    </div>
  )
}

Tooltip.CustomLayout = function ({ children }: React.PropsWithChildren) {
  return <div css={tooltipLayoutStyle}>{children}</div>
}

const tooltipStyle = css`
  display: inline-flex;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
`

const tooltipContentStyle = css`
  visibility: hidden;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  color: #eee;
  line-height: 16px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  will-change: opacity, visibility;
  background: #000038;
  box-shadow: -8px 4px 30px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 8px;
  max-width: 300px;
  z-index: 999;
  text-align: left;
`

const tooltipFixedContentStyle = css`
  position: fixed;
`

const tooltipOpenContentStyle = css`
  visibility: visible;
  opacity: 1;
  pointer-events: all;
`

const tooltipLayoutStyle = css`
  max-width: 320px;
`

const tooltipLayoutHeaderStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const tooltipIconStyle = css`
  display: flex;

  svg {
    fill: #763eff;
  }
`

const tooltipTitleStyle = css`
  font-size: 18px;
  line-height: 16px;
`

const tooltipDescriptionStyle = css``

const tooltipArrowStyle = css`
  position: absolute;
  background: #000038;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
`
