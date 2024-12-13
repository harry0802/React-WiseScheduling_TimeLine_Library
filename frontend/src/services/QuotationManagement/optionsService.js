import { cacheService } from "../cacheService";
import { API_ENDPOINTS } from "./quotationApi";

export const createOptionsScope = () => {
  const pendingRequests = {};

  const createCachedRequest = (cacheKey, fetchFn) => {
    const cached = cacheService.get(cacheKey);
    if (cached) return Promise.resolve(cached);

    if (pendingRequests[cacheKey]) {
      return pendingRequests[cacheKey];
    }

    const request = fetchFn()
      .then((result) => {
        cacheService.set(cacheKey, result);
        delete pendingRequests[cacheKey];
        return result;
      })
      .catch((error) => {
        delete pendingRequests[cacheKey];
        throw error;
      });

    pendingRequests[cacheKey] = request;
    return request;
  };

  return {
    // 取得通用單位
    async getCommonUnits() {
      return createCachedRequest("commonUnits", async () => {
        const response = await fetch(API_ENDPOINTS.MATERIAL_UNIT);
        const data = await response.json();
        return data?.data?.map((item) => ({
          id: item.id,
          value: item.name,
          label: `${item.name} (${item.schema})`,
        }));
      });
    },

    // 取得包裝類型
    async getPackagingTypes() {
      return createCachedRequest("packagingTypes", async () => {
        const response = await fetch(API_ENDPOINTS.PACKAGING_UNIT);
        const data = await response.json();
        return data?.data?.map((item) => ({
          id: item.id,
          value: item.name,
          label: `${item.name} (${item.schema})`,
        }));
      });
    },

    // 取得運費類型
    async getFreightTypes() {
      return createCachedRequest("freightTypes", async () => {
        const response = await fetch(API_ENDPOINTS.MACHINE_LIST);
        const { data } = await response.json();
        const areaMap = new Map();

        data?.forEach((machine) => {
          if (!areaMap.has(machine.productionArea)) {
            areaMap.set(machine.productionArea, {
              id: machine.id,
              value: machine.id,
              label: machine.productionArea,
            });
          }
        });

        return Array.from(areaMap.values());
      });
    },

    // 取得機台區域
    async getMachineAreas(areaFilter) {
      return createCachedRequest(`machineAreas_${areaFilter}`, async () => {
        const [detailResponse, listResponse] = await Promise.all([
          fetch(`${API_ENDPOINTS.MACHINE_DETAIL}/?id=${areaFilter}`),
          fetch(API_ENDPOINTS.MACHINE_LIST),
        ]);

        const [detailResult, listResult] = await Promise.all([
          detailResponse.json(),
          listResponse.json(),
        ]);

        if (!detailResult.status || !detailResult.data?.[0]) {
          throw new Error(detailResult.message || "獲取機台資訊失敗");
        }

        if (!listResult.status) {
          throw new Error(listResult.message || "獲取機台列表失敗");
        }

        const targetArea = detailResult.data[0].productionArea;
        return listResult.data
          .filter((machine) => machine.productionArea === targetArea)
          .map(({ id, machineSN, productionArea }) => ({
            id,
            value: machineSN,
            label: machineSN,
            productionArea,
          }));
      });
    },
    // 取得物料選項
    async getMaterialOptions() {
      return createCachedRequest("materialOptions", async () => {
        const response = await fetch(API_ENDPOINTS.MATERIAL_OPTION);
        const data = await response.json();
        return data?.data?.map((item) => ({
          id: item.id,
          value: item.id,
          label: item.materialType,
        }));
      });
    },
  };
};

export const optionsService = createOptionsScope();
