import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getColumnDefinitions } from "./getColumnDefinitions";
import BaseButton from "../../components/button/BaseButton";
import BaseTable from "../../components/table/BaseTable";
import BaseDrawer from "../../components/Drawer/BaseDrawer";
import PigHouseInventoryForm from "./PigHouseInventoryForm";
import { usePigHouseInventory } from "./context/PostContext";

function PigHouseInventoryTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [id, setId] = useState(null);

  const { columnConfig, totalWidth } = getColumnDefinitions();

  const { inventories: data, handleAddInventory: onAddInventory } =
    usePigHouseInventory();
  function handleDrawerOpen() {
    setIsDrawerOpen(true);
  }

  function handleSubmit(values) {
    onAddInventory(values);
    setIsDrawerOpen(false);
  }

  function handleClickRow(row) {
    handleDrawerOpen();
    setId(row.id);
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setId(null);
    }
  }, [setId, isDrawerOpen]);

  return (
    <>
      <BaseTable
        columns={columnConfig}
        onRowClick={handleClickRow}
        onAddClick={handleDrawerOpen}
        data={data}
        scroll={{ x: totalWidth, y: 500 }}
        bordered
        size="small"
        pagination={false}
        title="豬舍庫存管理"
        maxHeight={"100%"}
      />
      <BaseDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={700}
      >
        <BaseDrawer.Header>
          {id ? "編輯豬舍庫存" : "添加豬舍庫存"}
          {id && (
            <BaseButton type="delete">
              <Icon
                icon="material-symbols:delete"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setId(null);
                }}
              />
            </BaseButton>
          )}
        </BaseDrawer.Header>

        <BaseDrawer.Body>
          <PigHouseInventoryForm id={id} />
        </BaseDrawer.Body>

        {/* <BaseDrawer.Footer onSubmit={handleSubmit} /> */}
      </BaseDrawer>
    </>
  );
}

export default PigHouseInventoryTable;
