import styled from "styled-components";
import ReceiptTable from "../../../components/table/ReceiptTable";
import { useState } from "react";
import { useGetProductionCostsQuery } from "../../../service/ReceiptApi";

const MasterBatchWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
`;

const MasterBatchHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
`;

function MasterBatch() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isFetching } = useGetProductionCostsQuery({
    dataType: "mother",
    page: page + 1,
    size: pageSize,
  });

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <MasterBatchWrapper>
      <MasterBatchHeader>母批列表</MasterBatchHeader>
      <ReceiptTable
        isParent
        rows={data?.rows ?? []}
        loading={isLoading || isFetching}
        totalCount={data?.totalCount ?? 0}
        page={page}
        pageSize={pageSize}
        onPaginationModelChange={handlePaginationModelChange}
      />
    </MasterBatchWrapper>
  );
}

export default MasterBatch;
