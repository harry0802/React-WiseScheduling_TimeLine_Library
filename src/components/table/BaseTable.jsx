import { Icon } from '@iconify/react'
import TableCard from '../card/TableCard'
import { Table } from 'antd'
import styled from 'styled-components'
import { colors } from '../../designTokens'

const StyledTable = styled(Table)`
  && {
    width: 100%;
    .ant-table {
      border: 1px solid ${colors.border.primary};
      overflow: hidden;
      border-radius: 8px;
      background: ${colors.background.secondary};

      * {
        font-family: Roboto, sans-serif;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        border: none;
      }

      .ant-table-thead .ant-table-cell {
        &::before {
          display: none;
        }
        color: ${colors.accent.primary} !important;
        padding: 14px 16px;
        border-bottom: 2px solid ${colors.accent.primary}60;
        background: ${colors.background.primary} !important;
        border-right: 1px solid ${colors.border.primary};
        font-weight: 700;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &:hover {
          color: ${colors.accent.primary} !important;
          background: ${colors.background.primary} !important;
        }

        .ant-table-column-sorter {
          color: ${colors.accent.primary}60;

          &:hover {
            color: ${colors.accent.primary};
          }
        }

        .ant-table-column-sorter-up.active,
        .ant-table-column-sorter-down.active {
          color: ${colors.accent.primary};
        }
      }

      td {
        transition: all 0.3s;
        padding: 14px 16px;
        font-size: 14px;
        color: ${colors.text.inverse} !important;
      }
      td:not(:last-child) {
        border-right: 1px solid ${colors.border.primary};
      }
      .ant-table-row {
        position: relative;
        z-index: 1;

        &:not(:last-child) > td {
          border-bottom: 1px solid ${colors.border.primary};
        }

        &:nth-of-type(odd) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: ${colors.background.secondary};
          }
        }

        &:nth-of-type(even) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: ${colors.background.primary};
          }
        }

        &:hover {
          position: relative;
          z-index: 10;

          > td {
            background: ${colors.background.primary} !important;
            background-image: linear-gradient(
              ${colors.accent.primary}25,
              ${colors.accent.primary}25
            ) !important;
            color: ${colors.text.inverse} !important;
            cursor: pointer;
            box-shadow: inset 0 0 0 1px ${colors.accent.primary}80;
          }
        }
      }
    }

    // 确保固定列的 z-index 正确
    :where(.ant-table-cell-fix-left, .ant-table-cell-fix-right) {
      z-index: 2;

      &:hover {
        z-index: 20 !important;
      }
    }

    .ant-table-row:hover {
      :where(.ant-table-cell-fix-left, .ant-table-cell-fix-right) {
        z-index: 20 !important;
      }
    }
  }

  &.reusableTable {
    max-height: ${({ maxHeight }) => maxHeight || '32.5rem'};
    overflow: auto;
    cursor: pointer;
  }
`

function ReusableTable({
  columns,
  data,
  onRowClick,
  scroll = { x: 1200, y: 500 },
  maxHeight
}) {
  return (
    <StyledTable
      scroll={scroll}
      sticky
      className='reusableTable'
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record)
      })}
      maxHeight={maxHeight}
    />
  )
}

const BaseTable = ({
  title,
  columns,
  data,
  onRowClick,
  onAddClick,
  scroll,
  maxHeight
}) => {
  return (
    <div className='procMaterials-context'>
      <TableCard
        onAddClick={onAddClick}
        title={title}
        icon={<Icon icon='gg:add' />}
      >
        <ReusableTable
          columns={columns}
          data={data}
          onRowClick={onRowClick}
          scroll={scroll}
          maxHeight={maxHeight}
        />
      </TableCard>
    </div>
  )
}

export default BaseTable

