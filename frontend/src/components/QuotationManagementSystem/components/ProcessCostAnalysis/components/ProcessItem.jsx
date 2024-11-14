// components/ProcessItem.jsx
import { useState } from "react";
import ProcessDrawer from "./ProcessDrawer";
import RenderProcessTable from "../../ProcessTables";
import { PROCESS_TYPES } from "../../../config/processTypes";
import BaseAccordion from "../../../../Global/accordion/BaseAccordion";

function ProcessItem({ index, process, costDetail, onUpdate, onDelete }) {
  console.log("🚀 ~ ProcessItem ~ costDetail:", costDetail);
  console.log("🚀 ~ ProcessItem ~  costDetail:", process);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/*  如果有 index 就顯示製程編號   */}
      <BaseAccordion
        title={` 製程${index + 1} ${PROCESS_TYPES[process.processType].value}`}
        OnClick={() => setIsDrawerOpen(true)}
      >
        <RenderProcessTable
          processType={process.processType}
          formData={process}
          costDetail={costDetail}
        />
      </BaseAccordion>

      <ProcessDrawer
        index={index}
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        process={process}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
}

export default ProcessItem;
