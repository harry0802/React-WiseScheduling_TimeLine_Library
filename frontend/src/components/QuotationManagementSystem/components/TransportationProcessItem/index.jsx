import { useState } from "react";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import BaseAccordion from "../../../Global/accordion/BaseAccordion";
import ProcessTable from "../ProcessTables";
import TransportationForm from "./TransportationForm";
import ConfirmationDialog from "../../../Global/dialog/BaseDialog";

function TransportationProcessItem({ process, onUpdate, costDetail }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formMethods, setFormMethods] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const handleSubmit = async (formData) => {
    setPendingData(formData);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (pendingData) {
      try {
        await onUpdate?.({
          SQFreights: pendingData.SQFreights,
          SQCustomsDuties: pendingData.SQCustomsDuties,
        });
        setIsDrawerOpen(false);
      } catch (error) {
        console.error("Submit error:", error);
        throw error;
      }
    }
    setConfirmOpen(false);
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
          onSubmit={() => formMethods?.handleSubmit(handleSubmit)()}
        />
      </BaseDrawer>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="確認操作"
        message="你確定要提交這些更改嗎？"
      />
    </>
  );
}

export default TransportationProcessItem;
