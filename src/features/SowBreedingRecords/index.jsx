import InventorySystem from "../../components/system/InventorySystem";
import { breedingInventoryConfig } from "./config/recordConfig";
function SowBreedIndex() {
  return (
    <InventorySystem config={breedingInventoryConfig}>
      <InventorySystem.Table />
      <InventorySystem.Drawer />
    </InventorySystem>
  );
}

export default SowBreedIndex;
