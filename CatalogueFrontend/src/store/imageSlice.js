import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primaryImage: "",
  secondaryImages: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    changePrimary: (state, action) => {
      state.primaryImage = action.payload.primaryImage;
    },
    addSecondaryImage: (state, action) => {
      state.secondaryImages = [
        ...state.secondaryImages,
        ...action.payload.images,
      ];
    },
    removeSecondaryImage: (state, action) => {
      state.secondaryImages = state.secondaryImages.filter(
        (img) => img !== action.payload.image
      );
    },
  },
});

export default imageSlice.reducer;
export const { changePrimary, addSecondaryImage, removeSecondaryImage } =
  imageSlice.actions;
