import styled from "styled-components";
import ReceiptTable from "../../../components/table/ReceiptTable";
import { useState } from "react";
import { useGetProductionCostsQuery } from "../../../service/ReceiptApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import { ArrowLeftOutlined } from "@mui/icons-material";
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

const ArrowLeftIcon = styled(ArrowLeftOutlined)`
  && {
    font-size: 2rem;
    color: var(--color-primary-text);
    cursor: pointer;
  }
`;

function SubBatch() {
  const { productionReportId } = useParams();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetProductionCostsQuery({
    dataType: "child",
    productionReportId,
    page: page + 1,
    size: pageSize,
  });

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  if (!productionReportId) {
    return <div>請選擇母批</div>;
  }

  return (
    <MasterBatchWrapper>
      <MasterBatchHeader>
        {/* 返回的 icon */}
        <Button onClick={() => navigate(-1)}>
          <Tooltip title="返回母批">
            <ArrowLeftIcon />
          </Tooltip>
        </Button>
        子批列表
      </MasterBatchHeader>
      <ReceiptTable
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

export default SubBatch;
