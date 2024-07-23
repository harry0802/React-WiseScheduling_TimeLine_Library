import React, { createContext, useContext, useState } from "react";

const RecordAddInfoContext = createContext();

function RecordAddInfoProvider({ children }) {
  const [infoDrawer, setInfoDrawer] = useState(false);
  const [processDrawer, setProcessDrawer] = useState(false);

  return (
    <RecordAddInfoContext.Provider
      value={{ infoDrawer, setInfoDrawer, processDrawer, setProcessDrawer }}
    >
      {children}
    </RecordAddInfoContext.Provider>
  );
}

const useRecordAddInfo = () => {
  const context = useContext(RecordAddInfoContext);
  if (context === undefined) {
    throw new Error("useRecordUi must be used within a RecordAddInfoContext");
  }
  return context;
};

export { RecordAddInfoProvider, useRecordAddInfo };
