import React from 'react'
import { DigitalFlop } from '@iimm/data-view-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

//! =============== 1. Styled Components ===============
//* 使用 styled-components 建立樣式組件

// 儀表板容器
const DashboardContainer = styled.div`
  /* background-color: #1d2b53; */
  padding-left: 2rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

// 統計項容器
const StatContainer = styled.div`
  /* 盒模型 */
  /* margin-bottom: ${(props) => (props.$isLast ? '0' : '1.5rem')}; */
`

// 統計項標籤
const StatLabel = styled.div`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

// 翻牌器容器
const FlopContainer = styled.div`
  width: 100%;
  height: 60px;
`

//! =============== 2. 工具函數 ===============

/**
 * @function formatThousands
 * @description 千分位格式化函數
 * @param {number} number - 要格式化的數字
 * @returns {string|number} - 格式化後的數字
 */
const formatThousands = (number) => {
  if (number < 1000) return number

  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) {
    segs.push(numbers.splice(0, 3).join(''))
  }

  return segs.join(',').split('').reverse().join('')
}

/**
 * @function convertMinutesToHoursAndMinutes
 * @description 將分鐘轉換為小時和分鐘
 * @param {number} totalMinutes - 總分鐘數
 * @returns {Object} - 包含小時和分鐘的對象
 */
const convertMinutesToHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

/**
 * @function MachineOperationSummaryDisplay
 * @description 使用DataV的DigitalFlop組件和styled-components實現的營運統計儀表板
 * @param {Object} props - 組件屬性
 * @param {Object} props.data - 數據對象
 * @param {number} props.data.operationTimeMinutes - 稼動時間(分鐘)
 * @param {number} props.data.operationRate - 稼動率
 * @param {number} props.data.machineCount - 機台數
 * @param {number} props.data.stopCount - 停機次數
 * @param {boolean} props.showFormatted - 是否顯示千分位格式
 */
const MachineOperationSummaryDisplay = ({
  data = {
    operationTimeMinutes: 0,
    operationRate: 0,
    machineCount: 0,
    stopCount: 0
  },
  showFormatted = false
}) => {
  // 💡 轉換分鐘為小時和分鐘
  const { hours, minutes } = convertMinutesToHoursAndMinutes(
    data.operationTimeMinutes
  )

  // 時間顯示配置
  const timeConfig = {
    number: [hours, minutes],
    content: '{nt}時{nt}分',
    style: {
      fontSize: 45,
      fill: '#fff'
    }
  }

  // 稼動率配置
  const rateConfig = {
    number: [data.operationRate],
    content: '{nt}%',
    toFixed: 1,
    style: {
      fontSize: 45,
      fill: '#fff'
    }
  }

  // 機台數配置
  const machineConfig = {
    number: [data.machineCount],
    content: '{nt}台',
    style: {
      fontSize: 45,
      fill: '#fff'
    },
    ...(showFormatted && { formatter: formatThousands })
  }

  // 停機次數配置
  const stopConfig = {
    number: [data.stopCount],
    content: '{nt}筆',
    style: {
      fontSize: 45,
      fill: '#fff'
    },
    ...(showFormatted && { formatter: formatThousands })
  }

  return (
    <DashboardContainer>
      {/* 稼動時間 */}
      <StatContainer style={{ marginTop: '10px' }}>
        <StatLabel>稼動時間 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={timeConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 稼動率 */}
      <StatContainer>
        <StatLabel>稼動率 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={rateConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 生產機台數 */}
      <StatContainer>
        <StatLabel>生產機台數 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={machineConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 停機次數 */}
      <StatContainer $isLast>
        <StatLabel>停機次數 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={stopConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </FlopContainer>
      </StatContainer>
    </DashboardContainer>
  )
}

export default MachineOperationSummaryDisplay

// 使用範例:
/*
import React, { useState, useEffect } from 'react';
import MachineOperationSummaryDisplay from './MachineOperationSummaryDisplay';

const App = () => {
  const [statsData, setStatsData] = useState({
    operationTimeMinutes: 5256, // 87小時36分鐘
    operationRate: 36.4,
    machineCount: 7,
    stopCount: 6
  });
  
  // 模擬數據更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStatsData({
        operationTimeMinutes: 4800 + Math.floor(Math.random() * 1200),
        operationRate: 30 + Math.random() * 20,
        machineCount: Math.floor(5 + Math.random() * 5),
        stopCount: Math.floor(Math.random() * 10)
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <MachineOperationSummaryDisplay
        data={statsData}
        showFormatted={true}
      />
    </div>
  );
};

export default App;
*/

