export const MOBILE_CONTENT_MAX = 420

const PHABLET = 700

const DESKTOP_CONTENT_MIN = 940

export const WHEN_DESKTOP = `@media (min-width: ${DESKTOP_CONTENT_MIN}px)`

export const WHEN_TABLET = `@media (min-width: ${MOBILE_CONTENT_MAX}px) and (max-width: ${DESKTOP_CONTENT_MIN}px)`

export const WHEN_TABLET_UP = `@media (min-width: ${MOBILE_CONTENT_MAX}px)`

export const WHEN_MOBILE = `@media (max-width: ${MOBILE_CONTENT_MAX}px)`

export const WHEN_PHABLET = `@media (max-width: ${PHABLET}px)`

export const WHEN_MOBILE_OR_TABLET = `@media (max-width: ${DESKTOP_CONTENT_MIN}px)`

export const SUPPORT_MAX_WIDTH = 760

export const WHEN_DESKTOP_IMG = `(min-width: ${DESKTOP_CONTENT_MIN}px)`

export const WHEN_MOBILE_IMG = `(max-width: ${MOBILE_CONTENT_MAX}px)`
