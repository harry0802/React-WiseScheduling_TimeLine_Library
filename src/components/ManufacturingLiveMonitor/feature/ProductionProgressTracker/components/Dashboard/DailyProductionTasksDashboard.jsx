import PropTypes from 'prop-types'
import ProductionTable from '../../../../components/Carousel/CarouselTable/CarouselTable'
import {
  createColorCondition,
  createDateCondition
} from '../../../../components/Carousel/CarouselTable/utils'
import { STATUS_COLORS } from '../../../../configs/Color'

//! =============== 1. 設定與常量 ===============
//* 表格狀態配置
const TABLE_STATUS_CONFIG = {
  warning: {
    condition: createDateCondition('orderDate', 20, 'before'),
    color: STATUS_COLORS.WARNING,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  // 整條row 套用
  expired: {
    condition: createDateCondition('orderDate', 0, 'after'),
    color: STATUS_COLORS.EXPIRED,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
}

//* 表格欄位對應
const FIELD_MAPPING = {
  orderDate: 1, // 訂單日期
  orderNumber: 2, // 訂單編號
  manufacturingOrderNumber: 3, // 製造單號
  productName: 4, // 產品名稱
  manufacturingQuantity: 5, // 製造數量
  primaryShot: 6, // 主射出
  secondaryShot: 7, // 次射出
  inspection: 8, // 檢驗狀態
  shipment: 9 // 出貨狀態
}

//* 表格標題定義
const TABLE_HEADER = [
  'NO.',
  '訂單日期',
  '訂單編號',
  '製造單號',
  '產品名稱',
  '製造數量',
  '主射出',
  '次射出',
  '檢驗狀態',
  '出貨狀態'
]

//* 欄位寬度設定
const COLUMN_WIDTHS = [80]

//* 欄位對齊方式設定
const COLUMN_ALIGNS = [
  'center', // NO.
  'center', // 訂單編號
  'center', // 製造單號
  'left', // 產品名稱
  'right', // 製造數量
  'center', // 主射出
  'center', // 次射出
  'center', // 檢驗狀態
  'center' // 出貨狀態
]

/**
 * @function DailyProductionTasksDashboard
 * @description 每日生產任務儀表板組件
 * @param {Object} props - 組件屬性
 * @param {Array} props.data - 生產任務資料
 * @returns {JSX.Element} 每日生產任務儀表板渲染結果
 */
function DailyProductionTasksDashboard({ data }) {
  if (!data || data.length === 0) {
    return <div className='empty-data'>暫無資料</div>
  }

  return (
    <ProductionTable
      width='100%'
      height='650px'
      initialData={data}
      header={TABLE_HEADER}
      fieldMapping={FIELD_MAPPING}
      columnWidths={COLUMN_WIDTHS}
      columnAligns={COLUMN_ALIGNS}
      statusRules={TABLE_STATUS_CONFIG}
      rowNum={14}
    />
  )
}

// 組件屬性類型定義
DailyProductionTasksDashboard.propTypes = {
  data: PropTypes.array
}

// 默認屬性
DailyProductionTasksDashboard.defaultProps = {
  data: []
}

export default DailyProductionTasksDashboard

