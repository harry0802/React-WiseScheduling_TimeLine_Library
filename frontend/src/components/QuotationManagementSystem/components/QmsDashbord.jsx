import styled from "@emotion/styled";
import ScoreCard from "../../Global/card/ScoreCard";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function QmsDashbord({ costAndQuotation }) {
  return (
    <DashboardWrapper>
      <ScoreCard
        title="不含營銷的成本小計"
        value={costAndQuotation.base ?? 0}
        unit="元"
      />
      <ScoreCard
        title="含營銷的成本小計"
        value={costAndQuotation.withMarketing ?? 0}
        unit="元"
      />
      <ScoreCard
        title="總成本"
        value={costAndQuotation.totalCost ?? 0}
        unit="元"
      />
      <ScoreCard
        title="實際報價"
        value={costAndQuotation.actual ?? 0}
        unit="元"
      />
    </DashboardWrapper>
  );
}

export default QmsDashbord;
