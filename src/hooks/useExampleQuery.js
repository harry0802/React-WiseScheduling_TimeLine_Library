import { useQuery } from "@tanstack/react-query";

// 這是一個模擬的 API 請求函數
const fetchData = async () => {
  // 在實際應用中，這裡會是真正的 API 請求
  // 例如：return fetch('https://api.example.com/data').then(res => res.json())

  // 這裡我們只是模擬 API 請求，延遲 1 秒後返回數據
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, name: "項目 1", status: "進行中" },
          { id: 2, name: "項目 2", status: "已完成" },
          { id: 3, name: "項目 3", status: "計劃中" },
        ],
      });
    }, 1000);
  });
};

// 自定義 Query Hook
export default function useExampleQuery() {
  return useQuery({
    queryKey: ["exampleData"],
    queryFn: fetchData,
  });
}
