//! =============== 1. 設定與常量 ===============
//* 所有狀態相關的顏色與名稱配置，使用 OKLCH 顏色空間以獲得更好的感知均勻性

/**
 * @constant STATUS_COLORS
 * @description 一般狀態的顏色映射表 (使用 OKLCH 色彩空間)
 * @type {Object.<string, string>}
 */
export const STATUS_COLORS = {
    NORMAL: "oklch(1 0 0)", // 正常狀態 - 白色
    WARNING: "oklch(0.8 0.18 75)", // 警告狀態 - 黃色
    EXPIRED: "oklch(0.63 0.26 25)", // 過期狀態 - 紅色
    LOW_STOCK: "oklch(0.7 0.2 30)", // 低庫存狀態 - 粉紅色
};

/**
 * @constant STATUS_NAMES
 * @description 一般狀態的顯示名稱映射表
 * @type {Object.<string, string>}
 */
export const STATUS_NAMES = {
    NORMAL: "正常狀態",
    WARNING: "即將過期",
    EXPIRED: "已經過期",
    LOW_STOCK: "低庫存",
};

/**
 * @constant DEVICE_STATUS_COLORS
 * @description 設備狀態的顏色映射表，擴展自一般狀態顏色
 * @type {Object.<string, string>}
 *
 * @notes
 * - 使用 OKLCH 色彩空間提供更好的感知均勻性和更廣的色域
 * - 色彩選擇考慮了無障礙設計的對比度要求和易識別性
 * - 格式: oklch(亮度 色度 色相)
 */
export const DEVICE_STATUS_COLORS = {
    ...STATUS_COLORS,
    NORMAL_PRODUCTION: "oklch(0.8 0.2 145)", // 鮮亮綠色，代表正常生產
    TRIAL_MODE: "oklch(0.7 0.2 220)", // 亮藍色，代表試模狀態
    ADJUSTMENT_MODE: "oklch(0.8 0.18 85)", // 明亮橙色，代表調機狀態
    SHUTDOWN_STATE: "oklch(0.55 0.03 250)", // 金屬灰藍色，代表關機
    ERROR_STATE: "oklch(0.65 0.27 25)", // 鮮明紅色，代表錯誤
};

/**
 * @constant DEVICE_STATUS_NAMES
 * @description 設備狀態的顯示名稱映射表
 * @type {Object.<string, string>}
 */
export const DEVICE_STATUS_NAMES = {
    NORMAL_PRODUCTION: "正常量產",
    TRIAL_MODE: "試模狀態",
    ADJUSTMENT_MODE: "調機狀態",
    SHUTDOWN_STATE: "關機狀態",
    ERROR_STATE: "異常狀態",
};

// export const DEVICE_STATUS_COLORS = {
//   ...STATUS_COLORS,
//   NORMAL_PRODUCTION: "#04B30A",
//   TRIAL_MODE: "#008DCE",
//   ADJUSTMENT_MODE: "#F39838",
//   SHUTDOWN_STATE: "#9F9F9F",
//   ERROR_STATE: "#F00",
// };

/**
 * 將 OKLCH 格式的顏色轉換為十六進制色碼
 * @param {string} oklchColor - OKLCH 格式的顏色字串，例如 "oklch(0.8 0.2 145)"
 * @returns {string} 十六進制色碼，例如 "#59de65"
 */
export function oklchToHex(oklchColor) {
    // 簡單的映射表
    const colorMap = {
        "oklch(0.8 0.2 145)": "#59de65", // 鮮亮綠色 (NORMAL_PRODUCTION)
        "oklch(0.7 0.2 220)": "#00b2dd", // 亮藍色 (TRIAL_MODE)
        "oklch(0.8 0.18 85)": "#f2b200", // 明亮橙色 (ADJUSTMENT_MODE)
        "oklch(0.55 0.03 250)": "#657383", // 金屬灰藍色 (SHUTDOWN_STATE)
        "oklch(0.65 0.27 25)": "#ff082f", // 鮮明紅色 (ERROR_STATE)
    };

    // 如果顏色在映射表中，直接返回對應的十六進制色碼
    if (colorMap[oklchColor]) {
        return colorMap[oklchColor];
    }

    // 對於未知的 OKLCH 顏色，返回默認值
    return "#808080"; // 預設灰色
}