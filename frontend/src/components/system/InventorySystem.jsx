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

const InventoryContext = createContext();

export function InventorySystem({ children, config }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  return (
    <BaseDrawer visible={visible} onClose={closeDrawer} width={700}>
      <BaseDrawer.Header>
        {editingItem ? `Edit ${config.title}` : `Add ${config.title}`}
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <InventorySystem.Form />
      </BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={handleFinish} />
    </BaseDrawer>
  );
};

InventorySystem.Form = function InventoryForm() {
  const { config, editingItem, handleFinish } = useInventoryContext();

  return (
    <DynamicForm
      fields={config.formFields}
      onFinish={handleFinish}
      initialValues={editingItem}
      submitText="Save"
    >
      {({ FormItem }) => (
        <>
          {config.formFields.map((field) => (
            <DynamicForm.Field key={field.name} field={field} />
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
