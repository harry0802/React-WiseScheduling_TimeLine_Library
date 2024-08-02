import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecord } from "../../Context/ProductionRecordProvider.jsx";
import "../../index.scss";

import ProductionRecordButton from "../../Utility/ProductionRecordButton.jsx";
import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

import ProductDropdownSearch from "../../Utility/ProductDropdownSearch.jsx";

// UI Icon
import ScienceIcon from "@mui/icons-material/Science";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const options = [
  { label: "產品名稱", value: "productName" },
  { label: "產品編號", value: "productNumber" },
  { label: "舊產品編號", value: "oldProductNumber" },
  { label: "客戶名稱", value: "customerName" },
];

function ProductionRecordActions() {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);
  const { state, dispatch } = useRecord();
  const navigate = useNavigate();

  function handleSearchChange(e) {
    setUserSearch((pS) => (pS = e.currentTarget.value));
  }
  function handleSelectChange(value) {
    setUserSelect((pS) => (pS = value));
  }

  function handleSearch() {
    const { data, itemsPerPage } = state || {};
    if (!data || !userSelect) return;

    // 三元判斷  空值回到原值
    const filteredData = userSearch
      ? data.filter((item) => item[userSelect]?.includes(userSearch))
      : data;

    dispatch({
      type: "SET_FILTERED_DATA",
      payload: { filteredData, itemsPerPage },
    });
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
        handleSelectChange={handleSelectChange}
        handleSearchChange={handleSearchChange}
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
