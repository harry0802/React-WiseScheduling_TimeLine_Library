// MaintenanceDrawer.js
import { useRef, useState } from "react";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import DrawerForm from "./DrawerForm";

const TITLE_MAP = {
  inspector: "檢查",
  reinspector: "複檢",
  approver: "承認",
};

function MaintenanceDrawer({ type, onClose, visible, data, config }) {
  const [formMethods, setFormMethods] = useState(null);

  if (!type) return null;

  const handleSubmit = async (formData) => {
    try {
      console.log("表單提交:", formData);
      onClose();
      return formData;
    } catch (error) {
      console.error("提交失敗:", error);
      throw error;
    }
  };

  return (
    <BaseDrawer visible={visible} onClose={onClose}>
      <BaseDrawer.Header>請{TITLE_MAP[type]}以下項目</BaseDrawer.Header>
      <BaseDrawer.Body>
        <DrawerForm
          type={type}
          initialData={data}
          config={config}
          onSubmit={handleSubmit}
          setFormMethods={setFormMethods}
        />
      </BaseDrawer.Body>
      <BaseDrawer.Footer
        onSubmit={formMethods ? formMethods.handleSubmit(handleSubmit) : null}
      />
    </BaseDrawer>
  );
}

export default MaintenanceDrawer;
