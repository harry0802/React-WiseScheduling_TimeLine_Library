import "../index.scss";

import { Select, Input, Space } from "antd";

// UI Icon
import { SearchOutlined } from "@ant-design/icons";

function ProductDropdownSearch({
  options,
  userSelect,
  handleSelectChange,
  handleSearchChange,
}) {
  return (
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
  );
}

export default ProductDropdownSearch;
