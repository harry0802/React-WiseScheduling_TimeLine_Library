import { useState } from "react";
import ProductDropdownSearch from "../../utility/ProductDropdownSearch.jsx";
import { useDebounce } from "react-use";
import InventorySlice from "../../slice/InventorySlice.jsx";
const options = [
  { label: "物料編號", value: "materialSN" },
  { label: "物料名稱", value: "materialName" },
];

function InventoryManagementActions() {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);
  const { filterData, dataSource } = InventorySlice();
  const handleSearch = () => {
    if (!dataSource || dataSource?.length < 0) return;
    filterData(userSearch, userSelect);
  };

  useDebounce(handleSearch, 500, [userSearch, userSelect]);

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
//
