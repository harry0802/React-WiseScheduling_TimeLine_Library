import styled from "styled-components";

const ProcessBox = styled("div")``;
const ProcessTitle = styled("div")`
  color: #fff;
  font-size: 18px;
`;
const ProcessPercentage = styled("p")`
  color: inherit;
  font-size: 48px;
`;
const ProcessQuantity = styled("p")`
  color: inherit;
  font-size: 48px;
`;
function ProcessText({ data }) {
  return (
    <ProcessBox>
      <ProcessTitle className="text-6xl">當日入庫 </ProcessTitle>
      <ProcessPercentage>{data?.percentage}%</ProcessPercentage>
      <ProcessQuantity>{data?.quantity}筆</ProcessQuantity>
    </ProcessBox>
  );
}

export default ProcessText;
