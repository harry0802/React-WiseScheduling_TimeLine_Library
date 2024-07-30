import { useReducer } from "react";

// 定義動作類型
const actionTypes = {
  SET_DATA: "SET_DATA",
  ADD_ROW: "ADD_ROW",
  EDIT_ROW: "EDIT_ROW",
  DELETE_ROW: "DELETE_ROW",
  SET_SELECTED_KEYS: "SET_SELECTED_KEYS",
};

// 初始狀態
const initialState = {
  dataSource: [],
  selectedRowKeys: [],
};

// Reducer 函數，用於處理狀態變更
function tableReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, dataSource: action.payload };

    case actionTypes.EDIT_ROW:
      return {
        ...state,
        dataSource: state.dataSource.map((row) =>
          row.key === action.payload.key ? action.payload : row
        ),
      };

    case actionTypes.SET_SELECTED_KEYS:
      return { ...state, selectedRowKeys: action.payload };
    default:
      return state;
  }
}

// 自訂義 Hook，用於管理表格數據和狀態
const useTableData = (initialData) => {
  const [state, dispatch] = useReducer(tableReducer, {
    ...initialState,
    dataSource: initialData,
  });

  // 設置數據
  const setData = (data) =>
    dispatch({ type: actionTypes.SET_DATA, payload: data });

  // 編輯行
  const editRow = (row) =>
    dispatch({ type: actionTypes.EDIT_ROW, payload: row });

  // 設置選中行的鍵
  const setSelectedKeys = (keys) =>
    dispatch({ type: actionTypes.SET_SELECTED_KEYS, payload: keys });

  return {
    state,
    setData,
    editRow,
    setSelectedKeys,
  };
};

export default useTableData;
