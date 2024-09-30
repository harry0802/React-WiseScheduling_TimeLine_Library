import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import BaseTable from "../table/BaseTable";
import BaseDrawer from "../Drawer/BaseDrawer";
import DynamicForm from "../form/DynamicForm-v1";
import { Form } from "antd";
import { formatSubmitValues } from "../../utility/formUtils";
import useNotification from "../notification/useNotification";

const InventoryContext = createContext();

export function InventorySystem({ children, config }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { notifySuccess } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const items = await config.fetchItems();
        setData(items);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  const openDrawer = useCallback((item = null) => {
    setEditingItem(item);
    setVisible(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setEditingItem(null);
    setVisible(false);
  }, []);

  const addItem = useCallback(
    async (item) => {
      setLoading(true);
      try {
        const newItem = await config.addItem(item);
        console.log(newItem);

        setData((prev) => [...prev, newItem]);

        return newItem;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const updateItem = useCallback(
    async (id, updates) => {
      setLoading(true);
      try {
        const updatedItem = await config.updateItem(id, updates);
        setData((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );
        notifySuccess();
        return updatedItem;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const deleteItem = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await config.deleteItem(id);
        setData((prev) => prev.filter((item) => item.id !== id));
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const handleFinish = useCallback(
    async (values) => {
      console.log(values);

      if (editingItem) {
        await updateItem(editingItem.id, values);
      } else {
        await addItem(values);
      }
      closeDrawer();
    },
    [editingItem, updateItem, addItem, closeDrawer]
  );

  const contextValue = {
    config,
    data,
    loading,
    visible,
    editingItem,
    openDrawer,
    closeDrawer,
    handleFinish,
    deleteItem,
  };

  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryContext() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "InventorySystem compound components cannot be rendered outside the InventorySystem component"
    );
  }
  return context;
}

InventorySystem.Table = function InventoryTable() {
  const { config, data, loading, openDrawer } = useInventoryContext();
  const { columnConfig, totalWidth } = config.getColumns();

  return (
    <BaseTable
      title={config.title}
      columns={columnConfig}
      data={data}
      onRowClick={openDrawer}
      onAddClick={() => openDrawer()}
      scroll={{ x: totalWidth, y: 350 }}
      loading={loading}
    />
  );
};

InventorySystem.Drawer = function InventoryDrawer() {
  const { visible, closeDrawer, editingItem, config, handleFinish } =
    useInventoryContext();
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = formatSubmitValues(values);
        handleFinish(formattedValues);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  }, [form, handleFinish]);

  return (
    <BaseDrawer visible={visible} onClose={closeDrawer} width={700}>
      <BaseDrawer.Header>
        {editingItem ? `編輯${config.title}` : `新增${config.title}`}
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <InventorySystem.Form form={form} />
      </BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={onSubmit} />
    </BaseDrawer>
  );
};

InventorySystem.Form = function InventoryForm({ form }) {
  const { config, editingItem } = useInventoryContext();
  return (
    <DynamicForm
      form={form}
      fields={config.formFields}
      initialValues={editingItem}
      submitButton={false}
    >
      {() => (
        <>
          {config.formFields.map((field, index) => (
            <DynamicForm.Field key={index} field={field} />
          ))}
        </>
      )}
    </DynamicForm>
  );
};

export default InventorySystem;

// 使用範例
// 假設我們有個庫存系統的配置物件
// const inventoryConfig = {
//   title: '庫存管理',
//   columns: [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: '名稱', dataIndex: 'name', key: 'name' },
//     { title: '數量', dataIndex: 'quantity', key: 'quantity' },
//   ],
//   formFields: [
//     { name: 'name', label: '名稱', type: 'text', span: 24 },
//     { name: 'quantity', label: '數量', type: 'number', span: 24 },
//   ],
// };

// 使用範例組件
// function ExampleComponent() {
//   return (
//     <InventorySystem config={inventoryConfig}>
//       <InventorySystem.Table />
//       <InventorySystem.Drawer />
//     </InventorySystem>
//   );
// }
