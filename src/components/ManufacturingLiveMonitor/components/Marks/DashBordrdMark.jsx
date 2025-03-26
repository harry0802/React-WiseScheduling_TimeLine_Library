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
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
`;

const MarkText = styled.span`
  font-size: 14px;
  font-weight: 600;
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
