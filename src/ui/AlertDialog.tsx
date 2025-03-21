import { css, SerializedStyles } from '@emotion/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

interface CssStyledProps {
  cssStyle?: SerializedStyles
}

const overlayStyle = css`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  &[data-state='closed'] {
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
  animation:
    zoomIn 0.3s forwards,
    fadeIn 0.3s forwards;

  &[data-state='closed'] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
    animation:
      zoomOut 0.3s forwards,
      fadeOut 0.3s forwards;
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
  transition:
    background-color 0.2s,
    transform 0.1s;
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

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      css={[overlayStyle, cssStyle]}
      {...props}
    />
  )
}

function AlertDialogContent({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        css={[contentStyle, cssStyle]}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ cssStyle, ...props }: CssStyledProps & React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-header" css={[cssStyle]} {...props} />
}

function AlertDialogFooter({ cssStyle, ...props }: CssStyledProps & React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-footer" css={[footerStyle, cssStyle]} {...props} />
}

function AlertDialogTitle({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      css={[titleStyle, cssStyle]}
      {...props}
    />
  )
}

function AlertDialogDescription({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      css={[descriptionStyle, cssStyle]}
      {...props}
    />
  )
}

function AlertDialogAction({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return <AlertDialogPrimitive.Action css={[actionButtonStyle, cssStyle]} {...props} />
}

function AlertDialogCancel({
  cssStyle,
  ...props
}: CssStyledProps & React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel css={[cancelButtonStyle, cssStyle]} {...props} />
}

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
