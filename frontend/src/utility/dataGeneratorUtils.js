// * 生成隨機數函數
export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// * 生成隨機日期
export const generateRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - generateRandomNumber(0, 365));
  return date.toISOString().split("T")[0];
};

// * flattenObject 函數用於將嵌套的對象結構扁平化為單層對象
// 這對於處理複雜的數據結構，特別是在生成表格數據時非常有用
export const flattenObject = (obj) => {
  const result = {};
  const stack = [{ obj, prefix: "" }];

  // 使用迭代而非遞迴來處理深層嵌套，避免堆棧溢出
  while (stack.length) {
    const { obj, prefix } = stack.pop();
    for (const [key, value] of Object.entries(obj)) {
      // 生成新的鍵名，如果有前綴則將key首字母大寫
      const newKey = prefix
        ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`
        : key;

      // 如果值是對象（非null且非數組），則將其加入堆棧以進行進一步處理
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        stack.push({ obj: value, prefix: newKey });
      } else {
        // 如果值不是對象，則直接添加到結果中
        result[newKey] = value;
      }
    }
  }

  return result;
};
