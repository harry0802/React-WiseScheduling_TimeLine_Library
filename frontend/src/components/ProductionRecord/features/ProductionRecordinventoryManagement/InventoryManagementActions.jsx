import { useState } from "react";
import ProductDropdownSearch from "../../utility/ProductDropdownSearch.jsx";
const options = [
  { label: "物料編號", value: "materialSN" },
  { label: "物料名稱", value: "materialName" },
];

function InventoryManagementActions() {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);

  return (
    <ProductDropdownSearch
      options={options}
      userSelect={userSelect}
      handleSearchChange={(e) => setUserSearch(e.target.value)}
      handleSelectChange={(e) => setUserSelect(e)}
    />
  );
}

export default InventoryManagementActions;
