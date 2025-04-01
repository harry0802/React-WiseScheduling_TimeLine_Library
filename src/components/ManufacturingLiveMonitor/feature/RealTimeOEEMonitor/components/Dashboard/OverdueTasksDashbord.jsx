import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { STATUS_COLORS } from "../../../../configs/Color";

const MockData = [
  {
    orderNumber: "BLCF-1947-GF1",
    productId: "DE-241473",
    incompleteQty: 4187,
    machine: "A2",
    expiryDate: "2024-03-15",
  },
  {
    orderNumber: "OOLC-2358-GF2",
    productId: "NH-245493",
    incompleteQty: 1234,
    machine: "B3",
    expiryDate: "2024-03-20",
  },
  {
    orderNumber: "HQCH-2205-GF1",
    productId: "KD-241871",
    incompleteQty: 370,
    machine: "A6",
    expiryDate: "2024-03-25",
  },
  {
    orderNumber: "JLMT-3642-GF3",
    productId: "RS-251968",
    incompleteQty: 2875,
    machine: "C1",
    expiryDate: "2024-03-30",
  },
  {
    orderNumber: "XRPV-1823-GF1",
    productId: "TL-238742",
    incompleteQty: 542,
    machine: "B2",
    expiryDate: "2024-04-05",
  },
  {
    orderNumber: "MNTQ-1095-GF2",
    productId: "PK-247653",
    incompleteQty: 1768,
    machine: "A1",
    expiryDate: "2024-04-10",
  },
  {
    orderNumber: "ZKTW-4201-GF1",
    productId: "VF-236429",
    incompleteQty: 3124,
    machine: "D4",
    expiryDate: "2024-04-15",
  },
  {
    orderNumber: "PWLS-3157-GF3",
    productId: "QE-249318",
    incompleteQty: 837,
    machine: "C5",
    expiryDate: "2024-04-20",
  },
  {
    orderNumber: "GYDA-2784-GF2",
    productId: "HB-244721",
    incompleteQty: 1947,
    machine: "B7",
    expiryDate: "2024-04-25",
  },
  {
    orderNumber: "CNER-5026-GF1",
    productId: "FJ-240185",
    incompleteQty: 2359,
    machine: "D2",
    expiryDate: "2024-05-05",
  },
];

function OverdueTasksDashbord() {
  return (
    <>
      <ProductionTable
        initialData={MockData}
        header={["NO.", "製令單號", "產品編號", "未完成數量", "機台"]}
        columnWidths={[70]}
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
