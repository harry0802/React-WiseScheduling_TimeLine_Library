import styled from "styled-components";

const TheSection = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0px;
  padding: 1.25rem;
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
`;

function BaseSection({ backgroundImage, children }) {
  return <TheSection $backgroundImage={backgroundImage}>{children}</TheSection>;
}

export default BaseSection;
