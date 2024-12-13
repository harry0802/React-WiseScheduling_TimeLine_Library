import { API_ENDPOINTS } from "./quotationApi";
import { createSharedRequest } from "./sharedRequest";

export const createPackagingScope = () => {
  let currentPackaging = null;

  // 使用共享請求獲取包材列表
  const packagingsRequest = createSharedRequest("packagings", async () => {
    const response = await fetch(API_ENDPOINTS.MATERIAL_PACKAGINGS);
    const result = await response.json();
    return result.data.map((item) => ({
      value: item.materialName,
      label: item.materialName,
      materialSN: item.materialSN,
      unitPrice: item.unitPrice,
      unit: item.unit,
    }));
  });

  // 特殊處理包材單價的緩存
  const packagingPriceCache = new Map();
  const getPackagingPrice = async (packaging) => {
    if (!packaging) return null;

    const cacheKey = `${packaging.label}_${packaging.materialSN}`;
    if (packagingPriceCache.has(cacheKey)) {
      return packagingPriceCache.get(cacheKey);
    }

    const response = await fetch(
      `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${packaging.label}&materialSN=${packaging.materialSN}`
    );
    const result = await response.json();
    const price = result.status ? result.data : null;

    packagingPriceCache.set(cacheKey, price);
    setTimeout(() => packagingPriceCache.delete(cacheKey), 300000);

    return price;
  };

  return {
    getPackagings: () => packagingsRequest(),

    async setSelectedPackaging(packagingName) {
      if (!packagingName) return null;

      const packagings = await packagingsRequest();
      currentPackaging = packagings.find(
        (p) => p.label === packagingName.label
      );

      if (!currentPackaging) return null;
      const unitPrice = await getPackagingPrice(currentPackaging);

      return {
        packagingSN: currentPackaging.materialSN,
        unit: currentPackaging.unit,
        unitPrice,
      };
    },

    getCurrentPackaging() {
      return currentPackaging;
    },

    getPackagingPrice,

    async getDependentValues(packagingName) {
      if (!packagingName) return null;
      const result = await this.setSelectedPackaging(packagingName);
      if (!result) return null;

      return {
        materialName: packagingName.label,
        materialSN: result.packagingSN || "",
        unitPrice: result.unitPrice,
        packagingType: "包材",
      };
    },
  };
};
