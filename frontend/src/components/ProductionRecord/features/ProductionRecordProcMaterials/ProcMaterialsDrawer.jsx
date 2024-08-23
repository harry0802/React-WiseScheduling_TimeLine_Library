import React from "react";
import ProductionRecordButton from "../../utility/ProductionRecordButton";
import ProductDrawer from "../../utility/ProductDrawer";
import ProductTextFieldInput from "../../utility/ProductTextFieldInput";
import ProductTextFieldSelect from "../../utility/ProductTextFieldSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import EditWarning from "./EditWarning";

const options = [
  { value: "In-ij廠內成型", label: "In-ij廠內成型" },
  { value: "Out-委外成型", label: "Out-委外成型" },
  { value: "In-BE-廠內後製程", label: "In-BE-廠內後製程" },
  { value: "Out-BE-委外後製程", label: "Out-BE-委外後製程" },
  { value: "In-TS廠內出貨檢驗", label: "In-TS廠內出貨檢驗" },
];
export default function ProcMaterialsDrawer({
  isEditing,
  drawerType,
  selectedData,
  drawerVisible,
  handleOnClose,
  handleSubmit,
  setUserSelect,
  isAppoint,
  handleDelete,
  handleInputChange,
  userSelect,
  isDuplicate,
}) {
  const isProduct = drawerType === "product";
  const fields = {
    name: isProduct ? "processSN" : "materialCode",
    code: isProduct ? "processName" : "materialType",
    title: isEditing
      ? isProduct
        ? "編輯製程編碼"
        : "編輯物料種類編碼"
      : isProduct
      ? "添加製程編碼"
      : "添加物料種類編碼",
    nameLabel: isProduct ? "製程名稱" : "物料代碼",
    codeLabel: isProduct ? "製程代碼" : "物料種類",
  };
  const handleFieldChange = (field) => (e) =>
    handleInputChange(field, e.target.value);

  const isDisabled = () => {
    if (isProduct) {
      return !selectedData?.processSN || !selectedData?.processName;
    } else {
      return !selectedData?.materialCode || !selectedData?.materialType;
    }
  };

  return (
    <ProductDrawer
      title={fields.title}
      visible={drawerVisible}
      onClose={handleOnClose}
      onSubmit={() => handleSubmit(selectedData)}
      headericon={
        isEditing &&
        isAppoint && (
          <ProductionRecordButton
            OnClick={handleDelete}
            className="c-btn-primars--delete"
          >
            <DeleteIcon />
          </ProductionRecordButton>
        )
      }
      disabled={isDisabled()}
    >
      <ProductTextFieldInput
        label={fields.nameLabel}
        value={selectedData?.[fields.name] || ""}
        OnChange={handleFieldChange(fields.name)}
      />
      <ProductTextFieldInput
        label={fields.codeLabel}
        value={selectedData?.[fields.code] || ""}
        OnChange={handleFieldChange(fields.code)}
      />
      {isProduct && (
        <ProductTextFieldSelect
          label="製程類別"
          value={selectedData?.processCategory || userSelect}
          option={options}
          OnChange={(e) => {
            const selectedValue = e.target.value;
            setUserSelect(selectedValue);
            handleInputChange("processCategory", selectedValue);
          }}
        />
      )}

      <EditWarning
        isEditing={isEditing}
        isAppoint={isAppoint}
        drawerType={drawerType}
        isDuplicate={isDuplicate}
      />
    </ProductDrawer>
  );
}
