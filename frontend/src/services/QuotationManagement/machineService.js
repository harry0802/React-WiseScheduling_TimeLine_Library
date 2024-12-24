import { API_ENDPOINTS } from "./quotationApi";

export const createMachineScope = () => {
  let machines = [];
  let machineOptions = [];
  let areaOptions = [];

  return {
    async getMachinesByArea() {
      if (!areaOptions.length) {
        const response = await fetch(API_ENDPOINTS.MACHINE_LIST);
        const { data } = await response.json();
        machines = data;

        const areaMap = new Map();
        data?.forEach((machine) => {
          if (!areaMap.has(machine.productionArea)) {
            areaMap.set(machine.productionArea, {
              id: machine.id,
              value: machine.productionArea,
              label: machine.productionArea,
            });
          }
        });
        areaOptions = Array.from(areaMap.values());
      }
      return areaOptions;
    },

    async getMachinesByMachineSN(areaFilter) {
      if (!machines.length) {
        await this.getMachinesByArea();
      }
      const targetArea = areaOptions.find((m) => m.value === areaFilter)?.value;
      if (!targetArea) return [];

      machineOptions = machines
        .filter((machine) => machine.productionArea === targetArea)
        .map(({ id, machineSN }) => ({
          id,
          value: machineSN,
          label: machineSN,
        }));
      return machineOptions;
    },

    async getMachineById(machineSN) {
      try {
        const machine = machineOptions.find((m) => m.value === machineSN);
        if (!machine) return null;
        const response = await fetch(
          `${API_ENDPOINTS.MACHINE_DETAIL}/?id=${machine.id}`
        );
        const { data } = await response.json();
        return data?.[0] || null;
      } catch (error) {
        console.error("取得機台詳細資訊失敗:", error);
        throw error;
      }
    },
  };
};
