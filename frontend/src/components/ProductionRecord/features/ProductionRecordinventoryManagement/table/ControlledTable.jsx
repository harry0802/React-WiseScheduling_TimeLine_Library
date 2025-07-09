import React, { memo } from "react";
import { Table } from "antd";
import {
  ControlledTableContainer,
  ControlledTableContent,
  ControlledTableActions,
  ControlledTableGlobalStyles,
} from "./ControlledTable.styled";

// 控制表格組件，用於展示和管理表格數據
function ControlledTable({
  children,
  columns,
  dataSource,
  selectedRowKeys,
  onSelectChange,
  onRowClick,
}) {
  // 行選擇配置
  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <ControlledTableContainer>
      <ControlledTableGlobalStyles />
      <ControlledTableContent>
        <Table
          className="controlled-table-wrapper"
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelectionConfig}
          onRow={(record) => ({
            onClick: () => {
              onRowClick(record);
            },
          })}
        />
      </ControlledTableContent>

      <ControlledTableActions>{children}</ControlledTableActions>
    </ControlledTableContainer>
  );
}

export default memo(ControlledTable);
