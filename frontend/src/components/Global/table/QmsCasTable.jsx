import React from "react";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
} from "@mui/material";

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  border: 1px solid var(--color-text);
  border-radius: 3px;
  overflow-y: auto;
  max-height: ${(props) => props.maxHeight || "none"};
  font-size: 14px;
`;

const StyledTable = styled(Table)`
  && {
    .MuiTableCell-root {
      color: var(--color-text);
      font-family: Roboto, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      border: 1px solid var(--color-text);
      padding: 8px;
    }

    .MuiTableHead-root .MuiTableCell-root {
      background: var(--color-background-thead);
      font-weight: bold;
    }

    .MuiTableBody-root .MuiTableRow-root:nth-of-type(even) {
      background-color: var(--color-background-alt);
    }

    .total-row {
      font-weight: bold;
      background-color: var(--color-background-total);
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    color: var(--color-text);
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    border: 1px solid var(--color-text);
    padding: 8px;
  }
`;

const BaseTable = ({ headers, data, footers }) => {
  return (
    <StyledTableContainer component={Paper}>
      <StyledTable stickyHeader>
        <TableHead>
          {headers?.map((headerRow, rowIndex) => (
            <TableRow key={rowIndex}>
              {headerRow?.map((header, cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                  colSpan={header.colSpan}
                  align={header.align}
                >
                  {header.title ?? header}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {data?.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row.isTotal ? "total-row" : ""}>
              {row.cells.map((cell, cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                  colSpan={cell.colSpan}
                  align={cell.align}
                >
                  {cell.value}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {footers && (
          <TableFooter>
            {footers?.map((footerRow, rowIndex) => (
              <TableRow key={rowIndex}>
                {footerRow?.map((footer, cellIndex) => (
                  <StyledTableCell
                    key={cellIndex}
                    colSpan={footer.colSpan}
                    align={footer.align}
                  >
                    {footer.value}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </StyledTable>
    </StyledTableContainer>
  );
};

export default BaseTable;
