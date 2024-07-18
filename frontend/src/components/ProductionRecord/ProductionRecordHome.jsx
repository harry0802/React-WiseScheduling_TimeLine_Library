import ProductionRecordCard from "../ProductionRecord/ProductionRecordCard.jsx";
import { useRecord } from "../ProductionRecord/ProductionRecordProvider.jsx";
import "./index.scss";

import { Pagination } from "antd";

// 分頁器
function ProductionRecordPaginations({ total, defaultCurrent = 1 }) {
  return (
    <Pagination
      className="record-paginations"
      itemActiveColorDisabled
      defaultCurrent={defaultCurrent}
      total={total}
    />
  );
}

// 首頁
function ProductionRecordHome() {
  const { productMenu, setProductMenu } = useRecord();

  const handleButtonClick = () => {
    alert("Button clicked!");
  };
  return (
    <div className="record-home">
      <div className="record-home__content">
        {productMenu.map((data) => (
          <ProductionRecordCard
            key={data.id}
            title={data.id}
            subtitle={data.description}
            content={data.additional_info}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>
      <ProductionRecordPaginations total={productMenu.length} />
    </div>
  );
}

export default ProductionRecordHome;
