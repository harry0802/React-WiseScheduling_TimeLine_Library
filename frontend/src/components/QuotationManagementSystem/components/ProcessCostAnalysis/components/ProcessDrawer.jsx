import { useProcessForm } from "../../../hook/useProcessForm";
import { DeleteButton } from "./DeleteButton";
import BaseDrawer from "../../../../Global/Drawer/BaseDrawer";
import ProcessForm from "../../ProcessForms/index";

function ProcessDrawer({
  visible,
  onClose,
  process,
  isNew = false,
  index,
  onUpdate,
  onDelete,
}) {
  const { methods, handleSubmit } = useProcessForm(process, visible);
  return (
    <BaseDrawer visible={visible} onClose={onClose}>
      <BaseDrawer.Header>
        {isNew ? "添加新製程" : `製程${index + 1} ${process?.processCategory}`}
        {!isNew && <DeleteButton onDelete={() => onDelete(process.id)} />}
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <ProcessForm
          initialData={process}
          methods={methods}
          onSubmit={handleSubmit}
          visible={visible}
        />
      </BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={handleSubmit} />
    </BaseDrawer>
  );
}

export default ProcessDrawer;
