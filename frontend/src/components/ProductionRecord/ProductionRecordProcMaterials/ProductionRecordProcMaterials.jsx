import ProductContent from "../Utility/ProductContent.jsx";
import ProductContextCard from "../Utility/ProductContextCard.jsx";
import AddIcon from "@mui/icons-material/Add";
import { Table } from "antd";
import styles from "./ProductionRecordProcMaterials.module.scss";

const productColumns = [
  {
    title: "編號",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "製程代碼",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "製程名稱",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "製程說明",
    dataIndex: "description",
    key: "description",
  },
];

const productData = [
  {
    key: "1",
    id: "01",
    code: "In-UJ01",
    name: "商內-成品-UJ01",
    description: "In-山姆內(商成)",
  },
  {
    key: "1",
    id: "01",
    code: "In-UJ01",
    name: "商內-成品-UJ01",
    description: "In-山姆內(商成)",
  },
  {
    key: "1",
    id: "01",
    code: "In-UJ01",
    name: "商內-成品-UJ01",
    description: "In-山姆內(商成)",
  },
];

const materialColumns = [
  {
    title: "編號",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "物料代碼",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "物料名稱",
    dataIndex: "name",
    key: "name",
  },
];

const materialData = [
  {
    key: "1",
    id: "01",
    code: "Rm-1",
    name: "原料1",
  },
  // ... more data items
];

function ReusableTable({ columns, data }) {
  return (
    <Table
      className={styles["reusableTable"]}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}

function ProcMaterialsTable({ title, columns, data }) {
  return (
    <ProductContextCard title={title} icon={<AddIcon />}>
      <ReusableTable columns={columns} data={data} />
    </ProductContextCard>
  );
}

function ProductionRecordProcMaterials() {
  return (
    <div>
      <ProductContent title="製程與物料編碼">
        <div className={styles["procMaterials-context"]}>
          <ProcMaterialsTable
            title="製程編碼管理"
            columns={productColumns}
            data={productData}
          />

          <ProcMaterialsTable
            title="物料種類代碼管理"
            columns={materialColumns}
            data={materialData}
          />
        </div>
      </ProductContent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
