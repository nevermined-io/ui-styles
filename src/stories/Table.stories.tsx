import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '@/ui/Table'
import { css } from '@emotion/react'

const meta = {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const headerColStyle = css({ padding: '5px 20px' })

const bodyColStyle = css({
  padding: '25px 20px',
  fontSize: 14,
})

export const Default: Story = {
  args: {
    children: (
      <>
        <Table.Header cssStyle={{ tr: { backgroundColor: 'transparent!important' } }}>
          <Table.HeaderColumn as="th" width="20%" cssStyle={headerColStyle}>
            {'Column A'}
          </Table.HeaderColumn>
          <Table.HeaderColumn as="th" cssStyle={headerColStyle}>
            {'Column B'}
          </Table.HeaderColumn>
          <Table.HeaderColumn as="th" cssStyle={headerColStyle}>
            {'Column C'}
          </Table.HeaderColumn>
        </Table.Header>
        <Table.Body>
          <Table.Row invertedColor>
            <Table.Column cssStyle={bodyColStyle} dataLabel="Column A">
              Col A.1
            </Table.Column>
            <Table.Column cssStyle={bodyColStyle} dataLabel="Column B">
              Col B.2
            </Table.Column>
            <Table.Column cssStyle={bodyColStyle} dataLabel="Column C">
              Col C.3
            </Table.Column>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
