import { useState } from "react";

// UI Icon
import AddIcon from "@mui/icons-material/Add";
import { useDebounce } from "react-use";
import ProductDropdownSearch from "../../ProductionRecord/utility/ProductDropdownSearch.jsx";
import ProductionRecordButton from "../../ProductionRecord/utility/ProductionRecordButton.jsx";
import { useSalesHomeSlice } from "../slice/qmsHome.jsx";

const options = [
  { label: "產品名稱", value: "productName" },
  { label: "客戶名稱", value: "customerName" },
];

function QmsActions({ onCreate }) {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);
  const { searchData, data } = useSalesHomeSlice();
  function handleSearch() {
    if (!data || !userSelect) return;
    searchData(userSearch, userSelect);
  }
  useDebounce(handleSearch, 500, [userSearch, userSelect]);

  return (
    <div className="record-actions">
      <ProductDropdownSearch
        options={options}
        userSelect={userSelect}
        handleSelectChange={(value) => setUserSelect(value)}
        handleSearchChange={(e) => setUserSearch(e.currentTarget.value)}
      />

      <div className="record-actions__button">
        <ProductionRecordButton
          tooltip="物料編碼與製程編碼"
          OnClick={() => {
            onCreate?.();
          }}
        >
          <AddIcon />
        </ProductionRecordButton>
      </div>
    </div>
  );
}

export default QmsActions;
