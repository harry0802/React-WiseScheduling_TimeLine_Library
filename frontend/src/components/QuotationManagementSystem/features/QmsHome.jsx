import { useNavigate } from "react-router-dom";
import SharedCard from "../../Global/card/ProductCard";
import { qmsHomeSlice } from "../slice/qmsHome";
import PmHomeContent from "../../Global/content/PmHomeContent";

function QmsHome() {
  const navigate = useNavigate();
  const {
    displayedData,
    currentPage,
    itemsPerPage,
    total,
    setPage,
    setPageSize,
  } = qmsHomeSlice();

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

  //   PmPagination

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
