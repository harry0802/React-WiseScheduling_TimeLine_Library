/**
 * 根據給定的配置生成表格列。
 * 這個函數可以根據標題長度設定列的寬度，並處理子列，避免無限嵌套。
 *
 * @param {Array} config - 用於生成表格列的配置。
 * @param {Object} options - 自定義選項。
 * @param {number} options.setWidthForChars - 標題長度為此值時，設定列的寬度。
 * @param {number} options.defaultWidth - 標題長度為指定值時，列的標準寬度。
 * @returns {Array} 生成的表格列數組。
 */

export const generateColumns = (config, options = {}) => {
  const { setWidthForChars = 4, defaultWidth = 80 } = options;
  const seen = new WeakMap(); // 使用 WeakMap 來避免無限嵌套

  // 這個函數用於處理列的寬度和子列。
  const processColumn = (columnConfig) => {
    if (seen.has(columnConfig)) return; // 如果已經處理過這個配置，則直接返回
    seen.set(columnConfig, true); // 標記這個配置已經處理過

    const column = {
      title: columnConfig.title,
      dataIndex: columnConfig.dataIndex,
      key: columnConfig.key || columnConfig.dataIndex,
    };

    if (columnConfig.fixed) {
      column.fixed = columnConfig.fixed;
    }

    if (columnConfig.width) {
      column.width = columnConfig.width;
    } else if (
      columnConfig.title &&
      columnConfig.title.length >= setWidthForChars
    ) {
      column.width = defaultWidth; // 根據標題長度設定寬度
    }

    if (columnConfig.children) {
      column.children = columnConfig.children.map(processColumn); // 處理子列
    }

    return column;
  };

  // 首先，對配置進行列的生成，然後對生成的列進行寬度的設定
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
};

// 生成的列數組
// const generatedColumns = generateColumns(exampleConfig, exampleOptions);
// console.log(generatedColumns);
