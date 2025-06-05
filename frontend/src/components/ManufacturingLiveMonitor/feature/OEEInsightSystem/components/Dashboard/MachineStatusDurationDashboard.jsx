import { Charts, co } from '@iimm/data-view-react'

//! =============== 1. 設定與常量 ===============
//* 範例數據 - 各機台在不同狀態下的時數
const data = {
  machineNames: [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7',
    'A8',
    'A9',
    'A10',
    'A11'
  ],
  normalOperation: [7, 2, 7, 6, 4, 21, 6, 7, 19, 7, 9], // 正常運產
  networkAbnormal: [14, 2, 1, 6, 10, 0, 0, 11, 0, 11, 9], // 網路異常
  statusAbnormal: [1, 18, 2, 9, 0, 2, 1, 5, 4, 3, 2], // 狀態異常
  qualityAbnormal: [0, 3, 2, 3, 1, 0, 3, 0, 0, 1, 0], // 品質異常
  systemAbnormal: [0, 0, 11, 0, 7, 0, 13, 0, 0, 0, 1] // 系統異常
}

//* 狀態對應顏色
const STATUS_COLORS = {
  normalOperation: '#00c853', // 綠色
  networkAbnormal: '#29b6f6', // 藍色
  statusAbnormal: '#ffa726', // 橙色
  qualityAbnormal: '#ef5350', // 紅色
  systemAbnormal: '#9e9e9e' // 灰色
}

function MachineStatusDurationDashboard() {
  const options = {
    // 圖表標題
    title: {
      text: '當日機台各狀態時數統計',
      show: false,
      style: {
        fill: '#ffffff', // 白色標題
        fontSize: 16
      }
    },

    // 設置圖例
    legend: {
      orient: 'horizontal',
      right: 20,
      top: 20,
      data: ['正常運產', '網路異常', '狀態異常', '品質異常', '系統異常'],
      color: [
        STATUS_COLORS.normalOperation,
        STATUS_COLORS.networkAbnormal,
        STATUS_COLORS.statusAbnormal,
        STATUS_COLORS.qualityAbnormal,
        STATUS_COLORS.systemAbnormal
      ],
      textStyle: {
        fill: '#ffffff' // 圖例文字顏色
      },
      itemGap: 15 // 圖例項間距
      // show: false
    },

    // X軸配置
    xAxis: {
      data: data.machineNames,
      boundaryGap: true, // 邊界間隔

      axisLine: {
        style: {
          stroke: '#333333' // 修改：使用不透明顏色
        }
      },
      axisLabel: {
        style: {
          fill: '#ffffff',
          fontSize: 16
        }
      },
      axisTick: {
        show: false
      }
    },

    // Y軸配置
    yAxis: {
      name: '時',
      nameTextStyle: {
        fill: '#ffffff',
        fontSize: 20
      },
      data: 'value',
      min: 0,
      max: 24,
      interval: 2,
      axisLine: {
        style: {
          stroke: '#333333' // 修改：使用不透明顏色
        }
      },
      axisLabel: {
        style: {
          fill: '#ffffff',
          fontSize: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        style: {
          stroke: '#333333' // 修改：使用不透明顏色
        }
      }
    },

    // 系列設置
    series: [
      {
        name: '正常運產',
        type: 'bar',
        data: data.normalOperation,
        barWidth: 20,
        barGap: '10%',
        barStyle: {
          fill: STATUS_COLORS.normalOperation
        }
      },
      {
        name: '網路異常',
        type: 'bar',
        data: data.networkAbnormal,
        barWidth: 20,
        barGap: '10%',
        barStyle: {
          fill: STATUS_COLORS.networkAbnormal
        }
      },
      {
        name: '狀態異常',
        type: 'bar',
        data: data.statusAbnormal,
        barWidth: 20,
        barGap: '10%',
        barStyle: {
          fill: STATUS_COLORS.statusAbnormal
        }
      },
      {
        name: '品質異常',
        type: 'bar',
        data: data.qualityAbnormal,
        barWidth: 20,
        barGap: '10%',
        barStyle: {
          fill: STATUS_COLORS.qualityAbnormal
        }
      },
      {
        name: '系統異常',
        type: 'bar',
        data: data.systemAbnormal,
        barWidth: 20,
        barGap: '10%',
        barStyle: {
          fill: STATUS_COLORS.systemAbnormal
        }
      }
    ],

    // 背景設置
    backgroundColor: '#0c1426',

    // 網格設置
    grid: {
      top: 40,
      left: 40,
      right: 40,
      bottom: 40
    }
  }

  return (
    <Charts
      option={options}
      style={{ width: '100%', height: '400px' }}
    />
  )
}

export default MachineStatusDurationDashboard

