import React from "react";

import { Table, Button, Checkbox } from "antd";
//import "./ControlledTable.css";
import styles from "./ControlledTable.module.scss";
import ProductionRecordButton from "../../../utility/ProductionRecordButton";

// 控制表格組件，用於展示和管理表格數據
function ControlledTable({
  columns,
  dataSource,
  selectedRowKeys,
  onSelectChange,
  onRowClick,
  onEditClick,
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
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelectionConfig}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
        />
      </div>

      <div className={styles["controlled-table__actions"]}>
        <ProductionRecordButton shape="round" OnClick={onEditClick}>
          編輯
        </ProductionRecordButton>
      </div>
    </div>
  );
}

export default ControlledTable;
