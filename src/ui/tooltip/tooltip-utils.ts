/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom'

interface IComputePositions {
  elementReference?: Element | HTMLElement | null
  tooltipReference?: Element | HTMLElement | null
  tooltipArrowReference?: Element | HTMLElement | null
  place?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  strategy?: 'absolute' | 'fixed'
}

export const computeToolTipPosition = async ({
  elementReference = undefined,
  tooltipReference = undefined,
  tooltipArrowReference = undefined,
  place = 'top',
  offset: offsetValue = 10,
  strategy = 'absolute',
}: IComputePositions) => {
  if (!elementReference) {
    // elementReference can be null or undefined and we will not compute the position

    // console.error('The reference element for tooltip was not defined: ', elementReference)
    return { tooltipStyles: {}, tooltipArrowStyles: {} }
  }

  if (tooltipReference === null) {
    return { tooltipStyles: {}, tooltipArrowStyles: {} }
  }

  const middleware = [offset(Number(offsetValue)), flip(), shift({ padding: 5 })]

  if (tooltipArrowReference) {
    middleware.push(arrow({ element: tooltipArrowReference as HTMLElement }))
    return computePosition(elementReference as HTMLElement, tooltipReference as HTMLElement, {
      placement: place,
      strategy,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      const styles = { left: `${x}px`, top: `${y}px` }

      // @ts-ignore
      const { x: arrowX, y: arrowY } = middlewareData.arrow

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]]

      const arrowStyle = {
        left: arrowX === undefined ? '' : `${arrowX as number}px`,
        top: arrowY === undefined ? '' : `${arrowY as number}px`,
        right: '',
        bottom: '',
        // @ts-ignore
        [staticSide]: '-4px',
      }

      return { tooltipStyles: styles, tooltipArrowStyles: arrowStyle }
    })
  }

  return computePosition(elementReference as HTMLElement, tooltipReference as HTMLElement, {
    placement: 'bottom',
    strategy,
    middleware,
  }).then(({ x, y }) => {
    const styles = { left: `${x}px`, top: `${y}px` }

    return { tooltipStyles: styles, tooltipArrowStyles: {} }
  })
}

export const debounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: { (): void; (): void; apply?: any },
  wait?: number,
  immediate?: true,
) => {
  let timeout: string | number | NodeJS.Timeout | null | undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    const later = () => {
      timeout = undefined

      if (!immediate) {
        func.apply(context, args)
      }
    }

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}
