import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { STATUS_COLORS } from "../../../../configs/Color";
import { useGetOverdueWorkOrderQuery } from "../../../../services";

function OverdueTasksDashbord() {
  const { data: overdueData, isLoading, error } = useGetOverdueWorkOrderQuery();

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
        columnWidths={[50, 230, 200, 120]}
        rowNum={6}
        fieldMapping={{
          orderNumber: 1,
          productId: 2,
          incompleteQty: 3,
          machine: 4,
        }}
        statusRules={{
          expired: {
            condition: createDateCondition("expiryDate", 0, "after"),
            color: STATUS_COLORS.EXPIRED,
            columns: [1, 2, 3, 4],
          },
          warning: {
            condition: createDateCondition("expiryDate", 7, "before"),
            color: STATUS_COLORS.WARNING,
            columns: [1, 2, 3, 4],
          },
        }}
      />
    </>
  );
}

export default OverdueTasksDashbord;
