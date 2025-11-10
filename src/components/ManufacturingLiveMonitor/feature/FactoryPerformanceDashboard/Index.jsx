// FactoryPerformanceDashboard/Index.jsx
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

//! =============== 1. 設定與常量 ===============
//* 集中管理配置參數，便於統一調整
const CONFIG = {
  switchInterval: 10000, // 切換間隔時間 (毫秒)
  progressUpdateInterval: 1000 // 進度條更新頻率 (毫秒)
}

//! =============== 2. 區域組件導入 ===============
import ProductionZoneA from './feature/ProductionZoneA'
import ProductionZoneB from './feature/ProductionZoneB'
import ProductionZoneC from './feature/ProductionZoneC'
import ProductionZoneD from './feature/ProductionZoneD'

//! =============== 3. 核心資料結構 ===============
//* 將頁面配置集中定義，便於維護和擴展
const PRODUCTION_ZONES = [
  { component: ProductionZoneA, name: 'A區生產線', key: 'zone-a' },
  { component: ProductionZoneB, name: 'B區生產線', key: 'zone-b' },
  { component: ProductionZoneC, name: 'C區生產線', key: 'zone-c' },
  { component: ProductionZoneD, name: 'D區生產線', key: 'zone-d' }
]

//! =============== 4. 樣式定義 ===============
//* 進度條容器樣式
const ProgressBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
`

//* 進度條填充樣式
const ProgressBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.progress}%;
  transition: width 1s linear;
`

/**
 * @function FactoryPerformanceDashboard
 * @description 工廠生產狀況儀表板，顯示各生產區域狀態並自動輪播
 * @returns {JSX.Element} 工廠生產狀況儀表板組件
 *
 * @example
 * <FactoryPerformanceDashboard />
 */
function FactoryPerformanceDashboard() {
  // 🧠 當前顯示的區域索引
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0)

  // 🧠 進度條完成百分比
  const [progress, setProgress] = useState(100)

  // 💡 區域切換處理函數 - 使用 useCallback 提高效能
  const switchToNextZone = useCallback(() => {
    setCurrentZoneIndex(
      (prevIndex) => (prevIndex + 1) % PRODUCTION_ZONES.length
    )
    setProgress(100) // 重置進度條
  }, [])

  // ✨ 簡化的進度條更新邏輯
  useEffect(() => {
    const progressStep =
      100 / (CONFIG.switchInterval / CONFIG.progressUpdateInterval)

    // 設置進度條更新計時器
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - progressStep

        // 當進度條達到 0 時切換區域
        if (newProgress < 0) {
          switchToNextZone()
          return 100
        }

        return newProgress
      })
    }, CONFIG.progressUpdateInterval)

    // 清除計時器避免記憶體洩漏
    return () => clearInterval(progressTimer)
  }, [switchToNextZone])

  // 獲取當前要顯示的組件
  const CurrentZone = PRODUCTION_ZONES[currentZoneIndex].component
  const zoneName = PRODUCTION_ZONES[currentZoneIndex].name

  return (
    <>
      {/* 區域切換時使用 key 確保組件完全重新渲染 */}
      <CurrentZone key={PRODUCTION_ZONES[currentZoneIndex].key} />

      {/* 進度條顯示剩餘時間 */}
      <ProgressBarContainer
        aria-label={`正在顯示${zoneName}，${Math.round(progress / 10)}秒後切換`}
      >
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
    </>
  )
}

export default FactoryPerformanceDashboard

