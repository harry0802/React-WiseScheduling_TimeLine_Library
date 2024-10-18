import styled from "@emotion/styled";
import ScoreCard from "../../Global/card/ScoreCard";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function QmsDashbord() {
  return (
    <DashboardWrapper>
      <ScoreCard title="不含營銷的成本小計" value="00,000" unit="元" />
      <ScoreCard title="含營銷的成本小計" value="00,000" unit="元" />
      <ScoreCard title="稅成本" value="00,000" unit="元" />
      <ScoreCard title="實際報價" value="00,000" unit="元" />
    </DashboardWrapper>
  );
}

export default QmsDashbord;
