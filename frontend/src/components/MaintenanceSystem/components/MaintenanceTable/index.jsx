import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { columns } from "./columns";
import EditIcon from "@mui/icons-material/Edit";

const headerColors = {
  maintenance: "#186C98",
  result: "#C88400",
  review: "#186C98",
  approve: "#18983C",
};

const columnGroups = {
  maintenance: ["maintenanceCheckItem", "maintenanceMethod"],
  result: ["inspectionResult", "inspector", "inspectionDate"],
  review: ["reinspectionResult", "reinspector", "reinspectionDate"],
  approve: ["approver", "approvalDate"],
};

const StyledTableContainer = styled(TableContainer)`
  && {
    margin-top: 16px;
    max-width: 100%;
    overflow-x: auto;
    font-size: 20px;
    border: 1px solid rgba(224, 224, 224, 1);
  }
`;

const StyledTable = styled(Table)`
  min-width: 800px;
`;

const StyledTableHead = styled(TableHead)`
  && {
    font-size: 20px;
  }
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${(props) => (props.$isHeader ? "#1976d2" : "inherit")};
  color: ${(props) => (props.$isHeader ? "white" : "inherit")};
  font-weight: ${(props) => (props.$isHeader ? "bold" : "normal")};
  padding: 12px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const StyledHeaderCell = styled(StyledTableCell)`
  && {
    font-size: 20px;
    color: #fff;
    font-weight: 400;
    position: relative;
    background-color: ${(props) => {
      const field = props.column?.field;
      if (columnGroups.maintenance.includes(field))
        return headerColors.maintenance;
      if (columnGroups.result.includes(field)) return headerColors.result;
      if (columnGroups.review.includes(field)) return headerColors.review;
      if (columnGroups.approve.includes(field)) return headerColors.approve;
      return headerColors.maintenance;
    }};
  }
`;

const EditIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 1;
`;

const ConfigurableTable = ({ config, onEdit }) => {
  const allColumns = columns;

  const handleEdit = (group) => {
    onEdit?.(group);
  };

  const getColumnGroup = (field) => {
    for (const [group, fields] of Object.entries(columnGroups)) {
      if (fields.includes(field)) {
        return group;
      }
    }
    return null;
  };

  const shouldShowEditIcon = (colIndex) => {
    const column = allColumns[colIndex];
    const currentGroup = getColumnGroup(column.field);
    const nextColumn = allColumns[colIndex + 1];
    const nextGroup = nextColumn ? getColumnGroup(nextColumn.field) : null;

    return currentGroup && currentGroup !== nextGroup;
  };

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            {allColumns.map((column, index) => (
              <StyledHeaderCell $isHeader column={column} key={index}>
                {column.headerName}
                {/*   */}
                {shouldShowEditIcon(index) && (
                  <EditIconWrapper>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(getColumnGroup(column.field))}
                      sx={{ color: "#fff" }}
                    >
                      <EditIcon fontSize="medium" />
                    </IconButton>
                  </EditIconWrapper>
                )}
              </StyledHeaderCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {config?.rows?.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {allColumns.map((column, colIndex) => (
                <StyledTableCell key={`${rowIndex}-${colIndex}`}>
                  {row[column.field]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default ConfigurableTable;
