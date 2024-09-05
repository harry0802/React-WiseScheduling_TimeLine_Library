import { Table } from "antd";
import styles from "../ProductionRecordProcMaterials.module.scss";

function ProcMaterialsReusableTable({ columns, data, onRowClick }) {
  return (
    <Table
      scroll
      sticky
      className={styles.reusableTable}
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}

export default ProcMaterialsReusableTable;
