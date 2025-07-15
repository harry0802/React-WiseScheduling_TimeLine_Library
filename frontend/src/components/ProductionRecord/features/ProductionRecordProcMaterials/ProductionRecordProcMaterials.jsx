import Productcontent from "../../utility/ProductContent";
import ProcMaterialsTable from "./ProcMaterialsTable";
import ProcMaterialsDrawer from "./ProcMaterialsDrawer";
import {
  useRecordProcMaterials,
  productColumns,
  materialColumns,
} from "../../hook/useRecordProcMaterials";
import { ProcMaterialsContext, AntdTableGlobalStyles } from "./ProductionRecordProcMaterials.styled";

// Main Component
function ProductionRecordProcMaterials() {
  const {
    openDrawer,
    handleSubmit,
    handleInputChange,
    setUserSelect,
    handleDelete,
    handleOnClose,
    productData,
    materialDataList,
    isAppoint,
    selectedData,
    isEditing,
    userSelect,
    drawerVisible,
    drawerType,
    isDuplicate,
    processOption,
  } = useRecordProcMaterials();

  return (
    <div>
      <AntdTableGlobalStyles />
      <Productcontent title="製程與物料編碼">
        <ProcMaterialsContext>
          <ProcMaterialsTable
            title="製程編碼管理"
            columns={productColumns}
            data={productData}
            onRowClick={async (record) => {
              openDrawer(record, "product");
            }}
            onAddClick={() => openDrawer(null, "product")}
          />

          <ProcMaterialsTable
            title="物料種類代碼管理"
            columns={materialColumns}
            data={materialDataList}
            onRowClick={(record) => openDrawer(record, "material")}
            onAddClick={() => openDrawer(null, "material")}
          />
        </ProcMaterialsContext>

        {drawerVisible && (
          <ProcMaterialsDrawer
            isDuplicate={isDuplicate}
            isEditing={isEditing}
            drawerType={drawerType}
            isAppoint={isAppoint}
            drawerVisible={drawerVisible}
            selectedData={selectedData}
            userSelect={userSelect}
            handleOnClose={handleOnClose}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            setUserSelect={setUserSelect}
            handleInputChange={handleInputChange}
            processOption={processOption}
          />
        )}
      </Productcontent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
