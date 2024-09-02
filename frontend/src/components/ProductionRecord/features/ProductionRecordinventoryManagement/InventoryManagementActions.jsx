import { useState, useEffect } from "react";
import ProductDropdownSearch from "../../utility/ProductDropdownSearch.jsx";
import { useDebounce } from "react-use";
import useInventoryStore from "../../slice/InventorySlice.jsx"; // 更新的引入

const options = [
  { label: "物料編號", value: "materialSN" },
  { label: "物料名稱", value: "materialName" },
];

function InventoryManagementActions() {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);
  const { filterData, dataSource, setSearchState } = useInventoryStore(); // 更新以使用 Zustand store

  const handleSearch = () => {
    if (!dataSource || dataSource?.length < 0) return;
    filterData(userSearch, userSelect);
    setSearchState({ userSearch, userSelect }); // 存儲搜尋狀態
  };

  useDebounce(handleSearch, 500, [userSearch, userSelect]);

  useEffect(() => {
    setSearchState({ userSearch, userSelect }); // 在組件掛載時初始化搜尋狀態
  }, []);

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
