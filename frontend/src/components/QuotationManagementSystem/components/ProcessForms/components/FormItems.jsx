import React from "react";

import {
  renderGeneralFields,
  renderTodoList,
  renderNestedItems,
} from "../utils/formUtils";
const FormItems = React.memo(({ items }) => {
  if (!Array.isArray(items)) {
    console.warn("Items is not an array:", items);
    return null;
  }

  return (
    <>
      {items.map((item, sectionIndex) => {
        switch (item.type) {
          case "general":
            return renderGeneralFields(item, sectionIndex);
          case "todolist":
            return renderTodoList(item, sectionIndex);
          case "nested":
            return renderNestedItems(item, sectionIndex);
          default:
            console.warn(`Unknown item type: ${item.type}`);
            return null;
        }
      })}
    </>
  );
});

export default FormItems;
