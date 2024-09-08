import { Icon } from "@iconify/react";
import TableCard from "../card/TableCard";
import { Table } from "antd";
import styled from "styled-components";

const StyledTable = styled(Table)`
  && {
    .ant-table {
      border: 1px solid var(--color-text);
      overflow: hidden;
      border-radius: 3px;

      * {
        color: var(--color-text);
        font-family: Roboto, sans-serif;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        border-radius: 0 !important;
        border: none;
      }

      .ant-table-thead .ant-table-cell {
        &::before {
          display: none;
        }
        color: var(--color-text);
        padding: 10px;
        border-bottom: 1px solid var(--color-text);
        background: var(--color-background-thead);
      }

      td {
        transition: all 0.3s;
      }
      td:not(:last-child) {
        border-right: 1px solid var(--color-text);
      }
      .ant-table-row {
        &:not(:last-child) > td {
          border-bottom: 1px solid var(--color-text);
        }

        &:nth-of-type(odd) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: var(--color-background-alt);
          }
        }

        &:nth-of-type(even) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: var(--color-background);
          }
        }
      }
    }

    // 确保固定列的 z-index 正确
    :where(.ant-table-cell-fix-left, .ant-table-cell-fix-right) {
      z-index: 2;
    }
  }

  &.reusableTable {
    max-height: 32.5rem;
    overflow: auto;
    cursor: pointer;
    .ant-table-tbody {
      tr:hover > td {
        background: #f7f7f7;
        color: #000;
      }
    }
  }
`;

function ReusableTable({
  columns,
  data,
  onRowClick,
  scroll = { x: 1200, y: 500 },
}) {
  return (
    <StyledTable
      scroll={scroll}
      sticky
      className="reusableTable"
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}

const BaseTable = ({
  title,
  columns,
  data,
  onRowClick,
  onAddClick,
  scroll,
}) => {
  return (
    <div className="procMaterials-context">
      <TableCard
        onAddClick={onAddClick}
        title={title}
        icon={<Icon icon="gg:add" />}
      >
        <ReusableTable
          columns={columns}
          data={data}
          onRowClick={onRowClick}
          scroll={scroll}
        />
      </TableCard>
    </div>
  );
};

export default BaseTable;
