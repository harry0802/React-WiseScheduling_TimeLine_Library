import { useEffect } from "react";
import { ProductionRecordProvider } from "../components/ProductionRecord/context/ProductionRecordProvider.jsx";
import ProductionRecord from "../components/ProductionRecord/index.jsx";
import { useGetProductsWithPaginationQuery } from "../components/ProductionRecord/service/endpoints/productApi.js";
import { homeSlice } from "../components/ProductionRecord/slice/HomeSlice.jsx";
function ProductionRecordPage() {
  const { setData } = homeSlice();
  const { data: productData } = useGetProductsWithPaginationQuery();
  useEffect(() => {
    (async function () {
      if (productData) {
        setData(productData.data);
      }
    })();
  }, [productData, setData]);
  return (
    <div>
      <ProductionRecordProvider>
        <ProductionRecord />
      </ProductionRecordProvider>
    </div>
  );
}

export default ProductionRecordPage;
