import styled from "styled-components";

const MarkBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MarkSign = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color};
`;

const MarkText = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.2px;
`;

function DashBordrdMark({ data }) {
  return (
    <MarkBox>
      {data.map((item) => (
        <ItemBox key={item.color}>
          <MarkSign color={item.color} />
          <MarkText>{item.status}</MarkText>
        </ItemBox>
      ))}
    </MarkBox>
  );
}

export default DashBordrdMark;
