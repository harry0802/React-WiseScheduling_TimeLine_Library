import styled from 'styled-components'

/**
 * =====================================
 * 🔧 六角形網格佈局組件
 * =====================================
 * 使用 CSS Grid + clip-path 實現蜂巢式排列
 * 響應式設計：桌面 6 列、平板 4 列、手機 2 列
 */

// SVG clipPath 定義 (隱藏)
export const HexagonClipPath = () => (
  <svg
    width='0'
    height='0'
    style={{ position: 'absolute' }}
  >
    <defs>
      <clipPath
        id='hexagon-clip'
        clipPathUnits='objectBoundingBox'
      >
        <polygon points='.25 0, .75 0, 1 .5, .75 1, .25 1, 0 .5' />
      </clipPath>
    </defs>
  </svg>
)

// 六角形網格容器
const HexagonGridContainer = styled.section`
  /* CSS 變數定義 */
  --hexa-columns: 4;
  --hexa-gap: 1.0vw;
  --hexa-size: calc((100vw - 4rem - (var(--hexa-columns) - 1) * var(--hexa-gap)) / var(--hexa-columns));
  --hexa-height: calc(var(--hexa-size) * 0.866);

  /* 響應式斷點 */
  @media only screen and (min-width: 1200px) {
    --hexa-columns: 6;
    --hexa-gap: 0.8vw;
  }

  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    --hexa-columns: 4;
    --hexa-gap: 1.0vw;
  }

  @media only screen and (max-width: 767px) {
    --hexa-columns: 2;
    --hexa-gap: 1.8vw;
  }

  /* Grid 佈局 */
  margin: calc(var(--hexa-height) * 0.5) auto 0;
  width: calc(var(--hexa-size) * var(--hexa-columns) + var(--hexa-gap) * (var(--hexa-columns) - 1));
  max-width: 100%;
  padding: 2rem 1rem;

  display: grid;
  grid-template-columns: repeat(var(--hexa-columns), 1fr);
  grid-gap: var(--hexa-gap);

  /* 蜂巢交錯效果 */
  & > *:nth-child(2n) {
    margin-top: calc(var(--hexa-height) * 0.5);
  }
`

/**
 * 六角形網格組件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子元素 (HexagonCard)
 */
const HexagonGrid = ({ children }) => {
  return (
    <>
      <HexagonClipPath />
      <HexagonGridContainer>{children}</HexagonGridContainer>
    </>
  )
}

export default HexagonGrid

