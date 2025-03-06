/**
 * @file index.js
 * @description 機台管理模組入口，匯出所有相關元件
 */

// 主要元件
export { default as MachineBoard } from "./board/MachineBoard";
export { default as StatusManager } from "./manager/StatusManager";

// 控制元件
export { default as StatusSlider } from "./controls/StatusSlider";
export { default as ReasonSelector } from "./controls/ReasonSelector";
export { default as ProductInput } from "./controls/ProductInput";

// 表單元件 (如需匯出)
export { default as SetupForm } from "./manager/forms/SetupForm";
export { default as IdleForm } from "./manager/forms/IdleForm";
export { default as StoppedForm } from "./manager/forms/StoppedForm";
export { default as TestingForm } from "./manager/forms/TestingForm";
