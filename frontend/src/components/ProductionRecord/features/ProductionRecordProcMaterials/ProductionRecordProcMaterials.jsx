import styles from "./ProductionRecordProcMaterials.module.scss";
import { Table } from "antd";
import { useProcMaterials } from "../../context/ProcMaterialsProvider.jsx";
import AddIcon from "@mui/icons-material/Add";

import ProductContent from "../../utility/ProductContent.jsx";
import ProductContextCard from "../../utility/ProductContextCard.jsx";
import ProductDrawer from "../../utility/ProductDrawer.jsx";
import ProductTextFieldInput from "../../utility/ProductTextFieldInput.jsx";
import ProductTextFieldSelect from "../../utility/ProductTextFieldSelect.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import { useEffect, useState } from "react";

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

const generateData = () => {
  const generateProductData = () => {
    const productData = [];
    for (let i = 1; i <= 50; i++) {
      productData.push({
        key: i.toString(),
        id: i.toString().padStart(2, "0"),
        code: "In-UJ01",
        name: "商內-成品-UJ01",
        description: "In-山姆內(商成)",
      });
    }
    return productData;
  };

  const generateMaterialData = () => {
    const materialData = [];
    for (let i = 1; i <= 50; i++) {
      materialData.push({
        key: i.toString(),
        id: i.toString().padStart(2, "0"),
        code: `Rm-${i}`,
        name: `原料${i}`,
      });
    }
    return materialData;
  };

  return {
    productData: generateProductData(),
    materialData: generateMaterialData(),
  };
};

const options = [
  {
    value: "In-ij廠內成型",
    label: "In-ij廠內成型",
  },
  {
    value: "Out-委外成型",
    label: "Out-委外成型",
  },
  {
    value: "In-BE-廠內後製程",
    label: "In-BE-廠內後製程",
  },
  {
    value: "Out-BE-委外後製程",
    label: "Out-BE-委外後製程",
  },
  {
    value: "In-TS廠內出貨檢驗",
    label: "In-TS廠內出貨檢驗",
  },
];

function ReusableTable({ columns, data }) {
  return (
    <Table
      scroll
      sticky
      className={styles["reusableTable"]}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowHoverable={false}
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
  const [procName, setProcName] = useState("資料設定中...");
  const [procNumber, setProcNumber] = useState("資料設定中...");

  const [materialName, setMaterialName] = useState("資料設定中...");
  const [materialNumber, setMaterialNumber] = useState("資料設定中...");

  const [userSelect, setUserSelect] = useState(options[0].value);

  const {
    procManageDrawer,
    setProcManageDrawer,
    materialsManageDrawer,
    setMaterialsManageDrawer,
  } = useProcMaterials();

  const { handlePageStatust } = useRecord();
  const { productData, materialData } = generateData();

  useEffect(() => {
    handlePageStatust("製程與物料編碼維護");
  }, []);
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
              <ProductTextFieldInput
                label="製程名稱"
                value={procName}
                OnChange={(e) => setProcName(e.target.value)}
              />
              <ProductTextFieldInput
                label="製程編號"
                value={procNumber}
                OnChange={(e) => setProcNumber(e.target.value)}
              />
              <ProductTextFieldSelect
                label="製程類別"
                value={userSelect}
                option={options}
                OnChange={(e) => setUserSelect(e.target.value)}
              />
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
              <ProductTextFieldInput
                label="物料名稱"
                value={materialName}
                OnChange={(e) => setMaterialName(e.target.value)}
              />
              <ProductTextFieldInput
                label="物料編號"
                value={materialNumber}
                OnChange={(e) => setMaterialNumber(e.target.value)}
              />
            </ProductDrawer>
          </ProcMaterialsTable>
        </div>
      </ProductContent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
