import React, { memo } from "react";

import { Table } from "antd";
//import "./ControlledTable.css";
import styles from "./ControlledTable.module.scss";

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
    <div className={styles["controlled-table"]}>
      <div className={styles["controlled-table__content"]}>
        <Table
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
      </div>

      <div className={styles["controlled-table__actions"]}>{children}</div>
    </div>
  );
}

export default memo(ControlledTable);
