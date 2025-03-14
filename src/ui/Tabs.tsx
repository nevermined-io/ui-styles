/** @jsxImportSource @emotion/react */
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { css } from "@emotion/react"
import { purple } from "@/styles/colors"

const tabsStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const tabsListStyles = css`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  border-bottom: 1px solid #ddd;
`

const tabsTriggerStyles = css`
  position: relative;
  padding: 8px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  color: #888;
  transition: color 0.2s ease;

  &[data-state="active"] {
    color: #000;
    font-weight: bold;
  }

  &[data-state="active"]::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${purple};
    border-radius: 2px;
  }
`

const tabsContentStyles = css`
  padding: 16px 0;
`

function Tabs({ ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root css={tabsStyles} data-slot="tabs" {...props} />
}

function TabsList({
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List css={tabsListStyles} data-slot="tabs-list" {...props} />
  )
}

function TabsTrigger({
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      css={tabsTriggerStyles}
      data-slot="tabs-trigger"
      {...props}
    />
  )
}

function TabsContent({
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      css={tabsContentStyles}
      data-slot="tabs-content"
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
