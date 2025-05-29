/**
 * @file DialogManager.js
 * @description 對話框管理器，使用函數式編程和閉包模式管理所有對話框
 * @version 3.0.0 - 增強型對話框支持
 */

//! =============== 1. 事件系統 ===============
/**
 * @function createEventSystem
 * @description 創建事件系統 - 實現發布-訂閱模式，允許組件間鬆散耦合的通信
 * @returns {Object} 事件系統方法
 */
const createEventSystem = () => {
  // 🧠 使用閉包存儲所有事件監聽器，保持數據私有性
  const listeners = {};

  /**
   * 監聽事件
   * @param {string} event - 事件名稱
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  const on = (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);

    // ✨ 返回取消監聽的函數，提供清理機制避免內存洩漏
    return () => {
      listeners[event] = listeners[event].filter(
        (listener) => listener !== callback
      );
    };
  };

  /**
   * 發送事件
   * @param {string} event - 事件名稱
   * @param {*} data - 事件數據
   */
  const emit = (event, data) => {
    // 💡 先檢查監聽器是否存在，避免不必要的處理
    if (listeners[event]) {
      // 遍歷所有監聽此事件的回調函數並執行
      listeners[event].forEach((callback) => {
        callback(data);
      });
    }
  };

  // 僅暴露必要的公共方法，保持內部實現細節私有
  return { on, emit };
};

//! =============== 2. 對話框管理器 ===============
/**
 * @function createDialogManager
 * @description 創建對話框管理器 - 統一管理所有對話框的狀態和行為
 * @returns {Object} 對話框管理方法
 */
