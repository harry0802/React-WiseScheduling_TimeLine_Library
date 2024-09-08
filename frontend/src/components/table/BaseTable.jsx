import React from "react";
import { Icon } from "@iconify/react";
import TableCard from "../card/TableCard";
import { Table } from "antd";
import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyle"; // 导入 GlobalStyles

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

      .ant-table-tbody {
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
            background: var(--color-background-alt);
          }
        }
      }
    }

    &.reusableTable {
      max-height: 32.5rem;
      overflow: auto;
      cursor: pointer;

      .ant-table-tbody {
        tr:hover > td {
          background: inherit;
          color: #000;
        }
      }
    }
  }
`;

function ReusableTable({ columns, data, onRowClick }) {
  return (
    <StyledTable
      scroll={{ x: 150 * 30, y: 400 }}
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

const BaseTable = ({ title, columns, data, onRowClick, onAddClick }) => {
  return (
    <div className="procMaterials-context">
      <GlobalStyles /> {/* 使用 GlobalStyles */}
      <TableCard
        onAddClick={onAddClick}
        title={title}
        icon={<Icon icon="gg:add" />}
      >
        <ReusableTable columns={columns} data={data} onRowClick={onRowClick} />
      </TableCard>
    </div>
  );
};

export default BaseTable;
