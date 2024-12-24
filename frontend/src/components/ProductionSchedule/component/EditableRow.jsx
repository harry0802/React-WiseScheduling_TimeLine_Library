import React from "react";
import { EditableProvider } from "../context/EditableRowProvider";

const EditableRow = ({ index, ...props }) => {
  return (
    <EditableProvider>
      <tr {...props} />
    </EditableProvider>
  );
};

export default EditableRow;
