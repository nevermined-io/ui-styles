import { css } from "@emotion/react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import * as React from "react"

const overlayStyle = css`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  &[data-state="closed"] {
    opacity: 0;
    animation: fadeOut 0.3s forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`

const contentStyle = css`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 16px;
  padding: 24px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: zoomIn 0.3s forwards, fadeIn 0.3s forwards;

  &[data-state="closed"] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
    animation: zoomOut 0.3s forwards, fadeOut 0.3s forwards;
  }

  @keyframes zoomIn {
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes zoomOut {
    to {
      transform: translate(-50%, -50%) scale(0.95);
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`

const titleStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const descriptionStyle = css`
  font-size: 1rem;
  color: #6b7280;
`

const footerStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const buttonStyle = css`
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 56px;
  transition: background-color 0.2s, transform 0.1s;
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:active {
    transform: scale(0.97);
  }
`

const actionButtonStyle = css`
  ${buttonStyle};
  background-color: #763eff;
  color: white;
  border-color: #763eff;

  &:hover {
    background-color: #5a2cc1;
  }
`

const cancelButtonStyle = css`
  ${buttonStyle};
  background-color: white;
  color: #763eff;
  border: 1px solid #763eff;

  &:hover {
    background-color: #f9fafb;
  }
`

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    css={[overlayStyle, className]}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      css={[contentStyle, className]}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => <div css={[className]} {...props} />
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div css={[footerStyle, className]} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    css={[titleStyle, className]}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    css={[descriptionStyle, className]}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    css={[actionButtonStyle, className]}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    css={[cancelButtonStyle, className]}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
