import { useNavigate, useLocation } from "react-router-dom";
import SharedCard from "../../Global/card/ProductCard";
import {
  qmsHomeSlice,
  useSalesHomeSlice,
  useFactoryHomeSlice,
} from "../slice/qmsHome";
import PmHomeContent from "../../Global/content/PmHomeContent";

function QmsHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const sliceHook = location.pathname.includes("Sales")
    ? useSalesHomeSlice
    : useFactoryHomeSlice;

  const {
    displayedData,
    currentPage,
    itemsPerPage,
    total,
    setPage,
    setPageSize,
  } = sliceHook();

  function handleCardClick(id) {
    return navigate(`addProductInfo/${id}`);
  }

  function renderFn(data) {
    return data?.map((data) => (
      <SharedCard
        key={data.id}
        data={data}
        onButtonClick={() => handleCardClick(data.id)}
        title={data.customerName}
        subtitle={data.productName}
        content={data.additional_info}
      />
    ));
  }

  return (
    <PmHomeContent>
      <PmHomeContent.Content>
        {displayedData && renderFn(displayedData)}
      </PmHomeContent.Content>

      <PmHomeContent.Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        total={total}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </PmHomeContent>
  );
}

export default QmsHome;