const createDialogManager = () => {
  // 創建事件系統實例，用於對話框狀態的發布和訂閱
  const eventSystem = createEventSystem();

  // 🧠 初始化對話框狀態 - 使用可變狀態而非 useState，因為這是一個服務而非組件
  let itemDialogState = {
    isOpen: false, // 對話框是否開啟
    mode: "view", // 對話框模式：view/edit/add
    item: null, // 當前操作的項目數據
    groups: [], // 組數據（用於下拉選擇）
  };

  let deleteDialogState = {
    isOpen: false, // 刪除確認對話框是否開啟
    itemId: null, // 要刪除的項目ID
  };

  // 存儲全局 groups 數據，用於所有對話框共享
  let groups = [];

  //*** 公共方法 ***//

  /**
   * 設置 groups 數據
   * @param {Array} newGroups - 組數據
   */
  const setGroups = (newGroups) => {
    // 💡 提供默認值，增強健壯性
    groups = newGroups || [];
  };

  //*** 項目對話框方法 ***//

  /**
   * 打開項目對話框
   * @param {Object} item - 項目資料
   * @param {string} mode - 模式（view/edit/add）
   * @param {Array} [dialogGroups] - 組數據（可選）
   */
  const openItemDialog = (item, mode, dialogGroups) => {
    // 🧠 使用傳入的 groups 或存儲的 groups，提供靈活性
    const groupsToUse = dialogGroups || groups;

    // 更新對話框狀態
    itemDialogState = {
      isOpen: true,
      mode,
      item,
      groups: groupsToUse,
    };

    // ✨ 通知所有訂閱者狀態已更新
    eventSystem.emit("itemDialog:update", itemDialogState);
  };

  /**
   * 關閉項目對話框
   */
  const closeItemDialog = () => {
    // 保留其他狀態，僅變更 isOpen 為 false
    itemDialogState = {
      ...itemDialogState,
      isOpen: false,
    };
    eventSystem.emit("itemDialog:update", itemDialogState);
  };

  /**
   * 監聽項目對話框狀態變化
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  const onItemDialogChange = (callback) => {
    // 💡 使用事件系統的訂閱機制，返回取消訂閱函數
    return eventSystem.on("itemDialog:update", callback);
  };

  /**
   * 觸發保存事件
   * @param {Object} item - 要保存的項目
   */
  const saveItem = (item) => {
    // 這裡直接傳遞 item 物件，在 useTimelineDialogs 中會處理格式轉換
    // ✨ 通過事件系統傳遞數據，實現跨組件通信
    eventSystem.emit("itemDialog:save", item);
  };

  /**
   * 監聽保存事件
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  const onSaveItem = (callback) => {
    return eventSystem.on("itemDialog:save", callback);
  };

  //*** 刪除對話框方法 ***//

  /**
   * 打開刪除對話框
   * @param {string} itemId - 項目ID
   */
  const openDeleteDialog = (itemId) => {
    deleteDialogState = {
      isOpen: true,
      itemId,
    };
    eventSystem.emit("deleteDialog:update", deleteDialogState);
  };

  /**
   * 關閉刪除對話框
   */
  const closeDeleteDialog = () => {
    deleteDialogState = {
      ...deleteDialogState,
      isOpen: false,
    };
    eventSystem.emit("deleteDialog:update", deleteDialogState);
  };

  /**
   * 監聽刪除對話框狀態變化
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  const onDeleteDialogChange = (callback) => {
    return eventSystem.on("deleteDialog:update", callback);
  };

  /**
   * 觸發刪除確認事件
   * 當用戶確認刪除時調用，發出確認事件並自動關閉對話框
   */
  const confirmDelete = () => {
    // 🧠 觸發刪除事件，同時傳遞要刪除的項目ID
    eventSystem.emit("deleteDialog:confirm", deleteDialogState.itemId); // ✨ 新增：發出刪除確認事件
    // 刪除後自動關閉對話框
    closeDeleteDialog();
    closeItemDialog(); // ✨ 新增：同時關閉項目對話框
  };
  /**
   * 監聽刪除確認事件
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  const onConfirmDelete = (callback) => {
    return eventSystem.on("deleteDialog:confirm", callback);
  };

  // 返回對話框管理方法 - 僅暴露必要的公共API
  return {
    // 公共方法
    setGroups,

    // 項目對話框方法
    openItemDialog,
    closeItemDialog,
    onItemDialogChange,
    saveItem,
    onSaveItem,

    // 刪除對話框方法
    openDeleteDialog,
    closeDeleteDialog,
    onDeleteDialogChange,
    confirmDelete,
    onConfirmDelete,
  };
};

//! =============== 3. 單例實現 ===============
/**
 * 使用 IIFE 建立單例 - 確保整個應用中只有一個對話框管理器實例
 * 這種方式避免了多個實例導致的狀態不一致問題
 * @type {Object} 單例對話框管理器
 */
export const DialogManager = (() => {
  // 🧠 使用閉包保持單例引用，確保私有性
  let instance;

  /**
   * 獲取或創建單例 - 延遲初始化模式
   * @returns {Object} 對話框管理器實例
   */
  const getInstance = () => {
    // 💡 僅在首次調用時創建實例，之後返回已存在的實例
    if (!instance) {
      instance = createDialogManager();
    }
    return instance;
  };

  // 初始化並返回單例
  return getInstance();
})();

// 💡 允許直接導入功能方法 - 支持樹搖和更好的代碼提示
// 這種方式增強了靈活性，可以只導入需要的功能而非整個對象
export const {
  setGroups,
  openItemDialog,
  closeItemDialog,
  onItemDialogChange,
  saveItem,
  onSaveItem,
  openDeleteDialog,
  closeDeleteDialog,
  onDeleteDialogChange,
  confirmDelete,
  onConfirmDelete,
} = DialogManager;

/**
 * 說明：本模組使用函數式編程風格實現了對話框管理系統，
 * 功能邏輯分為三個主要部分：
 *
 * 1. 事件系統（EventSystem）：
 *    - 實現發布-訂閱模式
 *    - 提供事件註冊和觸發機制
 *    - 支持取消訂閱功能，避免內存洩漏
 *
 * 2. 對話框管理器（DialogManager）：
 *    - 使用閉包封裝狀態
 *    - 提供統一的對話框操作API
 *    - 將界面組件與業務邏輯分離
 *
 * 3. 單例模式：
 *    - 確保整個應用中只有一個管理器實例
 *    - 使用IIFE（立即執行函數表達式）實現
 *    - 支持延遲初始化，節省資源
 *
 * 這種設計模式優勢：
 * - 降低模組間耦合度，實現關注點分離
 * - 統一管理對話框狀態，避免多點管理的混亂
 * - 支持更細粒度的導入，提高打包效率
 * - 遵循函數式編程原則，更容易測試和維護
 */
