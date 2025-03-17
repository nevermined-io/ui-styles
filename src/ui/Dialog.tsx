import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { css, SerializedStyles } from "@emotion/react"

interface CssStyledProps {
  cssStyle?: SerializedStyles
}

const headerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`

const footerStyles = css`
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`

const titleStyles = css`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
`

const descriptionStyles = css`
  font-size: 0.875rem;
  color: #6b7280;
`

const overlayStyles = css`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.2s ease-in-out;
`

const contentStyles = css`
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: calc(100% - 2rem);
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 24px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`

const closeButtonStyles = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>
) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>
) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(
  props: React.ComponentProps<typeof DialogPrimitive.Close>
) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      css={[overlayStyles, cssStyle]}
      {...props}
    />
  )
}

function DialogContent({
  children,
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        css={[contentStyles, cssStyle]}
        {...props}
      >
        {children}
        <DialogClose css={closeButtonStyles}>
          <XIcon />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" css={[headerStyles, cssStyle]} {...props} />
  )
}

function DialogFooter({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-footer" css={[footerStyles, cssStyle]} {...props} />
  )
}

function DialogTitle({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      css={[titleStyles, cssStyle]}
      {...props}
    />
  )
}

function DialogDescription({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      css={[descriptionStyles, cssStyle]}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
