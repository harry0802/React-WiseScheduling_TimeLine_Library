import React, { createContext, useContext, useReducer, useEffect } from "react";
import fakedata from "../data.json";

const RecordContext = createContext();
const initialState = {
  // page status
  pageStatus: "產品履歷與BOM",
  // fake Data
  data: null,
  displayedData: null,
  // for paginations
  currentPage: 1,
  itemsPerPage: 10,
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE_STATUS":
      return {
        ...state,
        pageStatus: action.payload,
      };

    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
        total: action.payload.length,
        displayedData: action.payload.slice(0, state.itemsPerPage),
      };

    case "SET_DISPLAYED_DATA":
      return { ...state, displayedData: action.payload };

    case "SET_PAGE":
      const startIndex = (action.payload - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      return {
        ...state,
        displayedData: state.data.slice(startIndex, endIndex),
        currentPage: action.payload,
      };

    case "SET_PAGE_SIZE":
      const newStartIndex = (state.currentPage - 1) * action.payload;
      const newEndIndex = newStartIndex + action.payload;
      return {
        ...state,
        displayedData: state.data.slice(newStartIndex, newEndIndex),
        itemsPerPage: action.payload,
      };

    case "SEARCH_DATA":
      const filteredData = state.data.filter((item) =>
        item[state.searchKey].includes(state.searchTerm)
      );
      return {
        ...state,
        displayedData: filteredData.slice(0, state.itemsPerPage),
        total: filteredData.length,
        currentPage: 1,
      };

    case "SET_FILTERED_DATA":
      const { filteredData: filtered, itemsPerPage } = action.payload;
      if (
        !action.payload ||
        !Array.isArray(filtered) ||
        typeof itemsPerPage !== "number"
      ) {
        console.error("Invalid payload for SET_FILTERED_DATA action");
        return state;
      }

      return {
        ...state,
        displayedData: filtered.slice(0, itemsPerPage),
        total: filtered.length,
        currentPage: 1,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function ProductionRecordProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handlePageStatust(statu) {
    dispatch({ type: "SET_PAGE_STATUS", payload: statu });
  }

  // 這裡要串 API
  useEffect(function () {
    dispatch({ type: "SET_DATA", payload: fakedata });
  }, []);

  return (
    <RecordContext.Provider value={{ state, dispatch, handlePageStatust }}>
      {children}
    </RecordContext.Provider>
  );
}

const useRecord = () => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error("useRecord must be used within a ProductionRecordProvider");
  }
  return context;
};

export { ProductionRecordProvider, useRecord };
