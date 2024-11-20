// components/ProcessItem.jsx
import { useState } from "react";
import ProcessDrawer from "./ProcessDrawer";
import RenderProcessTable from "../../ProcessTables";
import BaseAccordion from "../../../../Global/accordion/BaseAccordion";

function ProcessItem({ index, process, costDetail, onUpdate, onDelete }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <BaseAccordion
        title={` 製程${index + 1} ${process.processCategory}`}
        OnClick={() => setIsDrawerOpen(true)}
      >
        <RenderProcessTable
          processType={process.processCategory}
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
