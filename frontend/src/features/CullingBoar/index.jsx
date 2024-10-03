import InventorySystem from "../../components/system/InventorySystem";
import { cullingBoarConfig } from "./config/culingBoarTable";

function CullingBoarIndex() {
  return (
    <InventorySystem config={cullingBoarConfig}>
      <InventorySystem.Table />
      <InventorySystem.Drawer />
    </InventorySystem>
  );
}

export default CullingBoarIndex;
