import React, { createContext, useContext, useEffect, useState } from "react";
import { homeSlice } from "../slice/HomeSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RecordAddInfoContext = createContext();

function RecordAddInfoProvider({ children }) {
  const { data } = homeSlice();
  const { productId } = useParams();

  const navigate = useNavigate();
  if (data === null || !productId) navigate("/ProductionRecordPage");

  const [infoDrawer, setInfoDrawer] = useState(false);
  const [processDrawer, setProcessDrawer] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    (function () {
      const product = data?.filter((item) => +item.id === +productId);
      setProductData(product);
    })();
  }, [productId, data]);

  return (
    <RecordAddInfoContext.Provider
      value={{
        infoDrawer,
        setInfoDrawer,
        processDrawer,
        setProcessDrawer,
        productData,
        productId,
      }}
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
