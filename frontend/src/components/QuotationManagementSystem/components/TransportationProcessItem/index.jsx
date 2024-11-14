import { useState } from "react";
import { useProcessForm } from "../../hook/useProcessForm";
import { PROCESS_TYPES } from "../../config/processTypes";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import ProcessForm from "../ProcessForm";
import BaseAccordion from "../../../Global/accordion/BaseAccordion";
import ProcessTable from "../ProcessTables";
import TransportationForm from "./TransportationForm";

function TransportationProcessItem({ process, onUpdate }) {
  console.log("🚀 ~ TransportationProcessItem ~ process:", process);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formMethods, setFormMethods] = useState(null);
  //  這邊我的 資料也要算金額

  //  這裡串接 api 的更新
  const handleSubmit = () => {
    if (!formMethods) return;
    const formData = formMethods.getValues();

    onUpdate?.({
      ...formData,
      processType: PROCESS_TYPES.TRANSPORTATION.key,
      id: process.id,
    });
    setIsDrawerOpen(false);
  };
  return (
    <>
      <BaseAccordion
        title="運輸費用與貨運關稅"
        OnClick={() => setIsDrawerOpen(true)}
      >
        <ProcessTable
          processType={PROCESS_TYPES.TRANSPORTATION.key}
          formData={process}
        />
      </BaseAccordion>

      <BaseDrawer visible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <BaseDrawer.Header>運輸費用與貨運關稅設定</BaseDrawer.Header>
        <BaseDrawer.Body>
          <TransportationForm
            initialData={process}
            onSubmit={handleSubmit}
            setFormMethods={setFormMethods}
          />
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleSubmit} />
      </BaseDrawer>
    </>
  );
}

export default TransportationProcessItem;
