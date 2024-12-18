export const handleResize =
  (index, setColumns) =>
  (_, { size }) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      return newColumns;
    });
  };

export const getColumns = (
  defaultColumns,
  handleSave,
  queryFromLY,
  workOrderSNsFromLYState,
  setColumns
) => {
  return defaultColumns.map((col, index) => {
    const onCell = (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      rule: col.rule,
      type: col.type,
      title: col.title,
      handleSave,
      queryFromLY,
      workOrderSNsFromLYState,
    });

    return {
      ...col,
      key: col.dataIndex,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index, setColumns),
      }),
      onCell: col.editable ? onCell : null,
    };
  });
};
