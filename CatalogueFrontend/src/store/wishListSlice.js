import { createSlice } from "@reduxjs/toolkit";

const wishList = JSON.parse(localStorage.getItem("wishlist"));
let initialState;
if (wishList) {
  initialState = wishList;
} else {
  initialState = {
    list: [],
  };
}

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToList: (state, action) => {
      console.log(action);
      state.list.push(action.payload.id);
    },
    removeFromList: (state, action) => {
      state.list = state.list.filter(
        (product) => product !== action.payload.id
      );
    },
    clearList: (state) => {
      state.list.length = 0;
    },
  },
});

export const { addToList, removeFromList } = wishListSlice.actions;
export default wishListSlice.reducer;
