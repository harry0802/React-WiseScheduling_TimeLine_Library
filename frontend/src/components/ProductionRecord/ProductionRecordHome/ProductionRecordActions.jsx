import { useState } from "react";
import "../index.scss";

import { Select, Input, Space } from "antd";
import ProductionRecordButton from "../Utility/ProductionRecordButton.jsx";

// UI Icon
import { SearchOutlined } from "@ant-design/icons";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const options = [
  { label: "產品名稱", value: "productName" },
  { label: "產品編號", value: "productNumber" },
  { label: "舊產品編號", value: "oldProductNumber" },
  { label: "客戶名稱", value: "customerName" },
];

function ProductionRecordActions() {
  const [userSearch, setUserSearch] = useState(options[0].value);
  const [userSelect, setUserSelect] = useState("");

  function handleSearchChange(e) {
    setUserSearch((pS) => (pS = e.currentTarget.value));
  }
  function handleSelectChange(value) {
    setUserSelect((pS) => (pS = value));
  }

  return (
    <div className="record-actions">
      {/* 下拉 與 input 同組 */}

      <Space>
        <Space.Compact>
          <Select
            style={{ width: 135 }} // 設置 Select 組件的寬度
            defaultValue={userSearch}
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
