import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, notification } from "antd";
import { useTranslation } from "react-i18next";

import { TRANSLATION_KEYS } from "../utils/constants";
import { createQmsProductionInspectionService } from "../domain/qmsProductionInspectionService";
import {
  useGetProductionReportQuery,
  useUpdateChildLotsMutation,
} from "../../../../../store/api/productionReportApi";

export const useQmsProductionInspection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [updateChildLots] = useUpdateChildLotsMutation();

  const qmsService = createQmsProductionInspectionService(updateChildLots);
  const [lots, setLots] = useState(qmsService.initialLots);

  const {
    data: workOrders,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductionReportQuery({
    machineSN: "A1",
  });
  console.log(workOrders);

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        content: <p>{t(TRANSLATION_KEYS.FORBIDDEN)}</p>,
        okText: t("common.okBtn"),
      });
    };

    window.history.pushState(null, "", document.URL);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSubmit = async () => {
    try {
      await qmsService.submitLots(lots);
      // navigate("/OperatorSignPage", { state: { action: "endChildLot" } });
    } catch (error) {
      if (error.message === "EMPTY_PRODUCTION_QUANTITY") {
        Modal.error({
          content: (
            <div>
              <p>{t(TRANSLATION_KEYS.EMPTY_FIELD_ERROR)}</p>
              {lots
                .filter((lot) => lot.hasEmptyProductionQuantity())
                .map((lot, idx) => (
                  <p key={idx}>{lot.productName}</p>
                ))}
            </div>
          ),
          okText: t("common.okBtn"),
        });
      } else {
        console.error("rejected", error);
        notification.error({
          description: t("common.updatingError"),
          placement: "bottomRight",
          duration: 5,
        });
      }
    }
  };

  const updateLotQuantity = (updateFn) => (lotName, quantity) => {
    setLots(updateFn(lots, lotName, quantity));
  };

  return {
    tabValue,
    lots,
    handleChange: (_, newValue) => setTabValue(newValue),
    handleSubmit,
    updateLotsByInspectionQuantity: updateLotQuantity(
      qmsService.updateLotInspectionQuantity
    ),
    updateLotsByGoodQuantity: updateLotQuantity(
      qmsService.updateLotGoodQuantity
    ),
  };
};
