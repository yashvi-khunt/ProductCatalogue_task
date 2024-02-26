import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  minPrice: 0,
  maxPrice: 5000,
  text: "",
};

console.log(initialState);
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.tags.push(action.payload.tagId);
    },
    removeFilter: (state, action) => {
      state.tags = state.tags.filter(
        (product) => product !== action.payload.tagId
      );
    },
    changeRange: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    changeText: (state, action) => {
      state.text = action.payload;
    },
    clearFilters: (state) => {
      state.tags = [];
      state.minPrice = 0;
      state.maxPrice = 5000;
      state.text = "";
    },
  },
});

export default filterSlice.reducer;
export const {
  addFilter,
  removeFilter,
  clearFilters,
  changeRange,
  changeText,
} = filterSlice.actions;
