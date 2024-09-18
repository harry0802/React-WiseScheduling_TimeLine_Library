import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  account: "",
  password: "",
  isAuthenticated: false,
  userType: null,
};

const actions = (set) => ({
  setAccount: (account) => set({ account }),
  setPassword: (password) => set({ password }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserType: (userType) => set({ userType }),
  login: (account, password, userType) =>
    set({
      account,
      password,
      isAuthenticated: true,
      userType,
    }),
  logout: () => set(initialState),
});

const useQmsStore = create(
  persist(
    (set) => ({
      ...initialState,
      ...actions(set),
    }),
    {
      name: "qms-storage",
      storage: sessionStorage,
    }
  )
);

export { useQmsStore };
