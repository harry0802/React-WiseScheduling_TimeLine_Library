/**
 * @file DialogManager.js
 * @description 對話框管理器，使用單例模式和事件總線管理所有對話框
 * @version 1.1.0
 */

// 創建事件總線
class EventBus {
  constructor() {
    this.listeners = {};
  }

  // 監聽事件
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // 返回取消監聽的函數
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      );
    };
  }

  // 發送事件
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        callback(data);
      });
    }
  }
}

// 對話框管理器類 (單例模式)
class DialogManagerClass {
  constructor() {
    // 確保只有一個實例
    if (DialogManagerClass.instance) {
      return DialogManagerClass.instance;
    }
    DialogManagerClass.instance = this;

    // 初始化事件總線
    this.eventBus = new EventBus();

    // 初始化對話框狀態
    this.itemDialogState = {
      isOpen: false,
      mode: "view",
      item: null,
      groups: [],
    };

    this.deleteDialogState = {
      isOpen: false,
      itemId: null,
    };

    // 存儲 groups 數據
    this.groups = [];
  }

  // 設置 groups 數據
  setGroups(groups) {
    this.groups = groups || [];
  }

  // ===== 項目對話框方法 =====

  // 打開項目對話框
  openItemDialog(item, mode, groups) {
    // 使用傳入的 groups 或存儲的 groups
    const dialogGroups = groups || this.groups;

    this.itemDialogState = {
      isOpen: true,
      mode,
      item,
      groups: dialogGroups,
    };
    this.eventBus.emit("itemDialog:update", this.itemDialogState);
  }

  // 關閉項目對話框
  closeItemDialog() {
    this.itemDialogState = {
      ...this.itemDialogState,
      isOpen: false,
    };
    this.eventBus.emit("itemDialog:update", this.itemDialogState);
  }

  // 監聽項目對話框狀態變化
  onItemDialogChange(callback) {
    return this.eventBus.on("itemDialog:update", callback);
  }

  // 觸發保存事件
  saveItem(item) {
    this.eventBus.emit("itemDialog:save", item);
  }

  // 監聽保存事件
  onSaveItem(callback) {
    return this.eventBus.on("itemDialog:save", callback);
  }

  // ===== 刪除對話框方法 =====

  // 打開刪除對話框
  openDeleteDialog(itemId) {
    this.deleteDialogState = {
      isOpen: true,
      itemId,
    };
    this.eventBus.emit("deleteDialog:update", this.deleteDialogState);
  }

  // 關閉刪除對話框
  closeDeleteDialog() {
    this.deleteDialogState = {
      ...this.deleteDialogState,
      isOpen: false,
    };
    this.eventBus.emit("deleteDialog:update", this.deleteDialogState);
  }

  // 監聽刪除對話框狀態變化
  onDeleteDialogChange(callback) {
    return this.eventBus.on("deleteDialog:update", callback);
  }

  // 觸發刪除事件
  confirmDelete() {
    this.eventBus.emit("deleteDialog:confirm", this.deleteDialogState.itemId);
    this.closeDeleteDialog();
  }

  // 監聽刪除確認事件
  onConfirmDelete(callback) {
    return this.eventBus.on("deleteDialog:confirm", callback);
  }
}

// 創建並導出單例
export const DialogManager = new DialogManagerClass();
