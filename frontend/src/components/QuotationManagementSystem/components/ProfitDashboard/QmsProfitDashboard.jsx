import React from "react";
import { ProfitGrid } from "./ProfitGrid";
import { FORM_FIELDS } from "./constants";
import { useProfitCalculation } from "../../hook/useProfitCalculation";
import BaseProductInfoSection from "../../../Global/sections/BaseProductInfoSection";

function QmsProfitDashboard({ totalCostnoMarketing, setCostAndQuotation }) {
  const { profitData, quotationAmount, percentages, handleFormSubmit } =
    useProfitCalculation(setCostAndQuotation, totalCostnoMarketing);

  const defaultValues = {
    quotationAmount,
    ...percentages,
  };

  return (
    <BaseProductInfoSection
      onUpdate={handleFormSubmit}
      title="利潤管理"
      product={defaultValues}
    >
      <ProfitGrid data={profitData} />

      <BaseProductInfoSection.Drawer>
        <BaseProductInfoSection.Form
          defaultValues={defaultValues}
          formFields={FORM_FIELDS}
        />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsProfitDashboard;
