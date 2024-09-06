import { useState } from "react";
import BaseTable from "../../components/table/BaseTable";
import BaseDrawer from "../../components/Drawer/BaseDrawer";
// import AddIcon from "@mui/icons-material/Add";
import { Icon } from "@iconify/react";
const columns = Array.from({ length: 30 }, (_, index) => ({
  title: `Column ${index + 1}`,
  dataIndex: `column${index + 1}`,
  key: `column${index + 1}`,
  width: 150,
}));

const data = Array.from({ length: 1000 }, (_, index) => ({
  key: `${index + 1}`,
  ...Array.from({ length: 30 }, (_, columnIndex) => ({
    [`column${columnIndex + 1}`]: `Rich Data ${index + 1}-${columnIndex + 1}`,
  })),
}));

function PigHouseInventoryTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onRowClick = (record) => {
    console.log(record);
  };

  const onAddClick = () => {
    setIsDrawerOpen(true);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted");
    setIsDrawerOpen(false);
  };

  return (
    <>
      <BaseTable
        title="Pig House Inventory"
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        onAddClick={onAddClick}
      />

      <BaseDrawer name="addPigHouse" defaultOpen={true} onSubmit={handleSubmit}>
        <BaseDrawer.Trigger name="addPigHouse">
          <button style={{ display: "none" }}>Open Drawer</button>
        </BaseDrawer.Trigger>
        <BaseDrawer.Header icon={<Icon icon="mdi-light:home" />}>
          Add Pig House
        </BaseDrawer.Header>
        <BaseDrawer.Body>{/* Add form content here */}</BaseDrawer.Body>
        <BaseDrawer.Footer />
      </BaseDrawer>
    </>
  );
}

export default PigHouseInventoryTable;
