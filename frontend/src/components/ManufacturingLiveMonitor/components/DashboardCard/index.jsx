/**
 * @module DashboardCard
 * @description 儀表板卡片元件集合
 * 使用複合元件模式，允許 Card.Header、Card.Title 等方式調用子元件
 */

import CardComponent from './Card'
import { Card as BaseCardComponent } from './Card/BaseCard'

// 主要元件直接導出
export const Card = CardComponent

// 從 BaseCard.jsx 中導出的實際上是 Card 元件，我們將其重命名為 BaseCard 導出
export const BaseCard = BaseCardComponent

/**
 * @example
 * // 推薦使用方式 - 複合元件模式
 * import { Card, BaseCard } from "@/components/DashboardCard";
 *
 * // 使用標準卡片
 * <Card>
 *   <Card.Header>
 *     <Card.Title>標題</Card.Title>
 *   </Card.Header>
 *   <Card.Content>內容</Card.Content>
 * </Card>
 *
 * // 或使用基礎卡片
 * <BaseCard variant="active">
 *   <BaseCard.Header>
 *     <BaseCard.Title>標題</BaseCard.Title>
 *   </BaseCard.Header>
 *   <BaseCard.Content>內容</BaseCard.Content>
 * </BaseCard>
 */

// 向下兼容的默認導出
export default {
  Card,
  BaseCard
}

