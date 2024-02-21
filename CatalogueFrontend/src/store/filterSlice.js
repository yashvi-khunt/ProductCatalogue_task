import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  range: 5000,
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
      state.range = action.payload.range;
    },
    changeText: (state, action) => {
      state.text = action.payload;
    },
    clearFilters: (state) => {
      (state.tags.length = 0), (state.range = 5000), (state.text = "");
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
