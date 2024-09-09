import PigHouseInventoryTable from "./PigHouseInventoryTable";
import { PigHouseInventoryProvider } from "./context/PostContext";

function PigHouseInventory() {
  return (
    <PigHouseInventoryProvider>
      <PigHouseInventoryTable />
    </PigHouseInventoryProvider>
  );
}

export default PigHouseInventory;
