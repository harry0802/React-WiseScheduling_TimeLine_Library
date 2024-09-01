import React, { useMemo } from "react";
import { Select, message } from "antd";
import { useUpdateProductionScheduleMutation } from "../../../store/api/productionScheduleApi";
import { useGetProcessesAndMaterialsQuery } from "../../ProductionRecord/service/endpoints/processApi";
import { PROCESS_CATEGORY_OPTION } from "../../../config/config";

//  TODO: Add more form controls and logic for editing production schedule

function ScheduleProcessNameOptions({ source }) {
  const { Option } = Select;
  const { productId, id, processName } = source || {};

  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();

  const { data: processCategory } = useGetProcessesAndMaterialsQuery(
    {
      productId: productId,
      processCategory: PROCESS_CATEGORY_OPTION[0].category,
    },
    { skip: !productId }
  );

  const handleSelectChange = async (value) => {
    if (!id) return;
    try {
      const response = await UpdateProductionSchedule({
        id,
        data: { processId: value },
      });
      !response.error
        ? message.success("修改數據成功")
        : message.error("修改數據失敗");
    } catch (error) {
      message.error("更新過程中出現錯誤");
    }
  };

  return (
    <Select
      defaultValue={processName || ""}
      value={processName || ""}
      style={{ width: 200, background: "none", borderColor: "#1677ff" }}
      onChange={(value, label) => handleSelectChange(value, label)}
    >
      {processCategory?.data?.map((item, index) => (
        <Option key={index} value={item.id} label={item.processName}>
          {item.processName}
        </Option>
      ))}
    </Select>
  );
}

export default ScheduleProcessNameOptions;
