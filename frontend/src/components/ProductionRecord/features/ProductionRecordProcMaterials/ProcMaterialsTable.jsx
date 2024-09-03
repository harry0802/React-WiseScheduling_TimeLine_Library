import ProductContextCard from "../../utility/ProductContextCard";
import ProcMaterialsReusableTable from "./table/ProcMaterialsReusableTable";
import AddIcon from "@mui/icons-material/Add";

// ProcMaterials Table Component
function ProcMaterialsTable({ title, columns, data, onRowClick, onAddClick }) {
  return (
    <>
      <ProductContextCard OnClick={onAddClick} title={title} icon={<AddIcon />}>
        <ProcMaterialsReusableTable
          columns={columns}
          data={data}
          onRowClick={onRowClick}
        />
      </ProductContextCard>
    </>
  );
}

export default ProcMaterialsTable;
