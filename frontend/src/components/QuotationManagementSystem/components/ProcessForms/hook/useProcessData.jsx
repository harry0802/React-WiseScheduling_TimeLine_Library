import { useState, useEffect } from "react";
import { processMappers, processService } from "../utils/processMappers";

//  TODO 這裡未來會是rtk的api
export const useProcessData = (categoryId, initialData = null) => {
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await processService.getProcessTypes();
      setTypes(processMappers.processTypes.toOptions(data));
    } catch (err) {
      setError(err);
      console.error("Failed to fetch process types:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubtypes = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await processService.getProcessSubtypes(categoryId);
      const mappedSubtypes = processMappers.processTypes.toSubtypeOptions(data);
      setSubtypes(mappedSubtypes);
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

  // 監聽 categoryId 變化加載子類型
  useEffect(() => {
    fetchSubtypes(categoryId);
  }, [categoryId]);

  return {
    types,
    subtypes,
    loading,
    error,
    fetchTypes,
    fetchSubtypes,
  };
};
