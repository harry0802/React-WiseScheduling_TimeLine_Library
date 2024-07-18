import React, { createContext, useState, useContext, useReducer } from "react";
import fakedata from "../ProductionRecord/data.json";

const RecordContext = createContext();
const init = {
  data: fakedata,
};
function redurer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknown action type");
  }
}

function ProductionRecordProvider({ children }) {
  const [productMenu, setProductMenu] = useState(fakedata);
  const [state, dispath] = useReducer();

  return (
    <RecordContext.Provider value={{ productMenu, setProductMenu }}>
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
