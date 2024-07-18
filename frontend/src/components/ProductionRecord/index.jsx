import { useState } from "react";
import "./index.scss";

import { Select, Input, Space, Button, Pagination, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProductionRecordHome from "../ProductionRecord/ProductionRecordHome.jsx";

//  共用按鈕
function ProductionRecordButton({
  children,
  shape = "circle",
  OnClick = null,
  className = "",
  icon,
}) {
  return (
    <Button
      onClick={OnClick}
      className={`c-btn-primars${className}`}
      shape={shape}
      icon={icon}
    >
      {children}
    </Button>
  );
}

// 包裝組件
function ProductionRecordWarpper({ children }) {
  return (
    <div className="record">
      <div className="record__container">{children}</div>
    </div>
  );
}

// header 區塊
function ProductionRecordHeader({ children }) {
  return <div className="record-header">{children}</div>;
}

// header ->  搜尋欄
function ProductionRecordActions() {
  const options = [
    { label: "產品名稱", value: "productName" },
    { label: "產品編號", value: "productNumber" },
    { label: "舊產品編號", value: "oldProductNumber" },
    { label: "客戶名稱", value: "customerName" },
  ];

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

// content 區塊
function ProductionRecordSections({ children }) {
  return <section className="record-sections">{children}</section>;
}

function ProductionRecord() {
  return (
    <ProductionRecordWarpper>
      <ProductionRecordHeader>
        <div className="record-header__title">
          <h3 className="record-header__title">產品履歷與BOM</h3>
        </div>
        <ProductionRecordActions />
      </ProductionRecordHeader>

      <ProductionRecordSections>
        <ProductionRecordHome />

        {/* output 放這裡  */}
      </ProductionRecordSections>
    </ProductionRecordWarpper>
  );
}

export default ProductionRecord;
