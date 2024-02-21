import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import imageSlice from "./imageSlice";

const saveWishlistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const { wishlist } = store.getState();
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  return result;
};

export const store = configureStore({
  reducer: {
    wishlist: wishListSlice,
    filter: filterSlice,
    auth: authSlice,
    image: imageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveWishlistMiddleware),
});
