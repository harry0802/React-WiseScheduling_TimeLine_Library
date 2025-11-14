import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

/**
 * =====================================
 * 🔧 六角形網格佈局組件 (最終正確版)
 * =====================================
 * ✨ [核心架構]
 * 1. (保持) JS 自動分行 (chunkArray)。
 * 2. (保持) 永遠只下推 nth-child(2n) (偶數卡片)。
 * 3. ✨ [本次修改]
 * 減少 "行" 之間的負邊界，
 * 讓第二排 "更下方" (產生垂直間距)。
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

// --- 響應式邏輯 (JS) ---
const BREAKPOINTS = {
  tablet: 768,
  desktop: 1200
}

function getColumns(width) {
  if (width >= BREAKPOINTS.desktop) return 6
  if (width >= BREAKPOINTS.tablet) return 4
  return 2
}

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

// --- Styled Components ---

// 容器：定義變數
const HexagonGridContainer = styled.section`
  /* 響應式尺寸定義 */
  --hexa-columns: 2;
  --hexa-size: 160px;

  @media only screen and (min-width: 768px) {
    --hexa-columns: 4;
    --hexa-size: 180px;
  }

  @media only screen and (min-width: 1200px) {
    --hexa-columns: 6;
    --hexa-size: 200px;
  }

  /* 衍生計算變數 */
  --hexa-height: calc(var(--hexa-size) * 0.8660254);
  --hexa-overlap-x: calc(var(--hexa-size) * 0.25);
  --hexa-col-width: calc(var(--hexa-size) * 0.75);
  --hexa-overlap-y: calc(var(--hexa-height) * 0.5);

  /* ✨ [核心修改] 
   * 將負邊界從 -50% (-0.5) 減少為 -0% (-0)
   * 這會讓第二排 "更下方"
   */
  --hexa-margin-y: 0;

  width: calc(
    var(--hexa-col-width) * var(--hexa-columns) + var(--hexa-overlap-x)
  );
  max-width: 100%;
  margin: 0 auto;
  padding-top: var(--hexa-overlap-y);
  padding-bottom: var(--hexa-overlap-y);
`

// 行：Flex 佈局 + 垂直負邊界 + 交錯邏輯 + 堆疊邏輯
const HexagonRow = styled.div`
  display: flex;
  justify-content: flex-start; /* 保持左對齊 */

  /* 建立堆疊上下文並反轉 z-index */
  position: relative;
  z-index: ${(props) => 10 - props.$rowIndex};

  /* 垂直貼合 (現在使用 -25% 的值) */
  &:not(:first-child) {
    margin-top: var(--hexa-margin-y);
  }

  /* "永遠" 只下推偶數卡片 (nth-child(2n)) */
  & > *:nth-child(2n) {
    transform: translateY(var(--hexa-overlap-y));
  }

  & > *:nth-child(2n):hover {
    transform: translateY(var(--hexa-overlap-y)) scale(1.05);
    z-index: 99;
  }

  /* 所有 "未被下推" (奇數) 的卡片 hover 效果 */
  & > *:nth-child(2n + 1):hover {
    transform: scale(1.05);
    z-index: 99;
  }
`

const HexagonGrid = ({ children }) => {
  const [columns, setColumns] = useState(getColumns(window.innerWidth))

  useEffect(() => {
    function handleResize() {
      setColumns(getColumns(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const rows = useMemo(() => {
    const cards = React.Children.toArray(children)
    return chunkArray(cards, columns)
  }, [children, columns])

  return (
    <>
      <HexagonClipPath />
      <HexagonGridContainer>
        {rows.map((cardsInRow, rowIndex) => (
          <HexagonRow
            key={rowIndex}
            $rowIndex={rowIndex}
          >
            {cardsInRow}
          </HexagonRow>
        ))}
      </HexagonGridContainer>
    </>
  )
}

export default HexagonGrid

