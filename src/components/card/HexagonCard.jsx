import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../designTokens'

/**
 * =====================================
 * 🔧 專業六角形卡片組件 (雙層結構)
 * =====================================
 * 特色：
 * - 白色外框 + 深色內層 (雙層六角形)
 * - Hover 顯示詳細資訊 + 按鈕
 * - 高質感視覺效果 (浮起、縮放、陰影)
 * - 彈性動畫效果
 */

//! =============== 外層六角形 (白色邊框層) ===============
const OuterHexagon = styled(Link)`
  /* 尺寸由 Grid 控制 */
  width: 100%;
  height: 0;
  padding-bottom: 86.6%; /* 維持六角形比例 */
  position: relative;
  cursor: pointer;
  text-decoration: none;
  display: block;

  /* 六角形裁切 */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 白色邊框背景 */
  background: linear-gradient(135deg, ${colors.accent.gold}dd, ${colors.accent.gold}aa);

  /* 基礎陰影 */
  box-shadow:
    0 4px 8px ${colors.accent.gold}15,
    0 2px 4px ${colors.accent.gold}10;

  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Hover 陰影效果 */
  &:hover {
    box-shadow:
      0 8px 24px ${colors.accent.gold}25,
      0 4px 12px ${colors.accent.gold}15;

    /* 觸發內層動畫 - 直接透明切換 */
    .card-front {
      opacity: 0;
      transition-delay: 0s;
    }

    .card-back {
      opacity: 1;
      transition-delay: 0.15s;
    }
  }
`

//! =============== 內層六角形 (深色內容層) ===============
const InnerHexagon = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  overflow: hidden;

  /* 六角形裁切 (內縮) */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 深色背景 + 漸層 */
  background: ${colors.background.secondary};
`

//! =============== 卡片正面 (預設狀態：圖標 + 標題) ===============
const CardFront = styled.div`
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;

  /* 預設顯示，Hover 時淡出 */
  opacity: 1;
  transition: opacity 0.3s ease-in 0.2s;
`

//! =============== 卡片背面 (Hover 狀態：完整描述 + 按鈕) ===============
const CardBack = styled.div`
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;

  /* 預設隱藏，Hover 時顯示 */
  opacity: 0;
  transition: opacity 0.25s ease-out;
`

//! =============== 共用樣式：圖標 ===============
const HexagonIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 4px 8px ${colors.accent.gold}50);
`

//! =============== 共用樣式：標題 ===============
const HexagonTitle = styled.h3`
  color: ${colors.accent.gold};
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.5rem 0;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-shadow: 0 2px 4px ${colors.accent.gold}30;
`

//! =============== 詳細描述 (僅背面顯示) ===============
const HexagonDescription = styled.p`
  color: ${colors.text.inverse};
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0.75rem 0 1rem;
  opacity: 0.95;
  max-width: 90%;
  font-weight: 400;
`

//! =============== 按鈕 (僅背面顯示) ===============
const HexagonButton = styled.div`
  background: linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.gold}cc);
  color: ${colors.background.primary};
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 12px ${colors.accent.gold}40;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${colors.accent.gold}60;
  }
`

//! =============== 裝飾背景 ===============
const HexagonBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${colors.accent.gold}10, transparent);
  clip-path: inherit;
  z-index: 0;
  pointer-events: none;
`

/**
 * 專業六角形卡片組件
 * @param {Object} props
 * @param {string} props.icon - 表情符號圖標
 * @param {string} props.title - 卡片標題
 * @param {string} props.description - 卡片詳細描述
 * @param {string} props.link - 路由連結
 * @param {string} [props.buttonText='查看更多'] - 按鈕文字
 */
const HexagonCard = ({ icon, title, description, link, buttonText = '查看更多' }) => {
  return (
    <OuterHexagon to={link}>
      <InnerHexagon className="inner-hexagon">
        <HexagonBackground />

        {/* 正面：圖標 + 標題 */}
        <CardFront className="card-front">
          <HexagonIcon className="hexagon-icon">{icon}</HexagonIcon>
          <HexagonTitle>{title}</HexagonTitle>
        </CardFront>

        {/* 背面：完整描述 + 按鈕 */}
        <CardBack className="card-back">
          <HexagonIcon style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {icon}
          </HexagonIcon>
          <HexagonTitle style={{ fontSize: '0.95rem' }}>{title}</HexagonTitle>
          <HexagonDescription>{description}</HexagonDescription>
          <HexagonButton>{buttonText}</HexagonButton>
        </CardBack>
      </InnerHexagon>
    </OuterHexagon>
  )
}

export default HexagonCard
