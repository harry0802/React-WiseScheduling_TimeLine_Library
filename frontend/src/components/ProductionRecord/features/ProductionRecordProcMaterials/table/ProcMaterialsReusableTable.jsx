import { Table } from "antd";
import { ReusableTable } from "../ProductionRecordProcMaterials.styled";

function ProcMaterialsReusableTable({ columns, data, onRowClick }) {
  return (
    <ReusableTable>
      <Table
        scroll
        sticky
        className="procMaterials-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </ReusableTable>
  );
}

export default ProcMaterialsReusableTable;
