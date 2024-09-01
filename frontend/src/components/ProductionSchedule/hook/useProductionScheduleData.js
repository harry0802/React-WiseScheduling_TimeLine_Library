import { useState, useEffect } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import { TZ } from "../../config/config";
import { useGetProductionScheduleQuery } from "../../../store/api/productionScheduleApi";

export function useProductionScheduleData(queryParams) {
  const [dataSource, setDataSource] = useState([]);
  const [totalCurrent, setTotalCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isSuccess, refetch } =
    useGetProductionScheduleQuery(queryParams);

  useEffect(() => {
    if (isSuccess) {
      setLoading(true);

      const { data: fetchedData, meta } = data;
      setTotalCurrent(meta.total_count);

      const processedData = fetchedData.map((item) => {
        let newItem = { ...item };

        // 计算 hourlyCapacity
        if (item.moldingSecond && item.moldCavity) {
          newItem.hourlyCapacity = Math.floor(
            (3600 / item.moldingSecond) * item.moldCavity
          );
        }

        // 计算 dailyCapacity
        if (newItem.hourlyCapacity !== null && item.conversionRate !== null) {
          newItem.dailyCapacity = Math.floor(
            newItem.hourlyCapacity *
              item.dailyWorkingHours *
              item.conversionRate
          );
        }

        // 转换日期格式
        const dateKeys = [
          "workOrderDate",
          "planOnMachineDate",
          "planFinishDate",
          "actualOnMachineDate",
          "actualFinishDate",
        ];

        dateKeys.forEach((key) => {
          newItem[key] = item[key]
            ? dayjs(item[key]).tz(TZ).format("YYYY-MM-DD")
            : "";
        });

        return newItem;
      });

      setDataSource(processedData);
      setLoading(false);
    }
  }, [isSuccess, data]);

  return {
    dataSource,
    setDataSource,
    totalCurrent,
    loading,
    isLoading,
    refetch,
  };
}
