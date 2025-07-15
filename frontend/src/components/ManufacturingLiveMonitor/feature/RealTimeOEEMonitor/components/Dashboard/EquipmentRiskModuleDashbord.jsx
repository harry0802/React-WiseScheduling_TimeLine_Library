import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { DEVICE_STATUS_COLORS, STATUS_COLORS } from "../../../../configs/Color";
import { useGetMachineOfflineEventQuery } from "../../../../services";

function EquipmentRiskModuleDashbord() {
  const {
    data: alertData,
    isLoading,
    error,
  } = useGetMachineOfflineEventQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "270px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        資料載入中...
      </div>
    );
  }

  if (error) {
    console.error("無法載入設備風險資料:", error);
  }

  // 如果是空資料
  if (!alertData || alertData.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "270px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        無資料
      </div>
    );
  }

  return (
    <>
      <ProductionTable
        columnWidths={[70]}
        rowNum={6}
        height={270}
        initialData={alertData || []}
        header={["NO.", "發生時間", "機台", "原因"]}
        fieldMapping={{
          time: 1,
          machine: 2,
          reason: 3,
        }}
      />
    </>
  );
}

export default EquipmentRiskModuleDashbord;
