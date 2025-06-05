import { useState, useEffect } from "react";
import { useGetDailyProductionTasksQuery } from "../../../services/manufacturingApiSlice";
import { BorderBox } from "../../../styles/Content";
import { FlexFlow } from "../../../styles/Dataflow";
import DashBordrdMark from "../../../components/Marks/DashBordrdMark";
import { STATUS_COLORS, STATUS_NAMES } from "../../../configs/Color";
import { BaseCard } from "../../../components/DashboardCard";
import DailyProductionTasksDashboard from "../components/Dashboard/DailyProductionTasksDashboard";

const MockData = [
  {
    status: STATUS_NAMES.NORMAL,
    color: STATUS_COLORS.NORMAL,
  },
  {
    status: STATUS_NAMES.WARNING,
    color: STATUS_COLORS.WARNING,
  },
  {
    status: STATUS_NAMES.EXPIRED,
    color: STATUS_COLORS.EXPIRED,
  },
];

function DailyProductionTasks() {
  // 使用狀態鉤子控制錯誤信息顯示
  const [errorMessage, setErrorMessage] = useState("");

  // 🧪 測試直接 fetch mock 檔案
  useEffect(() => {
    const testFetch = async () => {
      try {
        console.log("🧪 測試直接 fetch mock 檔案...");
        const response = await fetch("/mock/DailyProductionTasksMock.json");
        console.log("📁 Response status:", response.status);
        console.log("📁 Response ok:", response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ 直接 fetch 成功，資料筆數:", data?.length);
          console.log("📊 前三筆資料:", data?.slice(0, 3));
        } else {
          console.error("❌ 直接 fetch 失敗:", response.statusText);
        }
      } catch (err) {
        console.error("💥 Fetch 錯誤:", err);
      }
    };

    testFetch();
  }, []);

  // 🔄 使用 RTK Query hook 替換 TanStack Query
  const {
    data: productionTasks,
    isLoading,
    isError,
    error,
  } = useGetDailyProductionTasksQuery();

  console.log("🔍 API 請求狀態:", {
    data: productionTasks,
    isLoading,
    isError,
    error: error?.data || error?.message || error,
    fullError: error,
  });

  // 渲染內容部分
  const renderContent = () => {
    // 處理錯誤狀態
    if (isError) {
      if (!errorMessage) {
        setErrorMessage(error?.message || "無法讀取每日生產任務資料");
      }
      return <div className="error-container">{errorMessage}</div>;
    }

    // 處理加載狀態
    if (isLoading) {
      return <div className="loading-container">載入中...</div>;
    }

    // 渲染儀表板
    return <DailyProductionTasksDashboard data={productionTasks} />;
  };

  return (
    <>
      <BorderBox>
        <BaseCard style={{ backgroundColor: "transparent" }}>
          <BaseCard.Header>
            <BaseCard.Title>
              <FlexFlow>
                <BaseCard.Title>本日生產任務</BaseCard.Title>
                <DashBordrdMark data={MockData} />
              </FlexFlow>
            </BaseCard.Title>
          </BaseCard.Header>
          <BaseCard.Content>{renderContent()}</BaseCard.Content>
        </BaseCard>
      </BorderBox>
    </>
  );
}

export default DailyProductionTasks;
