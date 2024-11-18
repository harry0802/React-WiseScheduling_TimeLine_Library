import { useState } from "react";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import BaseAccordion from "../../../Global/accordion/BaseAccordion";
import ProcessTable from "../ProcessTables";
import TransportationForm from "./TransportationForm";

function TransportationProcessItem({ process, onUpdate }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formMethods, setFormMethods] = useState(null);

  const handleSubmit = () => {
    if (!formMethods) return;
    const formData = formMethods.getValues();
    console.log("🚀 ~ handleSubmit ~ formData:", formData);

    onUpdate?.({
      ...formData,
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
        <ProcessTable processType="TRANSPORTATION" formData={process} />
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
