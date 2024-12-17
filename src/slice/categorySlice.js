import { createSlice } from "@reduxjs/toolkit";

// Initial state for categories
const initialState = {
  categories: [],
};

// Category slice with add and remove reducers
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Set all categories
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // Add a single category (if you need this functionality)
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    // Remove a category
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id
      );
    },
  },
});

// Export the actions for use in your components
export const { setCategories, addCategory, removeCategory } = categorySlice.actions;
export default categorySlice;
