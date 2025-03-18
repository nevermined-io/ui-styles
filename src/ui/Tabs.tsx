import { Tooltip } from "@/main"
import {
  WHEN_MOBILE,
  WHEN_MOBILE_OR_TABLET,
  WHEN_PHABLET,
} from "@/styles/breakpoints"
import { navbarLinkFontWeight } from "@/styles/styles"
import { Button } from "@/ui/Button"
import Column from "@/ui/Column"
import Row from "@/ui/Row"
import { Interpolation, Theme, css } from "@emotion/react"

import React, { useMemo, useRef, useState } from "react"

const useRefs = () => {
  const refsByKey = useRef<Record<string, HTMLElement | null>>({})

  const setRef = (element: HTMLElement | null, key: string) => {
    refsByKey.current[key] = element
  }

  return {
    refsByKey: refsByKey.current,
    setRef,
  }
}

export type Tab = {
  id: string
  title: React.ReactNode | ((args: { active: boolean }) => React.ReactNode)
  disabled?: boolean
  inactive?: boolean
  tooltipMessage?: string
  testid?: string
}

type TabsProps = {
  children: (args: { selectedTab: Tab }) => React.ReactNode
  tabs: Tab[]
  selectedTab?: string
  navigateToTab: React.SetStateAction<any>
  tabsCssStyle?: Interpolation<Theme>
  tabCssStyle?: Interpolation<Theme>
  enableMobileLayout?: boolean
}

export const Tabs = ({
  tabs,
  selectedTab,
  navigateToTab,
  children,
  tabsCssStyle,
  tabCssStyle,
  enableMobileLayout = false,
}: TabsProps) => {
  const { refsByKey, setRef } = useRefs()
  const selectedTabItem = useMemo(
    () => tabs.find((tab) => tab.id === selectedTab),
    [tabs, selectedTab]
  )
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Column css={tabContainerStyle}>
      <Row cssStyle={[tabsStyle({ enableMobileLayout }), tabsCssStyle]}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            css={tabButtonWrapperStyle}
            onMouseEnter={() =>
              tab.tooltipMessage ? setShowTooltip(true) : setShowTooltip(false)
            }
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Button
              ref={(elem) => setRef(elem, tab.id)}
              testid={tab.testid}
              variant="ghost"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              onClick={() => navigateToTab(tab.id)}
              cssStyle={[
                tabStyle,
                tabActiveStyle({
                  active: tab.id === selectedTab,
                  enableMobileLayout,
                }),
                tabCssStyle,
              ]}
              disabled={tab.disabled}
              inactive={tab.inactive}
            >
              {typeof tab.title === "function" &&
                tab.title({ active: tab.id === selectedTab })}
              {typeof tab.title !== "function" && tab.title}
            </Button>
            {showTooltip && tab.tooltipMessage && refsByKey[tab.id] && (
              <Tooltip
                events={["hover"]}
                isOpen={showTooltip}
                setIsOpen={setShowTooltip}
                targetElementRef={refsByKey[tab.id]}
              >
                {tab.tooltipMessage}
              </Tooltip>
            )}
          </div>
        ))}
      </Row>
      {selectedTabItem && children({ selectedTab: selectedTabItem })}
    </Column>
  )
}

const tabContainerStyle = css({
  height: "100%",
  gap: "1.5rem",
  justifyContent: "flex-start",
})

const tabsStyle = ({ enableMobileLayout }: { enableMobileLayout: boolean }) =>
  css({
    justifyContent: "flex-start",
    borderBottom: "1px solid rgba(197, 197, 197, 0.50)",
    alignItems: "unset",
    ...(enableMobileLayout && {
      [WHEN_PHABLET]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    }),
  })

const tabActiveStyle = ({
  active = false,
  enableMobileLayout = false,
}: {
  active: boolean
  enableMobileLayout: boolean
}) =>
  css({
    display: "inline-flex",
    fontWeight: navbarLinkFontWeight,
    whiteSpace: "normal",
    textDecoration: "none",
    fontStyle: "normal",
    letterSpacing: "-0.15px",
    flexDirection: "column",
    borderRadius: "0px",
    borderBottom: `3px solid ${active ? "#763eff" : "transparent"}`,
    marginBottom: "-2px !important",
    color: `rgba(0, 0, 0, ${active ? "1" : "0.5"})`,
    "&:disabled": {
      background: "0",
    },
    "&:hover:not(:disabled)": {
      borderBottom: `3px solid ${active ? "#763eff" : "#b2b2b2"}`,
    },
    ...(enableMobileLayout && {
      [WHEN_MOBILE_OR_TABLET]: {
        width: "100%",
      },
      [WHEN_PHABLET]: {
        alignItems: "flex-start",
        "& > *": {
          justifyContent: "flex-start!important",
        },
      },
    }),
  })

const tabStyle = css({
  height: "100%",
  fontSize: "12pt!important",
  lineHeight: "12pt",
  padding: "0.75rem 2rem",
  [WHEN_MOBILE]: {
    padding: "0.5rem",
  },
})

const tabButtonWrapperStyle = css({
  position: "relative",
  display: "inline-block",
  [WHEN_MOBILE]: {
    display: "flex",
  },
})
