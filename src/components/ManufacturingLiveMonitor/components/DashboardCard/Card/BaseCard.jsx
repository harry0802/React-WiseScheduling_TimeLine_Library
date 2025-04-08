import React, { createContext, useContext, useState } from 'react'
import styled from 'styled-components'
import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material'

//! =============== 1. 設定與常量 ===============
const CARD_VARIANTS = {
  default: {
    backgroundColor: 'rgba(3, 31, 80, 0.7)',
    borderColor: 'rgba(65, 90, 139, 0.5)'
  },
  active: {
    backgroundColor: 'rgba(4, 41, 100, 0.7)',
    borderColor: 'rgba(0, 112, 243, 0.7)'
  },
  warning: {
    backgroundColor: 'rgba(60, 41, 0, 0.7)',
    borderColor: 'rgba(245, 158, 11, 0.7)'
  },
  error: {
    backgroundColor: 'rgba(80, 17, 0, 0.7)',
    borderColor: 'rgba(220, 38, 38, 0.7)'
  }
}

//! =============== 2. Context 定義 ===============
const CardContext = createContext(undefined)

function useCardContext() {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCardContext must be used within a Card component')
  }
  return context
}

//! =============== 3. 樣式組件 ===============
//* 基礎卡片
const StyledCard = styled(MuiCard)`
  && {
    /* 布局定位 */
    display: flex;
    flex-direction: column;

    /* 盒模型 */
    /* 暫時註解 */
    /* border-radius: 8px; */
    /* border: 1px solid
      ${(props) =>
      CARD_VARIANTS[props.variant]?.borderColor ||
      CARD_VARIANTS.default.borderColor}; */

    /* 視覺樣式 */
    background-color: ${(props) =>
      CARD_VARIANTS[props.variant]?.backgroundColor ||
      CARD_VARIANTS.default.backgroundColor};
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    /* CSS3特效 */
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
  }
`

//* 卡片標題
const StyledCardHeader = styled.div`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  padding: 0.5rem 1.25rem 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  /* 視覺樣式 */
  font-weight: 600;
  font-size: 16px;
`

//* 卡片內容
const StyledCardContent = styled(MuiCardContent)`
  && {
    /* 布局定位 */
    flex: 1;
    /* 盒模型 */
    padding: 8px !important;

    /* 視覺樣式 */
    color: rgba(255, 255, 255, 0.85);
  }
`

//* 卡片底部
const StyledCardFooter = styled.div`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  padding: 12px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  /* 視覺樣式 */
  font-size: 14px;
`

//! =============== 4. 卡片組件 ===============
/**
 * @function Card
 * @description 儀表板卡片基礎容器，使用 Compound Component 模式
 */
const Card = React.forwardRef(
  (
    {
      className = '',
      variant = 'default',
      children,
      collapsible = false,
      defaultExpanded = true,
      ...props
    },
    ref
  ) => {
    // 如果卡片是可折疊的，設置展開狀態
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)
    // 切換展開狀態
    const toggleExpand = () => setIsExpanded((prev) => !prev)

    return (
      <CardContext.Provider
        value={{
          variant,
          isExpanded,
          toggleExpand,
          collapsible
        }}
      >
        <StyledCard
          className={className}
          variant={variant}
          ref={ref}
          {...props}
        >
          {children}
        </StyledCard>
      </CardContext.Provider>
    )
  }
)
Card.displayName = 'Card'

// 卡片標題區域
const CardHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { collapsible, isExpanded, toggleExpand } = useCardContext()

    return (
      <StyledCardHeader
        className={className}
        ref={ref}
        {...props}
      >
        <div style={{ width: '100%' }}>{children}</div>
        {collapsible && (
          <button
            onClick={toggleExpand}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        )}
      </StyledCardHeader>
    )
  }
)
CardHeader.displayName = 'CardHeader'

// 卡片標題文本
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    className={className}
    ref={ref}
    style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

// 卡片描述文本
const CardDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p
      className={className}
      ref={ref}
      style={{
        margin: '5px 0 0',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.6)'
      }}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

// 卡片內容區域
const CardContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { collapsible, isExpanded } = useCardContext()

    // 如果是可折疊的並且沒有展開，則隱藏內容
    if (collapsible && !isExpanded) {
      return null
    }

    return (
      <StyledCardContent
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </StyledCardContent>
    )
  }
)
CardContent.displayName = 'CardContent'

// 卡片底部區域
const CardFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { collapsible, isExpanded } = useCardContext()

    // 如果是可折疊的並且沒有展開，則隱藏底部
    if (collapsible && !isExpanded) {
      return null
    }

    return (
      <StyledCardFooter
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </StyledCardFooter>
    )
  }
)
CardFooter.displayName = 'CardFooter'

// 將所有子組件附加到 Card 上，形成 Compound Component
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export { Card }

