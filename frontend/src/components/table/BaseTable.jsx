import { Icon } from "@iconify/react";
import TableCard from "../card/TableCard";
import { Table } from "antd";
// import styles from "./ReusableTable.module.scss";

function ReusableTable({ columns, data, onRowClick }) {
  return (
    <Table
      scroll={{ x: 150 * 30, y: 400 }}
      sticky
      // className={styles.reusableTable}
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}

// ProcMaterials Table Component
const BaseTable = ({ title, columns, data, onRowClick, onAddClick }) => {
  return (
    <>
      <TableCard
        onAddClick={onAddClick}
        title={title}
        icon={<Icon icon="gg:add" />}
      >
        <ReusableTable columns={columns} data={data} onRowClick={onRowClick} />
      </TableCard>
    </>
  );
};

export default BaseTable;
