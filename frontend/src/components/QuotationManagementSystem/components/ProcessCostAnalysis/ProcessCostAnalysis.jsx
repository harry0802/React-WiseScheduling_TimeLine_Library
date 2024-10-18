import BaseProductInfoSection from "../../../Global/sections/BaseProductInfoSection";
import AddIcon from "@mui/icons-material/Add";
import { ProcessCostAnalysisSections } from "../ProcessCostAnalysisSections";

function ProcessCostAnalysis() {
  return (
    <ProcessCostAnalysisSections
      title="各製程物料與加工成本分析"
      icon={<AddIcon />}
    />
  );
}

export default ProcessCostAnalysis;
