import React, { useState, useEffect } from "react";
import { ScrollBoard } from "@iimm/data-view-react";
import ProductionTable from "../../../components/Carousel/CarouselTable/CarouselTable";
import {
  createColorCondition,
  createDateCondition,
} from "../../../components/Carousel/CarouselTable/utils";

const ProductionTable2 = ({ width = "100%", height = "220px" }) => {
  // 狀態管理
  const [tableConfig, setTableConfig] = useState(null);

  // 初始化並定期更新數據
  useEffect(() => {
    const initConfig = {
      header: [
        "NO.",
        "型號編號",
        "型號名稱",
        "產品編號",
        "產品名稱",
        "生產數量",
        "機台",
      ],
      data: [
        [
          '<span style="color:#fff;">01</span>',
          '<span style="color:#1DE9B6;">AENG-2477-GF2</span>',
          "INJ-01",
          "BC-240723",
          "24CF-上框熱鐵-CL327...",
          "7,308",
          "A2",
        ],
        [
          '<span style="color:#fff;">02</span>',
          '<span style="color:#FFAA00;">AENG-2457-GF1</span>',
          '<span style="color:#FFAA00;">INJ-01</span>',
          "EF-24-0617",
          '<span style="color:#FFAA00;">橘黃中圓B-TOP2374...</span>',
          "21,473",
          '<span style="color:#FFAA00;">B3</span>',
        ],
        [
          '<span style="color:#fff;">03</span>',
          '<span style="color:#F2285F;">ENAC-2027-GF2</span>',
          '<span style="color:#F2285F;">ING-02</span>',
          "AD-230871",
          '<span style="color:#F2285F;">WEAD24-BLACKPP07...</span>',
          "2,438",
          "A2",
        ],
      ],
      headerBGC: "#0C2E49",
      oddRowBGC: "#103362",
      evenRowBGC: "#0A2138",
      waitTime: 3000,
      carousel: "page",
      headerHeight: 45,
      rowNum: 3,
      index: false,
      columnWidth: [50, 150, 80, 120, 180, 80, 60],
      align: [
        "center",
        "center",
        "center",
        "center",
        "left",
        "right",
        "center",
      ],
    };

    setTableConfig(initConfig);

    // 可以在這裡設置定時更新數據的邏輯
    const timer = setInterval(() => {
      // 示例：更新數據，確保生成新的配置物件以觸發刷新
      setTableConfig({ ...initConfig });
    }, 60000); // 每分鐘更新一次

    return () => clearInterval(timer);
  }, []);

  // 點擊處理函數
  const handleClick = (data) => {
    console.log("點擊的行數據:", data);
    // 在這裡處理點擊事件，如顯示詳情等
  };

  // 自定義樣式
  const style = {
    width,
    height,
    border: "1px solid #114886",
    borderRadius: "4px",
    background: "rgba(4, 21, 46, 0.7)",
    boxShadow: "0 0 10px rgba(0, 140, 255, 0.3)",
  };

  // 在配置加載完成前顯示加載狀態
  if (!tableConfig) {
    return <div style={style}>載入中...</div>;
  }

  return (
    <ScrollBoard config={tableConfig} style={style} onClick={handleClick} />
  );
};

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
            color: "#F2285F",
            columns: [1, 2, 3, 4, 5, 6],
          },
          warning: {
            condition: createDateCondition("expiryDate", 7, "before"),
            color: "#FFAA00",
            columns: [1, 2, 3, 4, 5, 6],
          },
          lowStock: {
            condition: createColorCondition("quantity", 0, 3000),
            color: "#FF6B6B",
            columns: [1, 2, 3, 4, 5, 6],
          },
        }}
      />
    </div>
  );
}

export default DailyProductionDashboard;
