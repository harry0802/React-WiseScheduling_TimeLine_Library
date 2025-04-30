import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProductionZoneA from './feature/ProductionZoneA'
import ProductionZoneB from './feature/ProductionZoneB'
import ProductionZoneC from './feature/ProductionZoneC'
import ProductionZoneD from './feature/ProductionZoneD'

// 定義要切換的頁面組件
const zones = [
  { component: ProductionZoneA, name: 'A區生產線' },
  { component: ProductionZoneB, name: 'B區生產線' },
  { component: ProductionZoneC, name: 'C區生產線' },
  { component: ProductionZoneD, name: 'D區生產線' }
]

// 讀秒進度條樣式
const ProgressBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
`

const ProgressBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.progress}%;
  transition: width 1s linear;
`

/**
 * @function FactoryPerformanceDashboard
 * @description 工廠生產狀況儀表板，顯示各生產區域狀態
 * @returns {JSX.Element} 工廠生產狀況儀表板
 */
function FactoryPerformanceDashboard() {
  // 切換相關狀態
  const [currentZone, setCurrentZone] = useState(0)
  const switchInterval = 10000 // 10 秒切換一次

  // 讀秒進度
  const [progress, setProgress] = useState(100)

  // 進度條讀秒與自動切換頁面
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const step = 100 / (switchInterval / 1000)
        const newProgress = prevProgress - step
        console.log('🚀 ~ setProgress ~ newProgress:', newProgress)

        // 如果進度條到零，切換區域並重置進度條
        if (newProgress < 0) {
          // 切換到下一個區域
          setCurrentZone((prev) => (prev + 1) % zones.length)
          return 100
        }

        return newProgress
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [switchInterval, zones.length]) // 只在 switchInterval 或 zones.length 變化時重新設置

  // 當前要顯示的組件
  const CurrentZone = zones[currentZone].component

  return (
    <>
      <CurrentZone />

      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
    </>
  )
}

export default FactoryPerformanceDashboard

