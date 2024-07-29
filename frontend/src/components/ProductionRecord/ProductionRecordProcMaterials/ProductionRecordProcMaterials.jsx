import ProductContent from "../Utility/ProductContent.jsx";
import ProductContextCard from "../Utility/ProductContextCard.jsx";
import AddIcon from "@mui/icons-material/Add";
import { Table } from "antd";
import styles from "./ProductionRecordProcMaterials.module.scss";
import { useProcMaterials } from "../Context/ProcMaterialsProvider.jsx";
import ProductDrawer from "../Utility/ProductDrawer.jsx";

import ProductTextFieldInput from "../Utility/ProductTextFieldInput.jsx";
import ProductTextFieldSelect from "../Utility/ProductTextFieldSelect.jsx";

const productColumns = [
  {
    title: "編號",
    dataIndex: "id",
    width: 50,
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
    key: "2",
    id: "02",
    code: "In-UJ01",
    name: "商內-成品-UJ01",
    description: "In-山姆內(商成)",
  },
  {
    key: "3",
    id: "03",
    code: "In-UJ01",
    name: "商內-成品-UJ01",
    description: "In-山姆內(商成)",
  },
];

const materialColumns = [
  {
    title: "編號",
    dataIndex: "id",
    width: 50,
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
      scroll={true}
      sticky={true}
      className={styles["reusableTable"]}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}

function ProcMaterialsTable({ children, title, columns, data, OnClick }) {
  return (
    <>
      <ProductContextCard OnClick={OnClick} title={title} icon={<AddIcon />}>
        <ReusableTable columns={columns} data={data} />
      </ProductContextCard>
      {children}
    </>
  );
}

function ProductionRecordProcMaterials() {
  const {
    procManageDrawer,
    setProcManageDrawer,
    materialsManageDrawer,
    setMaterialsManageDrawer,
  } = useProcMaterials();

  return (
    <div>
      <ProductContent title="製程與物料編碼">
        <div className={styles["procMaterials-context"]}>
          <ProcMaterialsTable
            OnClick={() => setProcManageDrawer(true)}
            title="製程編碼管理"
            columns={productColumns}
            data={productData}
          >
            <ProductDrawer
              title="新增製程編碼"
              visible={procManageDrawer}
              onClose={() => setProcManageDrawer(false)}
            >
              <ProductTextFieldInput />
              <ProductTextFieldInput />
              <ProductTextFieldSelect />
            </ProductDrawer>
          </ProcMaterialsTable>

          <ProcMaterialsTable
            title="物料種類代碼管理"
            columns={materialColumns}
            data={materialData}
            OnClick={() => setMaterialsManageDrawer(true)}
          >
            <ProductDrawer
              title="新增物料種類編碼"
              visible={materialsManageDrawer}
              onClose={() => setMaterialsManageDrawer(false)}
            >
              <ProductTextFieldInput />
              <ProductTextFieldInput />
            </ProductDrawer>
          </ProcMaterialsTable>
        </div>
      </ProductContent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
