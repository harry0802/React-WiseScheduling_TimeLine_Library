import { Charts } from '@iimm/data-view-react'

// 顏色常量定義
const COLORS = {
  primary: '#fff',
  secondary: '#008DCE',
  barColor: '#04B30A'
}

// 月份數據
const MONTHS = [
  '一月份',
  '二月份',
  '三月份',
  '四月份',
  '五月份',
  '六月份',
  '七月份',
  '八月份',
  '九月份',
  '十月份',
  '十一月份',
  '十二月份'
]

// 圖表數據
const CHART_DATA = {
  percentages: [175, 125, 90, 130, 45, 65, 65, 47, 50, 52, 45, 37],
  pieces: [23, 18, 16, 14, 10, 8, 6, 6, 6, 6, 6, 5]
}

/**
 * 創建通用的軸標籤樣式
 * @param {string} formatter 格式化字串
 * @returns {Object} 軸標籤配置
 */
const createAxisLabelStyle = (formatter) => ({
  formatter,
  style: {
    fill: COLORS.primary,
    fontSize: 16
  }
})

/**
 * 創建通用的軸名稱文本樣式
 * @returns {Object} 軸名稱樣式配置
 */
const createNameTextStyle = () => ({
  fill: COLORS.primary,
  fontSize: 18
})

/**
 * 創建Y軸通用配置
 * @param {Object} config - Y軸配置項
 * @returns {Object} Y軸配置對象
 */
const createYAxis = ({
  name,
  min = 0,
  max,
  interval,
  position = null,
  showSplitLine = true,
  formatter
}) => {
  const axis = {
    name,
    data: 'value',
    min,
    max,
    interval,
    nameGap: 25,
    axisTick: { show: false },
    axisLabel: createAxisLabelStyle(formatter),
    nameTextStyle: createNameTextStyle()
  }

  if (position) {
    axis.position = position
  }

  axis.splitLine = {
    show: showSplitLine,
    ...(showSplitLine && {
      style: { lineDash: [3, 3] }
    })
  }

  return axis
}

/**
 * 創建圖表配置
 * @returns {Object} 圖表配置對象
 */
const createChartOption = () => ({
  // 圖例配置 - 設置為不顯示
  legend: {
    show: false
  },

  // 網格配置 - 確保底部有足夠空間顯示X軸標籤
  grid: {
    top: 50, // 頂部留出空間給Y軸標題
    bottom: 60, // 底部需要空間給X軸標籤
    left: 80, // 左側留出足夠空間給Y軸標籤
    right: 80, // 右側留出足夠空間給第二個Y軸
    containLabel: true // 確保標籤包含在圖表區域內
  },

  // X軸配置 - 確保底部標籤正確顯示
  xAxis: {
    data: MONTHS,
    axisLabel: {
      show: true, // 確保顯示X軸標籤
      style: {
        // rotate: 20,
        textAlign: 'center',
        textBaseline: 'top',
        fill: COLORS.primary,
        fontSize: 14 // 適當大小的文字
      }
    },
    axisTick: { show: false }
  },

  // Y軸配置 (雙Y軸)
  yAxis: [
    // 左側Y軸 - 百分比
    createYAxis({
      name: 'Percent (%)',
      max: 300,
      interval: 50,
      formatter: '{value} %'
    }),

    // 右側Y軸 - 數量
    createYAxis({
      name: 'PIECES (pcs)',
      max: 30,
      interval: 5,
      position: 'right',
      showSplitLine: false,
      formatter: '{value} pcs'
    })
  ],

  // 數據系列
  series: [
    // 柱狀圖 - 百分比
    {
      name: 'Percent (%)',
      data: CHART_DATA.percentages,
      type: 'bar',
      barWidth: '30%', // 調整柱寬比例
      gradient: { color: [COLORS.barColor] },
      animationCurve: 'easeOutBounce'
    },

    // 折線圖 - 數量
    {
      name: 'PIECES (pcs)',
      data: CHART_DATA.pieces,
      type: 'line',
      yAxisIndex: 1,
      animationCurve: 'easeOutBounce',
      smooth: true,
      linePoint: {
        radius: 5,
        style: { fill: COLORS.secondary }
      },
      lineStyle: {
        lineWidth: 5,
        stroke: COLORS.secondary
      },
      lineArea: {
        show: true,
        style: { fill: COLORS.secondary }
      }
    }
  ]
})

/**
 * 今日出貨面板儀表板組件
 * @returns {JSX.Element} 渲染的圖表組件
 */
function TodayShippingPanelDashboard() {
  const chartOption = createChartOption()

  return (
    <Charts
      option={chartOption}
      style={{
        width: '100%', // 寬度填滿容器
        height: '280px' // 確保有足夠高度顯示底部標籤
      }}
    />
  )
}

export default TodayShippingPanelDashboard

