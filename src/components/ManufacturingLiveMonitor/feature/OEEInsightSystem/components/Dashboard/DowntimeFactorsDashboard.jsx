import { Charts } from '@iimm/data-view-react'

const shutdownFactorsOption = {
  // 基本配置
  color: ['#ff3d43'],

  // 網格配置
  grid: {
    // left: '15%',
    right: '5%',
    top: 0,
    bottom: '10%'
  },

  // X軸配置 - 水平柱狀圖中表示數值
  xAxis: {
    name: '',
    data: 'value',
    min: 0,
    max: 24,
    interval: 3,
    axisLine: {
      show: true,
      style: {
        stroke: '#617485',
        lineWidth: 1
      }
    },
    splitLine: {
      show: true,
      style: {
        stroke: '#617485',
        lineWidth: 0.5
      }
    },
    axisLabel: {
      style: {
        fill: '#ffffff',
        fontSize: 16
      },
      formatter: '{value}時'
    }
  },

  // Y軸配置 - 水平柱狀圖中表示類別
  yAxis: {
    name: '',
    data: [
      '人員不足',
      '等待物料',
      '塑料未乾',
      '模具維修',
      '機台故障',
      '機台保養',
      '換模換線',
      '異常停機'
    ],
    axisLine: {
      style: {
        stroke: '#6B6565',
        lineWidth: 1
      }
    },
    axisLabel: {
      style: {
        fill: '#ffffff',
        fontSize: 18
      }
    },
    splitLine: {
      show: false
    }
  },

  // 系列數據配置
  series: [
    {
      type: 'bar',
      name: '時間',
      barWidth: 18,
      data: [
        0.5, // 人員不足
        4.5, // 等待物料
        8.5, // 塑料未乾
        10.0, // 模具維修
        11.0, // 機台故障
        12.5, // 機台保養
        18.5, // 換模換線
        24.0 // 異常停機
      ],
      label: {
        show: false
      },
      gradient: {
        color: ['#FF8A80', '#B71C1C']
      },

      animationCurve: 'easeOutCubic',
      animationFrame: 50
    }
  ]
}

function DowntimeFactorsDashboard() {
  return <Charts option={shutdownFactorsOption} />
}

export default DowntimeFactorsDashboard

