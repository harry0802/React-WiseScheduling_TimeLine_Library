import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, notification } from "antd";
import { useTranslation } from "react-i18next";

import { TRANSLATION_KEYS } from "../utils/constants";
import { createQmsProductionInspectionService } from "../domain/qmsProductionInspectionService";
import { useUpdateChildLotsMutation } from "../../../../../store/api/productionReportApi";

export const useQmsProductionInspection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [updateChildLots] = useUpdateChildLotsMutation();

  const qmsService = createQmsProductionInspectionService(updateChildLots);
  const [lots, setLots] = useState(qmsService.initialLots);

  useEffect(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function () {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        content: <p>{t(TRANSLATION_KEYS.FORBIDDEN)}</p>,
        okText: t("common.okBtn"),
        onOk() {},
      });
    };
    return () => {
      window.onpopstate = null;
    };
  }, [t]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  const updateLotsByProductionQuantity = (lotName, quantity) => {
    setLots(qmsService.updateLotProductionQuantity(lots, lotName, quantity));
  };

  return {
    tabValue,
    lots,
    handleChange,
    handleSubmit,
    updateLotsByProductionQuantity,
  };
};
