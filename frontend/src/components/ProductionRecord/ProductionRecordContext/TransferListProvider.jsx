import React, { createContext, useContext, useState, useReducer } from "react";

const initialState = {
  left: [0, 1, 2, 3],
  right: [4, 5, 6, 7],
  checked: [],
};

const TransferListContext = createContext();

function transferListReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      const currentIndex = state.checked.indexOf(action.value);
      const newChecked = [...state.checked];

      ~currentIndex
        ? newChecked.splice(currentIndex, 1)
        : newChecked.push(action.value);

      return { ...state, checked: newChecked };

    case "TOGGLE_ALL":
      return state.checked.length === action.items.length
        ? { ...state, checked: not(state.checked, action.items) }
        : { ...state, checked: union(state.checked, action.items) };

    case "MOVE_RIGHT":
      return {
        left: not(state.left, state.checked),
        right: state.right.concat(state.checked),
        checked: not(state.checked, state.checked),
      };

    case "MOVE_LEFT":
      return {
        left: state.left.concat(state.checked),
        right: not(state.right, state.checked),
        checked: not(state.checked, state.checked),
      };

    default:
      return state;
  }
}

function TransferListProvider({ children }) {
  // 初始化資料
  const [state, dispatch] = useReducer(transferListReducer, {
    ...initialState,
    left: [0, 1, 2, 3],
    right: [4, 5, 6, 7],
  });

  const handleToggle = (value) => dispatch({ type: "TOGGLE", value });
  const handleToggleAll = (items) => dispatch({ type: "TOGGLE_ALL", items });
  const handleCheckedRight = () => dispatch({ type: "MOVE_RIGHT" });
  const handleCheckedLeft = () => dispatch({ type: "MOVE_LEFT" });

  return (
    <TransferListContext.Provider
      value={{
        state,
        dispatch,
        handleToggle,
        handleToggleAll,
        handleCheckedLeft,
        handleCheckedRight,
      }}
    >
      {children}
    </TransferListContext.Provider>
  );
}

const not = (a, b) => a.filter((value) => b.indexOf(value) === -1);
const intersection = (a, b) => a.filter((value) => b.indexOf(value) !== -1);
const union = (a, b) => [...a, ...not(b, a)];

const useTransferList = () => {
  const context = useContext(TransferListContext);
  if (context === undefined) {
    throw new Error("useRecordUi must be used within a RecordAddInfoContext");
  }
  return context;
};

export { TransferListProvider, useTransferList, not, intersection, union };
