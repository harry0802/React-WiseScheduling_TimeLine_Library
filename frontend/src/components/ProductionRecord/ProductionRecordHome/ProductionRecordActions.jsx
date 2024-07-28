import { useEffect, useState } from "react";
import { useRecord } from "../Context/ProductionRecordProvider.jsx";
import "../index.scss";

import { Select, Input, Space } from "antd";
import ProductionRecordButton from "../Utility/ProductionRecordButton.jsx";

// UI Icon
import { SearchOutlined } from "@ant-design/icons";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

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
      {/* 下拉 與 input 同組 */}

      <Space>
        <Space.Compact>
          <Select
            style={{ width: 135 }}
            defaultValue={userSelect}
            options={options}
            onChange={handleSelectChange}
          />
          <Input
            style={{
              width: 320,
            }}
            placeholder="請輸入關鍵字查詢"
            onChange={handleSearchChange}
            suffix={<SearchOutlined />}
          />
        </Space.Compact>
      </Space>
      <div className="record-actions__button">
        <ProductionRecordButton>
          <MenuBookOutlinedIcon />
        </ProductionRecordButton>

        <ProductionRecordButton>
          <AddOutlinedIcon />
        </ProductionRecordButton>
      </div>
    </div>
  );
}

export default ProductionRecordActions;
