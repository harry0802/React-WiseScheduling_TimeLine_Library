/**
 * 計算表格中所有列的總寬度，處理包含子列的情況
 * @param {Array} cols - 表格的列配置陣列
 * @returns {number} - 表格總寬度
 */
export function calculateTotalWidth(cols) {
  return cols.reduce((total, col) => {
    // 如果列具有指定的寬度（數字類型），直接將該寬度加到總寬度
    if (typeof col.width === "number") {
      return total + col.width;
    }
    // 如果列有子列（children），遞迴計算子列的總寬度
    if (col.children) {
      return total + calculateTotalWidth(col.children);
    }
    // 如果列沒有指定寬度或子列，使用默認寬度 100
    return total + 100;
  }, 0);
}
