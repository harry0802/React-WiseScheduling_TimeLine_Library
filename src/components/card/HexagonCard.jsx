import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { colors } from '../../designTokens'

/**
 * =====================================
 * 🔧 專業六角形卡片組件 (最終簡化版)
 * =====================================
 * ✨ [本次修改]
 * 根據您的要求，簡化 'hover' 效果。
 * 'CardBack' (背面) 現在只顯示 "標題" 和 "描述"，
 * 移除了小圖標和按鈕。
 */

//! =============== 外層六角形 (白色邊框層) ===============
const OuterHexagon = styled(Link)`
  /* 強制 padding 被包含在 height 內 */
  box-sizing: border-box;

  /* 繼承 Grid 定義的 CSS 變數 */
  width: var(--hexa-size);
  height: var(--hexa-height);

  /* ✨ [核心] 水平貼合：所有卡片向左重疊 25% */
  margin-left: calc(var(--hexa-size) * -0.25);

  /* ✨ [核心] 校正每行第一個：(因為這是 row 裡的第一個) */
  &:first-child {
    margin-left: 0;
  }

  /* ✨ [核心移除] transform 邏輯已由 HexagonRow 父層接管 */

  /* 基礎樣式 */
  position: relative;
  cursor: pointer;
  text-decoration: none;
  display: block;

  /* 六角形裁切 */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 白色邊框背景 */
  background: linear-gradient(
    135deg,
    ${colors.accent.gold}dd,
    ${colors.accent.gold}aa
  );
  padding: 3px;

  /* 基礎陰影 */
  box-shadow: 0 4px 8px ${colors.accent.gold}15,
    0 2px 4px ${colors.accent.gold}10;

  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Hover 效果 (只保留陰影和內部動畫，transform 由父層控制) */
  &:hover {
    box-shadow: 0 12px 40px ${colors.accent.gold}30,
      0 8px 16px ${colors.accent.gold}20, 0 4px 8px ${colors.accent.gold}15;

    .card-front {
      opacity: 0;
      transform: scale(0.95);
    }

    .card-back {
      opacity: 1;
      transform: scale(1);
    }
  }
`

//! =============== 內層六角形 (深色內容層) ===============
const InnerHexagon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
`

//! =============== 共用樣式：圖標 ===============
const HexagonIconWrapper = styled.div`
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 4px 8px ${colors.accent.gold}50);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Iconify icon 大小與配色 */
  svg {
    width: clamp(2.5rem, 5vw, 3.5rem);
    height: clamp(2.5rem, 5vw, 3.5rem);
    color: ${colors.accent.gold};
  }
`

//! =============== 共用樣式：標題 ===============
const HexagonTitle = styled.h3`
  color: ${colors.accent.gold};
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 700;
  margin: 0.5rem 0;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-shadow: 0 2px 4px ${colors.accent.gold}30;
`

//! =============== 詳細描述 (僅背面顯示) ===============
const HexagonDescription = styled.p`
  color: ${colors.text.inverse};
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  line-height: 1.6;
  margin: 0.75rem 0 1rem;
  opacity: 0.95;
  max-width: 90%;
  font-weight: 400;
`

//! =============== 按鈕 (僅背面顯示) ===============
const HexagonButton = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.accent.gold},
    ${colors.accent.gold}cc
  );
  color: ${colors.background.primary};
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
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
 * @param {string} props.icon - Iconify icon 名稱
 * @param {string} props.title - 卡片標題
 * @param {string} props.description - 卡片詳細描述
 * @param {string} props.link - 路由連結
 * @param {string} [props.buttonText='查看更多'] - 按鈕文字
 */
const HexagonCard = ({
  icon,
  title,
  description,
  link,
  buttonText = '查看更多'
}) => {
  return (
    <OuterHexagon to={link}>
      <InnerHexagon className='inner-hexagon'>
        <HexagonBackground />

        {/* 正面：圖標 + 標題 */}
        <CardFront className='card-front'>
          <HexagonIconWrapper className='hexagon-icon'>
            <Icon icon={icon} />
          </HexagonIconWrapper>
          <HexagonTitle>{title}</HexagonTitle>
        </CardFront>

        {/* 背面：標題和描述 */}
        <CardBack className='card-back'>
          <HexagonTitle style={{ fontSize: '0.95rem' }}>{title}</HexagonTitle>
          <HexagonDescription>{description}</HexagonDescription>
        </CardBack>
      </InnerHexagon>
    </OuterHexagon>
  )
}

export default HexagonCard
