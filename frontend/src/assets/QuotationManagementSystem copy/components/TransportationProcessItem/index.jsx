import { useState } from "react";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import BaseAccordion from "../../../Global/accordion/BaseAccordion";
import ProcessTable from "../ProcessTables";
import TransportationForm from "./TransportationForm";

function TransportationProcessItem({ process, onUpdate, costDetail }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formMethods, setFormMethods] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await onUpdate?.(
        {
          FQFreights: formData.FQFreights,
          FQCustomsDuties: formData.FQCustomsDuties,
        },
        () => setIsDrawerOpen(false)
      );
      return formData;
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  };

  return (
    <>
      <BaseAccordion
        title="運輸費用與貨運關稅"
        OnClick={() => setIsDrawerOpen(true)}
      >
        <ProcessTable
          costDetail={costDetail}
          processType="TRANSPORTATION"
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
        <BaseDrawer.Footer
          onSubmit={formMethods ? formMethods.handleSubmit(handleSubmit) : null}
        />
      </BaseDrawer>
    </>
  );
}

export default TransportationProcessItem;
