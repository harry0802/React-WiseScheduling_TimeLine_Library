// 他們是共用的 state 與 actions 我之後直接在 zustand slice 引用即可
// 這裡是工廠報價與業務邏輯 分別有 工廠報價 與 業務報價

//  1. 他們需要紀錄資料 由api 提供 提供 crud 功能

//  2. 需要紀錄其他組件已經算完的總小計金額 用於當作 利潤分析的小計(未含管銷研)

//  3. 需要重置資料 與 總小計金額

//  4. 需要辨別 業務報價 與 工廠報價

// 我也需要紀錄 1.不含營銷的成本小計 2.含營銷的成本小計 3. 稅成本 4.實際報價

export const initialState = {
  // 基礎數據
  data: [],

  // 成本與報價相關
  costAndQuotation: {
    base: 0, // 不含營銷的成本小計
    withMarketing: 0, // 含營銷的成本小計
    tax: 0, // 稅成本
    amount: 0, // 其他組件算完的總小計金額(未含管銷研)
    actual: 0, // 實際報價
  },
};

export const actions = (set) => ({
  // 數據 CRUD
  setData: (data) => set({ data }),
  addData: (data) => set((state) => ({ data: [...state.data, data] })),
  editData: (id, data) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    })),
  deleteData: (id) =>
    set((state) => ({ data: state.data.filter((item) => item.id !== id) })),

  // 成本與報價設置
  setCostAndQuotation: (values) =>
    set((state) => ({
      costAndQuotation: { ...state.costAndQuotation, ...values },
    })),

  // 重置功能
  reset: () => set(initialState),
  resetData: () => set({ data: [] }),
  resetCostAndQuotation: () =>
    set({
      costAndQuotation: {
        base: 0,
        withMarketing: 0,
        tax: 0,
        amount: 0,
        actual: 0,
      },
    }),
});
