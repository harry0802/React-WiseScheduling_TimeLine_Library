import React, { useMemo } from "react";
import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { STATUS_COLORS } from "../../../../configs/Color";
import { useGetOverdueWorkOrderQuery } from "../../../../services";
import { isExpired, isExpiredSoon } from "../../../../utils/calcDay";

function OverdueTasksDashbord() {
  const { data: overdueData, isLoading, error } = useGetOverdueWorkOrderQuery();

  // 📊 業務特定的狀態規則 - 專屬於 OverdueTasksDashbord 的邏輯
  const statusRules = useMemo(
    () => ({
      // 已過期：今天超過 expiryDate 就是 expired
      expired: {
        condition: (item) => item.expiryDate && isExpired(item.expiryDate),
        color: STATUS_COLORS.EXPIRED,
        columns: [1, 2, 3, 4],
      },
      // 即將過期：今天在 expiryDate 一周內就是 warning
      warning: {
        condition: (item) =>
          item.expiryDate && isExpiredSoon(item.expiryDate, 7),
        color: STATUS_COLORS.WARNING,
        columns: [1, 2, 3, 4],
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        資料載入中...
      </div>
    );
  }

  if (error) {
    console.error("無法載入逾期工單資料:", error);
  }

  return (
    <>
      <ProductionTable
        height={"100%"}
        initialData={overdueData || []}
        header={["NO.", "製令單號", "產品編號", "未完成數量", "機台"]}
        X
        columnWidths={[65, 230, 230, 140]}
        rowNum={6}
        fieldMapping={{
          orderNumber: 1,
          productId: 2,
          incompleteQty: 3,
          machine: 4,
        }}
        statusRules={statusRules}
      />
    </>
  );
}

export default OverdueTasksDashbord;
