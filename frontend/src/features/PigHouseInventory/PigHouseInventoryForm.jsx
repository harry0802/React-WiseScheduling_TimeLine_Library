import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import DynamicForm from "../../components/form/DynamicForm-v1";
import { getPigHouseInventoryFormConfig } from "./formConfig";
import { usePigHouseInventory } from "./context/PostContext";
// import { usePigHouseInventory } from "./usePigHouseInventory";

const PigHouseInventoryForm = ({ id }) => {
  const formConfig = getPigHouseInventoryFormConfig();
  const [initialValues, setInitialValues] = useState(null);
  const { inventories } = usePigHouseInventory();

  useEffect(() => {
    if (inventories.length > 0) {
      if (id) {
        const inventory = inventories.find((item) => item.id === id);
        if (inventory) {
          const formattedInventory = {
            ...inventory,
            date: dayjs(inventory.date).format("YYYY-MM-DD"),
          };
          setInitialValues(formattedInventory);
        } else {
          console.error(`No inventory found with id: ${id}`);
          setInitialValues({});
        }
      } else {
        setInitialValues({
          date: dayjs().format("YYYY-MM-DD"),
          // ... 其他默認值
        });
      }
    }
  }, [id, inventories]);

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
    };
    console.log(formattedValues);
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <DynamicForm
      onFinish={handleFinish}
      initialValues={initialValues}
      fields={formConfig.fields}
    >
      {({ form, FormItem }) => (
        <>
          {formConfig.fields.map((field) => (
            <DynamicForm.Field key={field.name} field={field} />
          ))}
        </>
      )}
    </DynamicForm>
  );
};

export default PigHouseInventoryForm;
