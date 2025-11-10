import React, { useMemo, useId } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

//! =============== 1. 設定與常量 ===============
//* 預設值和常量，方便統一管理
const DEFAULT_VALUES = {
  IN_STOCK_COLOR: '#00BCCA',
  OUT_STOCK_COLOR: '#9FA5AC',
  BACKGROUND_COLOR: 'transparent',
  CHART_MARGIN: { top: 20, right: 0, left: 0, bottom: 0 },
  BAR_SIZE: 45,
  FONT_SIZE: 18,
  TICK_SIZE: 16
}

/**
 * @function formatPercentage
 * @description 格式化百分比為三位整數和一位小數 (例如: 080.0%)
 * @param {number} value - 要格式化的百分比值
 * @returns {string} - 格式化後的百分比字符串
 */
const formatPercentage = (value) => {
  const integerPart = Math.floor(value).toString().padStart(3, '0')
  const decimalPart = ((value % 1) * 10).toFixed(0)
  return `${integerPart}.${decimalPart}%`
}

/**
 * @function StockLabel
 * @description 建立進度條標籤組件
 * @param {Object} props - 組件屬性
 * @param {string} props.text - 標籤文本前綴
 * @param {number} props.percentage - 百分比值
 * @returns {Function} - 返回一個可被 recharts 使用的標籤渲染函數
 */
const StockLabel = (text, percentage) => {
  const LabelComponent = (props) => {
    const { x, y, width, height } = props
    return (
      <text
        x={x + width / 2}
        y={y + height / 2 + 5}
        fill='#FFFFFF'
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={DEFAULT_VALUES.FONT_SIZE}
      >
        {`${text} ${formatPercentage(percentage)}`}
      </text>
    )
  }

  // 添加 displayName 解決 ESLint 錯誤
  LabelComponent.displayName = `StockLabel${text}`

  return LabelComponent
}

// 🧠 為入庫部分創建漸變色
// 🧠 為入庫部分創建顏色漸變

// 調整十六進制顏色的亮度
const adjustColor = (hex, amount) => {
  // 解析十六進制顏色
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  // 調整亮度
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))

  // 轉換回十六進制
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
/**
 * @function ProgressBarChart
 * @description 可控進度條圖表組件，顯示入庫和未入庫的百分比
 * @param {Object} props - 組件屬性
 * @param {number} props.inStockPercentage - 入庫百分比 (0-100)
 * @param {string} props.backgroundColor - 背景顏色
 * @param {string} props.inStockColor - 入庫部分的顏色 (單色時使用)
 * @param {Object} props.inStockGradient - 入庫部分的漸變色配置 (優先於inStockColor)
 * @param {string} props.inStockGradient.startColor - 漸變起始顏色
 * @param {string} props.inStockGradient.endColor - 漸變結束顏色
 * @param {string} props.outStockColor - 未入庫部分的顏色
 * @returns {JSX.Element} - 渲染的進度條圖表
 */
const ProgressBarChart = ({
  inStockPercentage = 0,
  backgroundColor = DEFAULT_VALUES.BACKGROUND_COLOR,
  inStockGradient = null,
  outStockColor = DEFAULT_VALUES.OUT_STOCK_COLOR,
  chartId // 新增可選的 chartId 參數
}) => {
  // 生成唯一ID，避免多個圖表漸變色互相衝突
  const uniqueId = useId()
  // 🧠 使用 useMemo 避免不必要的重新計算
  const chartData = useMemo(() => {
    // ✨ 驗證百分比範圍
    const validPercentage = Math.max(0, Math.min(100, inStockPercentage))
    const outStockPercentage = 100 - validPercentage

    return {
      validPercentage,
      outStockPercentage,
      data: [
        {
          name: '',
          入庫: validPercentage,
          未入庫: outStockPercentage
        }
      ]
    }
  }, [inStockPercentage])

  const { validPercentage, outStockPercentage, data } = chartData

  // ✨ 使用 StockLabel 工廠函數建立標籤
  const InStockLabel = useMemo(
    () => StockLabel('入庫', validPercentage),
    [validPercentage]
  )

  const OutStockLabel = useMemo(
    () => StockLabel('未入庫', outStockPercentage),
    [outStockPercentage]
  )

  // 漸變色ID - 使用傳入的 chartId 或自動生成的 uniqueId 確保唯一性
  const gradientId = `inStockGradient-${chartId || uniqueId.replace(/:/g, '')}`

  // 是否使用自定義漸變色

  return (
    <div
      className='w-full'
      style={{
        height: '100%',
        backgroundColor
      }}
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <BarChart
          layout='vertical'
          data={data}
          margin={DEFAULT_VALUES.CHART_MARGIN}
          barSize={DEFAULT_VALUES.BAR_SIZE}
          barGap={0}
          barCategoryGap={0}
        >
          <defs>
            (
            <linearGradient
              id={gradientId}
              x1='0'
              y1='0'
              x2='1'
              y2='0'
            >
              <stop
                offset='0%'
                stopColor={inStockGradient.startColor}
              />
              <stop
                offset='100%'
                stopColor={inStockGradient.endColor}
              />
            </linearGradient>
            )
          </defs>
          <XAxis
            type='number'
            domain={[0, 100]}
            tickCount={11}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            stroke='#FFFFFF'
            strokeWidth={1}
            axisLine={{ stroke: '#FFFFFF' }}
            tickSize={0}
            tickMargin={10}
            tick={{ fontSize: DEFAULT_VALUES.TICK_SIZE, fill: '#FFFFFF' }}
            tickFormatter={(value) => (value === 0 ? '00' : value)}
          />
          <YAxis
            dataKey='name'
            type='category'
            hide={true}
          />
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke='#FFFFFF'
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <Bar
            dataKey='入庫'
            stackId='a'
            fill={`url(#${gradientId})`}
            label={<InStockLabel />}
          />
          <Bar
            dataKey='未入庫'
            stackId='a'
            fill={outStockColor}
            label={<OutStockLabel />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressBarChart

