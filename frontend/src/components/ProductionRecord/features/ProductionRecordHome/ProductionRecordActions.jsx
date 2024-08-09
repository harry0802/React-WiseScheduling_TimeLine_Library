import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductionRecordButton from "../../utility/ProductionRecordButton.jsx";
import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

import ProductDropdownSearch from "../../utility/ProductDropdownSearch.jsx";

// UI Icon
import ScienceIcon from "@mui/icons-material/Science";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { homeSlice } from "../../slice/HomeSlice.jsx";

const options = [
  { label: "產品名稱", value: "productName" },
  { label: "產品編號", value: "productNumber" },
  { label: "舊產品編號", value: "oldProductNumber" },
  { label: "客戶名稱", value: "customerName" },
];

function ProductionRecordActions() {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);
  const navigate = useNavigate();

  const { searchData, data } = homeSlice();

  function handleSearch() {
    if (!data || !userSelect) return;

    searchData(userSearch, userSelect);
  }

  const throttledHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    throttledHandleSearch();
    return () => {
      throttledHandleSearch.cancel();
    };
  }, [userSearch, userSelect]);

  return (
    <div className="record-actions">
      <ProductDropdownSearch
        options={options}
        userSelect={userSelect}
        handleSelectChange={(value) => setUserSelect(value)}
        handleSearchChange={(e) => setUserSearch(e.currentTarget.value)}
      />

      <div className="record-actions__button">
        <ProductionRecordButton OnClick={() => navigate("inventoryManagement")}>
          <ScienceIcon />
        </ProductionRecordButton>

        <ProductionRecordButton OnClick={() => navigate("procMaterials")}>
          <MenuBookOutlinedIcon />
        </ProductionRecordButton>
      </div>
    </div>
  );
}

export default ProductionRecordActions;
