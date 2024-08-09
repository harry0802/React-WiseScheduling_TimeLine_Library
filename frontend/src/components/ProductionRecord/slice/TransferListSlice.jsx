import { create } from "zustand";

/**
 * Zustand store for managing transfer list state.
 */
export const useTransferListStore = create((set, get) => ({
  left: [],
  right: [],
  checked: [],

  /**
   * Toggles the checked state of a given value.
   * @param {number} value - The value to toggle in the checked list.
   */
  toggle: (value) =>
    set((state) => {
      const currentIndex = state.checked.indexOf(value);
      const newChecked = [...state.checked];
      ~currentIndex
        ? newChecked.splice(currentIndex, 1)
        : newChecked.push(value);
      return { checked: newChecked };
    }),

  /**
   * Toggles all items in the list.
   * @param {number[]} items - The items to toggle in the checked list.
   */
  toggleAll: (items) =>
    set((state) => {
      const { not, union } = state;
      if (state.checked.length === items.length) {
        return { checked: not(state.checked, items) };
      } else {
        return { checked: union(state.checked, items) };
      }
    }),

  /**
   * Moves checked items from the left list to the right list.
   */
  moveRight: () =>
    set((state) => {
      const { not } = state;
      return {
        left: not(state.left, state.checked),
        right: state.right.concat(state.checked),
        checked: not(state.checked, state.checked),
      };
    }),

  /**
   * Moves checked items from the right list to the left list.
   */
  moveLeft: () =>
    set((state) => {
      const { not, checked, right, left } = state;
      return {
        left: left.concat(checked),
        right: not(right, checked),
        checked: not(checked, checked),
      };
    }),

  /**
   * Initializes the store for the first time setup.
   * @param {number[]} leftData - The initial data for the left list.
   */
  initialize: (leftData) => set({ left: leftData, right: [], checked: [] }),

  /**
   * Initializes the store for editing, retaining the right list data.
   * @param {number[]} leftData - The initial data for the left list.
   * @param {number[]} rightData - The initial data for the right list.
   */
  initializeForEdit: (leftData, rightData) =>
    set({ left: leftData, right: rightData, checked: [] }),

  /**
   * Loads data from an API and initializes the state based on the mode.
   * @param {string} apiEndpoint - The API endpoint to fetch data from.
   * @param {"setup"|"edit"} mode - The mode of initialization, either "setup" or "edit".
   * @returns {Promise<void>} - A promise that resolves when the data has been loaded and the state initialized.
   */
  loadDataFromApi: async (apiEndpoint, mode = "setup") => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      if (mode === "setup") {
        set({ left: data.left || [], right: [], checked: [] });
      } else if (mode === "edit") {
        set({ left: data.left || [], right: data.right || [], checked: [] });
      }
    } catch (error) {
      console.error("Failed to load data from API", error);
    }
  },

  /**
   * Filters items in `a` that are not in `b`.
   * @param {number[]} a - The array to filter.
   * @param {number[]} b - The array to compare against.
   * @returns {number[]} - The filtered array.
   */
  not: (a, b) => a.filter((value) => !~b.indexOf(value)),
  /**
   * Creates a union of two arrays, excluding duplicates.
   * @param {number[]} a - The first array.
   * @param {number[]} b - The second array.
   * @returns {number[]} - The union of both arrays.
   */
  union: (a, b) => {
    const { not } = get();
    return [...a, ...not(b, a)];
  },

  intersection: (a, b) => a.filter((value) => ~b.indexOf(value)),
}));
