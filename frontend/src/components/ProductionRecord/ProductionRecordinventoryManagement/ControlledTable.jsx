import React from "react";

import { Table, Button, Checkbox } from "antd";
//import "./ControlledTable.css";
import styles from "./ControlledTable.module.scss";

// 控制表格組件，用於展示和管理表格數據
function ControlledTable({
  columns,
  dataSource,
  selectedRowKeys,
  onSelectChange,
  onRowClick,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  // 行選擇配置
  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={styles["controlled-table"]}>
      <div className="controlled-table__content">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelectionConfig}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          pagination={false}
        />
      </div>
      <div className="controlled-table__actions">
        <Button type="primary" onClick={onAddClick}>
          新增
        </Button>
        <Button onClick={onEditClick}>編輯</Button>
        <Button danger onClick={onDeleteClick}>
          刪除
        </Button>
      </div>
    </div>
  );
}

export default ControlledTable;
