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
    condition: createDateCondition('deliveryDate', 7, 'before'),
    color: STATUS_COLORS.WARNING,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  // 整條row 套用
  expired: {
    condition: createDateCondition('deliveryDate', 0, 'after'),
    color: STATUS_COLORS.EXPIRED,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
}

//* 表格欄位對應
const FIELD_MAPPING = {
  assemblyPackage: 1, // 訂單日期
  warehouseCode: 2, // 訂單編號
  warehouseQuantity: 3, // 製造單號
  customerName: 4, // 產品名稱
  orderNumber: 5, // 製造數量
  productCode: 6, // 主射出
  productName: 7, // 次射出
  shippingQuantity: 8, // 檢驗狀態
  completedQuantity: 9, // 出貨狀態
  incompleteQuantity: 10, //'未交數量',
  deliveryDate: 11, //'貨品交期',
  isDelivered: 12 // '已交完否'
}

//* 表格標題定義
const TABLE_HEADER = [
  'NO.',
  '組立包裝',
  '庫存燈號',
  '庫存數量',
  '客戶名稱',
  '訂單單號',
  '產品編號',
  '產品名稱',
  '出貨數量',
  '已交數量',
  '未交數量',
  '貨品交期',
  '已交完否'
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
  'center', // 出貨狀態
  'center', // 未交數量
  'center', // 貨品交期
  'center' // 已交完否
]

/**
 * @function TodayShippingPanel
 * @description  當日待出貨即時戰情儀表板組件
 * @param {Object} props - 組件屬性
 * @param {Array} props.data - 生產任務資料
 * @returns {JSX.Element} 每日生產任務儀表板渲染結果
 */
function TodayShippingPanel({ data }) {
  if (!data || data.length === 0) {
    return <div className='empty-data'>暫無資料</div>
  }

  return (
    <ProductionTable
      width='100%'
      height='530px'
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

export default TodayShippingPanel

