import { useState } from "react";

// UI Icon
import AddIcon from "@mui/icons-material/Add";
import { useDebounce } from "react-use";
import ProductDropdownSearch from "../../ProductionRecord/utility/ProductDropdownSearch.jsx";
import ProductionRecordButton from "../../ProductionRecord/utility/ProductionRecordButton.jsx";

const options = [
  { label: "產品名稱", value: "productName" },
  { label: "客戶名稱", value: "customerName" },
];

function QmsActions({ onCreate, onSearch }) {
  const [userSearch, setUserSearch] = useState("");
  const [userSelect, setUserSelect] = useState(options[0].value);

  useDebounce(() => onSearch?.(userSearch, userSelect), 500, [
    userSearch,
    userSelect,
  ]);

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
          tooltip="新增空白報價單"
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
