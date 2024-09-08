import { useState, useEffect } from "react";
import PigHouseInventoryTable from "./PigHouseInventoryTable";
import {
  generateMockInventories,
  generateMockInventory,
} from "./mockDataGenerators";

function PigHouseInventory() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    // 生成初始測試數據
    const initialData = generateMockInventories(5);
    setInventories(initialData);
  }, []);

  const handleAddInventory = () => {
    const newInventory = generateMockInventory(inventories.length);
    setInventories([...inventories, newInventory]);
  };

  return (
    <PigHouseInventoryTable
      data={inventories}
      onAddInventory={handleAddInventory}
    />
  );
}

export default PigHouseInventory;
