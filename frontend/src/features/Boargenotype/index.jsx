import InventorySystem from "../../components/system/InventorySystem";
import { boarGenotypeConfig } from "./config/boargenotype";

function BoaragenTypeIndex() {
  return (
    <InventorySystem config={boarGenotypeConfig}>
      <InventorySystem.Table />
      <InventorySystem.Drawer />
    </InventorySystem>
  );
}

export default BoaragenTypeIndex;
