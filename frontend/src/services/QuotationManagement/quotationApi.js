// 報價系統共用 API 端點

import { API_BASE } from "../../store/api/apiConfig";

//* API 端點配置
export const API_ENDPOINTS = {
  MATERIAL_UNIT: `${API_BASE}option/materialUnit`,
  PACKAGING_UNIT: `${API_BASE}option/packagingUnit`,
  MACHINE_LIST: `${API_BASE}machine/list`,
  MACHINE_DETAIL: `${API_BASE}machine`,
  MATERIAL_PACKAGINGS: `${API_BASE}material/packagings`,
  MATERIAL_MATERIALS: `${API_BASE}material/materials`,
  MATERIAL_MATERIALUNITPRICE: `${API_BASE}material/materialUnitPrice`,
  MATERIAL_OPTION: `${API_BASE}materialOption/`,
};
