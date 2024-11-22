import { useState, useEffect } from "react";
import { processMappers, processService } from "../utils/processMappers";

//  todo 這裡未來會是rtk的api
export const useProcessData = () => {
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await processService.getProcessTypes();
      console.log("🚀 ~ fetchTypes ~ data:", data);

      setTypes(processMappers.processTypes.toOptions(data));
    } catch (err) {
      setError(err);
      console.error("Failed to fetch process types:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubtypes = async (categoryId) => {
    console.log("🚀 ~ fetchSubtypes ~ categoryId:", categoryId);
    if (!categoryId) {
      setSubtypes([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await processService.getProcessSubtypes(categoryId);
      setSubtypes(processMappers.processTypes.toSubtypeOptions(data));
    } catch (err) {
      setError(err);
      console.error("Failed to fetch process subtypes:", err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加載製程類型
  useEffect(() => {
    fetchTypes();
  }, []);

  return {
    types,
    subtypes,
    loading,
    error,
    fetchTypes,
    fetchSubtypes,
  };
};
