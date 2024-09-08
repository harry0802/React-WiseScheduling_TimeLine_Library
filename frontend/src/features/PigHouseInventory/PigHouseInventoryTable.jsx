import React, { useState } from "react";
import { Icon } from "@iconify/react";

import DynamicForm from "../../components/form/DynamicForm";
import { getPigHouseInventoryFormConfig } from "./formConfig";
import BaseButton from "../../components/button/BaseButton";
import BaseTable from "../../components/table/BaseTable";
import BaseDrawer from "../../components/Drawer/BaseDrawer";
import { getColumnDefinitions } from "./getColumnDefinitions";

const pigBreeds = ["大白豬", "杜洛克", "藍瑞斯", "漢普夏", "巴克夏", "約克夏"];
const healthStatuses = ["良好", "一般", "需要關注", "生病"];
const managers = ["張三", "李四", "王五", "趙六", "孫七"];

function PigHouseInventoryTable({ data, onAddInventory }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { columnConfig, totalWidth } = getColumnDefinitions();

  function handleDrawerOpen() {
    setIsDrawerOpen(true);
  }

  function handleSubmit(values) {
    onAddInventory(values);
    setIsDrawerOpen(false);
  }

  function handleClickRow(row) {
    console.log(row);
  }

  const formConfig = getPigHouseInventoryFormConfig(
    pigBreeds,
    managers,
    healthStatuses
  );

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
        addButton={
          <BaseButton onClick={() => setIsDrawerOpen(true)}>
            添加豬舍庫存
          </BaseButton>
        }
      />

      <BaseDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={700}
      >
        <BaseDrawer.Header>
          添加豬舍庫存
          <BaseButton type="delete">
            <Icon
              icon="material-symbols:delete"
              onClick={() => setIsDrawerOpen(false)}
            />
          </BaseButton>
        </BaseDrawer.Header>

        <BaseDrawer.Body>
          <DynamicForm config={formConfig} onFinish={handleSubmit} />
        </BaseDrawer.Body>

        <BaseDrawer.Footer />
      </BaseDrawer>
    </>
  );
}

export default PigHouseInventoryTable;
