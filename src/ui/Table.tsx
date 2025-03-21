import Column from './Column'
import { WHEN_MOBILE_OR_TABLET } from '@/styles/breakpoints'
import { white } from '@/styles/colors'
import { css, Interpolation, Theme } from '@emotion/react'

type TableCommonProps = React.PropsWithChildren<{
  cssStyle?: Interpolation<Theme>
}>

type TableColumnProps = React.PropsWithChildren<{
  as?: 'th' | 'td'
  cssStyle?: Interpolation<Theme>
  width?: string
  align?: 'left' | 'center' | 'right'
  dataLabel?: string
}> &
  React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>

export const Table = ({ cssStyle, children }: TableCommonProps) => (
  <table css={[tableStyle, cssStyle]}>{children}</table>
)

Table.Container = function ({ cssStyle, children }: TableCommonProps) {
  return <Column css={[tableContainerStyle, cssStyle]}>{children}</Column>
}

Table.Header = function ({ cssStyle, children }: TableCommonProps) {
  return children ? (
    <thead css={[theadStyle, cssStyle]}>
      <Table.Row
        cssStyle={css({
          boxShadow: 'none',
          backgroundColor: `${white}!important`,
        })}
      >
        {children}
      </Table.Row>
    </thead>
  ) : null
}

Table.HeaderColumn = function ({ cssStyle, children, width, align }: TableColumnProps) {
  return children ? (
    <Table.Column as="th" cssStyle={[headerColumnStyle, cssStyle]} width={width} align={align}>
      {children}
    </Table.Column>
  ) : null
}

Table.Body = function ({ cssStyle, children }: TableCommonProps) {
  return children ? <tbody css={[cssStyle]}>{children}</tbody> : null
}

Table.Footer = function ({ cssStyle, children }: TableCommonProps) {
  return children ? <tfoot css={cssStyle}>{children}</tfoot> : null
}

Table.Row = function ({
  cssStyle,
  children,
  invertedColor,
}: TableCommonProps & { invertedColor?: boolean }) {
  return children ? <tr css={[rowStyle({ invertedColor }), cssStyle]}>{children}</tr> : null
}

Table.Column = function ({
  as = 'td',
  cssStyle,
  children,
  width,
  align = 'left',
  dataLabel,
  ...rest
}: TableColumnProps) {
  const Tag = as

  return (
    <Tag
      css={[
        columnStyle,
        cssStyle,
        {
          width: width || 'auto',
          maxWidth: width || 'unset',
        },
        align === 'center' && {
          textAlign: 'center',
        },
        align === 'right' && {
          textAlign: 'right',
        },
        {
          [WHEN_MOBILE_OR_TABLET]: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '100%',
            '::before': {
              display: 'flex',
              alignSelf: 'center',
              content: 'attr(data-label)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginRight: 10,
            },
          },
        },
      ]}
      {...(dataLabel && { 'data-label': dataLabel })}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const tableContainerStyle = css({
  backgroundColor: white,
  border: '0.5px solid rgba(197, 197, 197, 0.8)',
  boxShadow: '5px 4px 10px rgba(0, 0, 0, 0.04)',
  borderRadius: 16,
  padding: 22,
  alignItems: 'flex-start',
})

const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
})

const theadStyle = css({
  [WHEN_MOBILE_OR_TABLET]: {
    border: 'none',
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
  },
})

const rowStyle = ({ invertedColor }: { invertedColor?: boolean }) =>
  css({
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.04)',
    '&:nth-child(even)': {
      background: invertedColor ? '#f7f7f7' : white,
    },
    '&:nth-child(odd)': {
      background: invertedColor ? white : '#f7f7f7',
    },
    [WHEN_MOBILE_OR_TABLET]: {
      display: 'block',
    },
  })

const columnStyle = css({
  textAlign: 'left',
  padding: '9px 13px',
  '&:only-child': {
    borderRadius: '8px',
  },
  '&:first-child:not(:only-child)': {
    borderRadius: '8px 0 0 8px',
  },
  '&:last-child:not(:only-child)': {
    borderRadius: '0 8px 8px 0',
  },
})

const headerColumnStyle = css(columnStyle, {
  fontWeight: 700,
})
