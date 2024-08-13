import styles from "./ProductionRecordProcMaterials.module.scss";
import { Table } from "antd";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import ProductContextCard from "../../utility/ProductContextCard";
import ProductDrawer from "../../utility/ProductDrawer";
import ProductTextFieldInput from "../../utility/ProductTextFieldInput";
import ProductTextFieldSelect from "../../utility/ProductTextFieldSelect";
import Productcontent from "../../utility/ProductContent";
import useNotification from "../../hook/useNotification";

// Column Definitions
const productColumns = [
  { title: "編號", dataIndex: "id", width: 50, key: "id" },
  { title: "製程代碼", dataIndex: "code", key: "code" },
  { title: "製程名稱", dataIndex: "name", key: "name" },
  { title: "製成類別", dataIndex: "description", key: "description" },
];

const materialColumns = [
  { title: "編號", dataIndex: "id", width: 50, key: "id" },
  { title: "物料代碼", dataIndex: "code", key: "code" },
  { title: "物料名稱", dataIndex: "name", key: "name" },
];

// Options for Process Categories
const options = [
  { value: "In-ij廠內成型", label: "In-ij廠內成型" },
  { value: "Out-委外成型", label: "Out-委外成型" },
  { value: "In-BE-廠內後製程", label: "In-BE-廠內後製程" },
  { value: "Out-BE-委外後製程", label: "Out-BE-委外後製程" },
  { value: "In-TS廠內出貨檢驗", label: "In-TS廠內出貨檢驗" },
];

// Generate Data Function
const generateData = (count, type) => {
  return Array.from({ length: count }, (_, i) => ({
    key: (i + 1).toString(),
    id: (i + 1).toString().padStart(2, "0"),
    code: type === "product" ? "In-UJ01" : `Rm-${i + 1}`,
    name: type === "product" ? "商內-成品-UJ01" : `原料${i + 1}`,
    description:
      type === "product"
        ? options[Math.floor(Math.random() * options.length)].value
        : undefined,
  }));
};

// Reusable Table Component
function ReusableTable({ columns, data, onRowClick }) {
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

// ProcMaterials Table Component
function ProcMaterialsTable({ title, columns, data, onRowClick, onAddClick }) {
  return (
    <>
      <ProductContextCard OnClick={onAddClick} title={title} icon={<AddIcon />}>
        <ReusableTable columns={columns} data={data} onRowClick={onRowClick} />
      </ProductContextCard>
    </>
  );
}

// Main Component
function ProductionRecordProcMaterials() {
  const [selectedData, setSelectedData] = useState(null);
  const [userSelect, setUserSelect] = useState(options[0].value);
  const [productData, setProductData] = useState([]);
  const [materialDataList, setMaterialDataList] = useState([]);
  const { notifySuccess } = useNotification();

  const [drawerVisible, setDrawerVisible] = useState(false);
  // "product" or "material"
  const [drawerType, setDrawerType] = useState("product");

  const { handlePageStatust } = useRecord();

  const openDrawer = (data, type) => {
    setSelectedData(data);
    setDrawerType(type);
    setDrawerVisible(true);
    if (data && data.description) {
      setUserSelect(data.description);
    }
  };

  const handleSubmit = () => {
    const updateData = (dataList, updatedData) => {
      return dataList.map((item) =>
        item.id === updatedData.id ? updatedData : item
      );
    };

    if (drawerType === "product") {
      setProductData((prevData) => updateData(prevData, selectedData));
    } else {
      setMaterialDataList((prevData) => updateData(prevData, selectedData));
    }
    setDrawerVisible(false);
    setSelectedData(null);
    setUserSelect(options[0].value);
    setTimeout(() => notifySuccess(), 200);
  };

  const handleInputChange = (field, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderDrawer = () => (
    <ProductDrawer
      title={drawerType === "product" ? "編輯製程編碼" : "編輯物料種類編碼"}
      visible={drawerVisible}
      onClose={() => {
        setDrawerVisible(false);
        setUserSelect(options[0].value);
      }}
      onSubmit={handleSubmit}
    >
      <ProductTextFieldInput
        label={drawerType === "product" ? "製程名稱" : "物料名稱"}
        value={selectedData?.name || ""}
        OnChange={(e) => handleInputChange("name", e.target.value)}
      />
      <ProductTextFieldInput
        label={drawerType === "product" ? "製程代碼" : "物料代碼"}
        value={selectedData?.code || ""}
        OnChange={(e) => handleInputChange("code", e.target.value)}
      />
      {drawerType === "product" && (
        <ProductTextFieldSelect
          label="製程類別"
          value={userSelect}
          option={options}
          OnChange={(e) => {
            setUserSelect(e.target.value);
            handleInputChange("description", e.target.value);
          }}
        />
      )}
    </ProductDrawer>
  );

  useEffect(() => {
    handlePageStatust("製程與物料編碼維護");
  }, []);

  useEffect(() => {
    setProductData(generateData(50, "product"));
    setMaterialDataList(generateData(50, "material"));
  }, []);

  return (
    <div>
      <Productcontent title="製程與物料編碼">
        <div className={styles["procMaterials-context"]}>
          <ProcMaterialsTable
            title="製程編碼管理"
            columns={productColumns}
            data={productData}
            onRowClick={(record) => openDrawer(record, "product")}
            onAddClick={() => openDrawer(null, "product")}
          />

          <ProcMaterialsTable
            title="物料種類代碼管理"
            columns={materialColumns}
            data={materialDataList}
            onRowClick={(record) => openDrawer(record, "material")}
            onAddClick={() => openDrawer(null, "material")}
          />
        </div>
        {renderDrawer()}
      </Productcontent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
