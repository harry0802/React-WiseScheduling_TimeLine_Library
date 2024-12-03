//! =============== 1. 設定與常量 ===============
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useGetProductsWithPaginationQuery } from "../../ProductionRecord/service/endpoints/productApi";
import { debounce } from "lodash";

//! =============== 2. 常量定義 ===============
const ROUTES = {
  BASE_PATH: "/FactoryQuotationManagementSystem",
};

const LOADING_TEXT = "載入中...";
const ERROR_TEXT = "載入失敗";

const DEFAULT_PARAMS = {
  productName: undefined,
  oldProductSN: undefined,
  productSN: undefined,
  sort: undefined,
  size: "10",
  page: "1",
};

//! =============== 3. 核心組件 ===============
function FactoryManagementSystem() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState(DEFAULT_PARAMS);

  const handleQueryChange = debounce((newParams) => {
    setQueryParams((prev) => ({
      ...prev,
      ...newParams,
      page: newParams.page ?? "1",
    }));
  }, 300);

  const routes = [
    {
      path: ROUTES.BASE_PATH,
      Action: (
        <QmsActions
          onQueryChange={handleQueryChange}
          queryParams={queryParams}
        />
      ),
    },
  ];

  return <SharedManagementSystem currentRouter={routes} />;
}

export default FactoryManagementSystem;
