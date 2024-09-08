import { useState, useEffect } from "react";
import {
  generateMockInventories,
  generateMockInventory,
} from "./mockDataGenerators";

export function usePigHouseInventory() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    // 生成100筆模擬數據
    const mockData = generateMockInventories(100);
    setInventories(mockData);
  }, []);

  const addInventory = () => {
    // 模擬添加新庫存
    const inventoryWithId = generateMockInventory(inventories.length);
    setInventories((prevInventories) => [...prevInventories, inventoryWithId]);
  };

  return { inventories, addInventory };
}
