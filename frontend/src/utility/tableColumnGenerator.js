/**
 * 根據給定的配置生成表格列。
 * 這個函數可以根據標題長度設定列的寬度，並處理子列，避免無限嵌套。
 * 如果列的寬度未指定，則給予預設寬度。
 *
 * @param {Array} config - 用於生成表格列的配置。
 * @param {Object} options - 自定義選項。
 * @param {number} options.setWidthForChars - 標題長度為此值時，設定列的寬度。
 * @param {number} options.defaultWidth - 標題長度為指定值時，列的標準寬度。
 * @param {number} options.defaultColumnWidth - 如果列的寬度未指定，則給予的預設寬度。
 * @returns {Array} 生成的表格列數組。
 */

export const generateColumns = (config, options = {}) => {
  const {
    setWidthForChars = 4,
    defaultWidth = 80,
    defaultColumnWidth = 100,
  } = options;
  const seen = new WeakMap(); // 使用 WeakMap 來避免無限嵌套

  const processColumn = (columnConfig) => {
    if (seen.has(columnConfig)) return; // 如果已經處理過這個配置，則直接返回
    seen.set(columnConfig, true); // 標記這個配置已經處理過

    // 創建一個column對象，包含標題、數據索引、鍵、固定位置、寬度和子列。
    const column = {
      title: columnConfig.title, // 設置標題
      dataIndex: columnConfig.dataIndex, // 設置數據索引
      key: columnConfig.key || columnConfig.dataIndex, // 設置鍵，默認為數據索引
      sorter: columnConfig.sorter,
      ...(columnConfig.fixed ? { fixed: columnConfig.fixed } : {}), // 如果配置了固定位置，則添加固定位置屬性
      // 設置寬度
      width:
        columnConfig.width || // 如果已經指定了寬度，則使用指定的寬度
        (columnConfig.title.length >= setWidthForChars // 如果標題長度大於或等於設定的字符數
          ? defaultWidth // 則使用預設寬度
          : defaultColumnWidth), // 否則使用預設列寬度
      ...(columnConfig.children // 如果有子列
        ? { children: columnConfig.children.map(processColumn) } // 則將子列轉換為column對象
        : {}),
    };

    return column;
  };

  return config.map(processColumn);
};

// 簡單參數範例
const exampleConfig = [
  {
    title: "標題1",
    dataIndex: "dataIndex1",
    key: "key1",
  },
  {
    title: "標題2",
    dataIndex: "dataIndex2",
    key: "key2",
    children: [
      {
        title: "子標題1",
        dataIndex: "childDataIndex1",
        key: "childKey1",
      },
      {
        title: "子標題2",
        dataIndex: "childDataIndex2",
        key: "childKey2",
      },
    ],
  },
];

const exampleOptions = {
  setWidthForChars: 4,
  defaultWidth: 100,
  defaultColumnWidth: 120, // 預設寬度
};

// 生成的列數組
// const generatedColumns = generateColumns(exampleConfig, exampleOptions);
// console.log(generatedColumns);
