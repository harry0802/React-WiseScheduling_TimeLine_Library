import { createContext, useState, useContext } from "react";
import {
  generateMockInventories,
  generateMockInventory,
} from "../mockDataGenerators";
import { useEffectOnce } from "react-use";

// 定義 Context
const PigHouseInventoryContext = createContext();

// 定義 Provider 元件
export const PigHouseInventoryProvider = ({ children }) => {
  const [inventories, setInventories] = useState([]);

  useEffectOnce(() => {
    // 生成初始測試數據
    const initialData = generateMockInventories(5);
    setInventories(initialData);
  });

  const handleAddInventory = () => {
    const newInventory = generateMockInventory(inventories.length);
    setInventories([...inventories, newInventory]);
  };

  return (
    <PigHouseInventoryContext.Provider
      value={{ inventories, handleAddInventory }}
    >
      {children}
    </PigHouseInventoryContext.Provider>
  );
};

// 創建自訂 Hook
export const usePigHouseInventory = () => {
  const context = useContext(PigHouseInventoryContext);
  if (context === undefined) {
    throw new Error(
      "usePigHouseInventory must be used within a PigHouseInventoryProvider"
    );
  }
  return context;
};
