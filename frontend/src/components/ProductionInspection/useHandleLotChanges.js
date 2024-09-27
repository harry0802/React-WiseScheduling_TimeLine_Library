import { useLotStore } from "../../store/zustand/store";
import { useUpdateChildLotsMutation } from "../../store/api/productionReportApi";
import { useDebounce } from "react-use";
import { useCallback, useState } from "react";

export function useHandleLotChanges() {
  const lots = useLotStore((state) => state.lots);
  const [updateProductionReports] = useUpdateChildLotsMutation();
  const [lotChangeParams, setLotChangeParams] = useState(null);

  const handleLotChange = useCallback(
    async (pscheduleId, putawayId) => {
      try {
        const targetLot = lots.find((lot) => lot.id === pscheduleId);
        if (!targetLot) {
          console.log(`💣 No lot found with pscheduleId: ${pscheduleId}`);
          return;
        }

        const targetChild = targetLot.children?.find(
          (child) => child.id === putawayId
        );
        if (!targetChild) {
          console.log(
            `💣 No child lot found with putawayId: ${putawayId} in lot ${pscheduleId}`
          );
          return;
        }

        console.log("🔥🔥🔥 Updating child lot:", targetChild);
        const response = await updateProductionReports([targetChild]).unwrap();
        return response;
      } catch (error) {
        console.error("💣 Error updating child lot:", error.message);
        throw error;
      }
    },
    [lots, updateProductionReports]
  );

  const handleAllLotsSubmit = useCallback(async () => {
    try {
      const updatedLots = lots
        .flatMap((lot) => {
          return lot.children.map((child) => ({
            ...child,
            id: child.id || child.productionReport_id,
          }));
        })
        .at(-1);

      const response = await updateProductionReports([updatedLots]).unwrap();
      return response;
    } catch (error) {
      console.error("💣 Error updating all child lots:", error.message);
      throw error;
    }
  }, [lots, updateProductionReports]);

  useDebounce(
    () => {
      if (lotChangeParams) {
        handleLotChange(lotChangeParams.pscheduleId, lotChangeParams.putawayId);
      }
    },
    300,
    [lotChangeParams]
  );

  return {
    handleLotChange: (pscheduleId, putawayId) =>
      setLotChangeParams({ pscheduleId, putawayId }),
    handleAllLotsSubmit,
  };
}
