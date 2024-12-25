import { useState, useEffect } from "react";
import { useGetProductionScheduleQuery } from "../../../store/api/productionScheduleApi";
import { convertDatesToCustomFormat } from "../utils/excelUtils";

export function useProductionScheduleData(queryParams) {
  const [dataSource, setDataSource] = useState([]);
  const [totalCurrent, setTotalCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isSuccess, refetch } = useGetProductionScheduleQuery(
    queryParams,
    { skip: !queryParams }
  );
  useEffect(() => {
    if (isSuccess) {
      setLoading(true);
      const { data: fetchedData, meta } = data;
      setTotalCurrent(meta.total_count);

      const processedData = fetchedData.map((item) => {
        let newItem = { ...item };

        // calc hourlyCapacity
        if (item.moldingSecond && item.moldCavity) {
          newItem.hourlyCapacity = Math.floor(
            (3600 / item.moldingSecond) * item.moldCavity
          );
        }

        // calc dailyCapacity
        if (newItem.hourlyCapacity !== null && item.conversionRate !== null) {
          newItem.dailyCapacity = Math.floor(
            newItem.hourlyCapacity *
              item.dailyWorkingHours *
              item.conversionRate
          );
        }

        // convert date format
        newItem = convertDatesToCustomFormat(newItem, "YYYY-MM-DD");
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
