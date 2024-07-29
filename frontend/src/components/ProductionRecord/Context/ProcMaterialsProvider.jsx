import React, { createContext, useContext, useState } from "react";
const ProcMaterialsContext = createContext();

function ProcMaterialsProvider({ children }) {
  const [procManageDrawer, setProcManageDrawer] = useState(false);
  const [materialsManageDrawer, setMaterialsManageDrawer] = useState(false);

  return (
    <ProcMaterialsContext.Provider
      value={{
        procManageDrawer,
        setProcManageDrawer,
        materialsManageDrawer,
        setMaterialsManageDrawer,
      }}
    >
      {children}
    </ProcMaterialsContext.Provider>
  );
}

const useProcMaterials = () => {
  const context = useContext(ProcMaterialsContext);
  if (context === undefined) {
    throw new Error(
      "useProcMaterials must be used within a ProcMaterialsProvider"
    );
  }
  return context;
};

export { ProcMaterialsProvider, useProcMaterials };
