import styled from "styled-components";
import { STATUS_COLORS, STATUS_NAMES } from "../../configs/Color";
const MarkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MarkSign = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
`;

const MarkText = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

function DashBordrdMark({ status, color }) {
  const statusName = STATUS_NAMES[status];
  const statusColor = STATUS_COLORS[color];

  return (
    <MarkBox>
      <MarkSign color={statusColor} />
      <MarkText>{statusName}</MarkText>
    </MarkBox>
  );
}

export default DashBordrdMark;
