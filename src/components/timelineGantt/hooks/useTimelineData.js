import { useRef, useMemo } from "react";
import { DataSet } from "vis-data/standalone";

export const useTimelineData = () => {
  const itemsDataRef = useRef(null);

  const generateItems = () => {
    const items = [];
    for (let j = 1; j <= 4; j++) {
      let date = new Date();
      for (let i = 0; i < 5; i++) {
        const start = new Date(date.getTime() + 4 * i * 60 * 60 * 1000);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        items.push({
          id: `${j}-${i}`,
          group: j,
          start,
          end,
          content: `訂單 ${j}-${i}`,
          className: "custom-item",
        });
      }
    }
    return new DataSet(items);
  };

  const groups = useMemo(
    () =>
      new DataSet([
        { id: 1, content: "Truck 1" },
        { id: 2, content: "Truck 2" },
        { id: 3, content: "Truck 3" },
        { id: 4, content: "Truck 4" },
      ]),
    []
  );

  if (!itemsDataRef.current) {
    itemsDataRef.current = generateItems();
  }

  return { itemsDataRef, groups };
};
