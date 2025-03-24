import React from "react";
import ProductionTable from "../../../components/Carousel/CarouselTable/CarouselTable";
import {
  createColorCondition,
  createDateCondition,
} from "../../../components/Carousel/CarouselTable/utils";
import { STATUS_COLORS } from "../../../configs/Color";

function DailyProductionDashboard() {
  return (
    <div>
      <ProductionTable
        initialData={[
          {
            modelCode: "AENG-2477-GF2",
            modelName: "INJ-01",
            productCode: "BC-240723",
            productName: "24CF-上框熱鐵-CL327",
            quantity: 7308,
            station: "A2",
            expiryDate: "2025-04-15",
          },
          {
            modelCode: "AENG-2457-GF1",
            modelName: "INJ-01",
            productCode: "EF-24-0617",
            productName: "橘黃中圓B-TOP2374",
            quantity: 21473,
            station: "B3",
            expiryDate: "2025-03-25",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          // 一個過期的時間
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          // 一個過期的時間
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },

          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
          {
            modelCode: "ENAC-2027-GF2",
            modelName: "ING-02",
            productCode: "AD-230871",
            productName: "WEAD24-BLACKPP07",
            quantity: 2438,
            station: "A2",
            expiryDate: "2025-03-10",
          },
        ]}
        fieldMapping={{
          modelCode: 1,
          modelName: 2,
          productCode: 3,
          productName: 4,
          quantity: 5,
          station: 6,
        }}
        statusRules={{
          // 整條row 套用
          expired: {
            condition: createDateCondition("expiryDate", 0, "after"),
            color: STATUS_COLORS.EXPIRED,
            columns: [1, 2, 3, 4, 5, 6],
          },
          warning: {
            condition: createDateCondition("expiryDate", 7, "before"),
            color: STATUS_COLORS.WARNING,
            columns: [1, 2, 3, 4, 5, 6],
          },
          lowStock: {
            condition: createColorCondition("quantity", 0, 3000),
            color: STATUS_COLORS.LOW_STOCK,
            columns: [1, 2, 3, 4, 5, 6],
          },
        }}
      />
    </div>
  );
}

export default DailyProductionDashboard;
