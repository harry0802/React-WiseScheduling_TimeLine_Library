import { pigHouseInventoryConfig } from "./config/pigHouseInventoryConfig";
import InventorySystem from "../../components/system/InventorySystem";

const PigHouseInventoryPage = () => (
  <InventorySystem config={pigHouseInventoryConfig}>
    <InventorySystem.Table />
    <InventorySystem.Drawer />
  </InventorySystem>
);

export default PigHouseInventoryPage;
