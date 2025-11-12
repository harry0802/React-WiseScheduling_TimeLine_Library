// Design Token - Borders
// 邊框樣式系統

export const borders = {
  // 邊框寬度
  width: {
    thin: '1px',
    regular: '2px',
    medium: '4px',
    thick: '6px',
  },

  // 邊框圓角
  radius: {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    round: '50%',
  },

  // 預定義邊框樣式
  style: {
    // 金色外框 - 用於主要容器
    outerGold: '4px solid #d4af37',
    outerGoldThick: '6px solid #d4af37',

    // 淡灰色內框 - 用於內部卡片
    innerLight: '2px solid #d4d4d4',
    innerMedium: '2px solid #b0b0b0',

    // 左側強調邊框
    leftGold: '4px solid #d4af37',
    leftGoldThick: '6px solid #d4af37',
  }
};

export default borders;
