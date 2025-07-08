import { SearchOutlined } from "@ant-design/icons";
import {
  SearchContainer,
  SearchCompact,
  StyledSelect,
  StyledInput,
} from "./ProductDropdownSearch.styled";

function ProductDropdownSearch({
  options,
  userSelect,
  handleSelectChange,
  handleSearchChange,
}) {
  return (
    <SearchContainer>
      <SearchCompact>
        <StyledSelect
          defaultValue={userSelect}
          options={options}
          onChange={handleSelectChange}
        />
        <StyledInput
          placeholder="請輸入關鍵字查詢"
          onChange={handleSearchChange}
          suffix={<SearchOutlined />}
        />
      </SearchCompact>
    </SearchContainer>
  );
}

export default ProductDropdownSearch;
