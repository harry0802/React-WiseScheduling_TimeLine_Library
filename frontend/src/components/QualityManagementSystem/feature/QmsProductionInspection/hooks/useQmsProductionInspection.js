import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, notification } from "antd";
import { useTranslation } from "react-i18next";

import { TRANSLATION_KEYS } from "../utils/constants";
import { useProductionReports, useQmsStore } from "../../../slice/QmsAccount";
import useNotification from "../../../../ProductionRecord/hook/useNotification";

export const useQmsProductionInspection = () => {
  const { t } = useTranslation();
  const { machineSN, userType } = useParams();
  const { productionReports, inspectionTypes, account } = useQmsStore();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { notifySuccess } = useNotification();
  const { qmsService } = useProductionReports();

  const initialLots = useCallback(
    () =>
      productionReports[machineSN]
        ? qmsService.initialLots(productionReports[machineSN])
        : [],
    [machineSN, productionReports, qmsService]
  );

  const [lots, setLots] = useState([]);

  useEffect(() => {
    const updatedLots = initialLots();
    if (JSON.stringify(updatedLots) !== JSON.stringify(lots)) {
      setLots(updatedLots);
    }
  }, [initialLots, productionReports, machineSN]);

  const handleSubmit = useCallback(async () => {
    if (lots.length === 0) {
      showErrorModal(t(TRANSLATION_KEYS.EMPTY_FIELD_ERROR));
      return;
    }
    try {
      const { name } = inspectionTypes.find((type) => type.schema === userType);
      await qmsService.submitLots(lots, name, account);
      navigate(`/QualityManagementSystem`);
      notifySuccess();
    } catch (error) {
      handleSubmitError(error);
    }
  }, [lots, qmsService, t]);

  const showErrorModal = useCallback(
    (content) => {
      Modal.error({
        content: <p>{content}</p>,
        okText: t("common.okBtn"),
      });
    },
    [t]
  );

  const handleSubmitError = useCallback(
    (error) => {
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
        console.error("💣 rejected", error);
        notification.error({
          description: t("common.updatingError"),
          placement: "bottomRight",
          duration: 5,
        });
      }
    },
    [lots, t]
  );

  const updateLotQuantity = useCallback(
    (updateFn) => (lotId, lotName, quantity) => {
      if (typeof updateFn !== "function") {
        console.error("updateFn is not a function");
        return;
      }
      setLots((prevLots) => updateFn(prevLots, lotId, quantity));
    },
    []
  );

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
  }, [t]);

  return {
    tabValue,
    lots,
    handleChange: useCallback((_, newValue) => setTabValue(newValue), []),
    handleSubmit,
    updateLotsByInspectionQuantity: updateLotQuantity(
      qmsService.updateLotInspectionQuantity
    ),
    updateLotsByGoodQuantity: updateLotQuantity(
      qmsService.updateLotGoodQuantity
    ),
  };
};
