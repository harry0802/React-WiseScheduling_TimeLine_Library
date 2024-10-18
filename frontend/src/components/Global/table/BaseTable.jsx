import React from "react";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  border: 1px solid var(--color-text);
  border-radius: 3px;
  overflow-y: auto;
  max-height: ${(props) => props.maxHeight || "32.5rem"};
  font-size: 18px;
`;

const StyledTable = styled(Table)`
  && {
    font-size: 18px;

    .MuiTableCell-root {
      color: var(--color-text);
      font-family: Roboto, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      border-radius: 0 !important;
      border: none;
      padding: 10px;
    }

    .MuiTableHead-root .MuiTableCell-root {
      color: var(--color-text);
      border-bottom: 1px solid var(--color-text);
      background: var(--color-background-thead);
      border-right: 1px solid var(--color-text);
      &::before {
        display: none;
      }
    }

    .MuiTableBody-root .MuiTableCell-root {
      transition: all 0.3s;
      &:not(:last-child) {
        border-right: 1px solid var(--color-text);
      }
    }

    .MuiTableBody-root .MuiTableRow-root {
      &:not(:last-child) > .MuiTableCell-root {
        border-bottom: 1px solid var(--color-text);
      }

      &:nth-of-type(odd) {
        .MuiTableCell-root {
          background: var(--color-background-alt);
        }
      }

      &:nth-of-type(even) {
        .MuiTableCell-root {
          background: var(--color-background);
        }
      }

      &:hover {
        .MuiTableCell-root {
          background: #f7f7f7;
          color: #000;
        }
      }
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    color: var(--color-text);
    padding: 10px;
    border-bottom: 1px solid var(--color-text);
  }
`;

// Reusable Table component using MUI
function ReusableTable({ columns, data, onRowClick, maxHeight }) {
  if (!columns || !data) return null;

  return (
    <StyledTableContainer component={Paper} maxHeight={maxHeight}>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <StyledTableCell key={column.key}>{column.title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(row)}
              hover
              style={{ cursor: "pointer" }}
            >
              {columns?.map((column) => (
                <StyledTableCell key={column.key}>
                  {row[column.dataIndex]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

const BaseTable = ({ columns, data, onRowClick, maxHeight }) => {
  return (
    <ReusableTable
      columns={columns}
      data={data}
      onRowClick={onRowClick}
      maxHeight={maxHeight}
    />
  );
};

export default BaseTable;
