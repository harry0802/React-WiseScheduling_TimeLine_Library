import { API_ENDPOINTS } from "./quotationApi";
import { createSharedRequest } from "./sharedRequest";

export const createMaterialScope = () => {
  const materialsRequest = createSharedRequest("materials", async () => {
    const response = await fetch(API_ENDPOINTS.MATERIAL_MATERIALS);
    const result = await response.json();
    return result.data.map((item) => ({
      value: item.materialName,
      label: item.materialName,
      materialSN: item.materialSN,
      unitPrice: item.unitPrice,
      materialOptionId: item.materialOptionId,
      unit: item.unit,
    }));
  });

  const priceRequestMap = new Map();

  const getMaterialPrice = async (material) => {
    if (!material) return null;

    const cacheKey = `material_price_${material.label}_${material.materialSN}`;

    if (!priceRequestMap.has(cacheKey)) {
      priceRequestMap.set(
        cacheKey,
        createSharedRequest(cacheKey, async () => {
          const response = await fetch(
            `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${material.label}&materialSN=${material.materialSN}`
          );
          const result = await response.json();
          return result.status ? result.data : null;
        })
      );
    }

    return priceRequestMap.get(cacheKey)();
  };

  return {
    getMaterials: () => materialsRequest(),
    getMaterialPrice,

    async getDependentValues(materialName) {
      if (!materialName) return null;
      const materials = await materialsRequest();
      const material = materials.find((m) => m.label === materialName.label);

      if (!material) return null;
      const unitPrice = await getMaterialPrice(material);

      return {
        materialName: materialName.label,
        materialSN: material.materialSN,
        unitPrice,
        materialOptionId: material.materialOptionId,
      };
    },
  };
};
