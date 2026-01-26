import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../../utils/LocalStorage"; // مسار ملف helpers

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: getFavoritesFromLocalStorage(),
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
        addFavoriteToLocalStorage(action.payload); // حدث localStorage
      }
    },
    removeFromFavorites: (state, action) => {
      const updated = state.filter((product) => product._id !== action.payload);
      removeFavoriteFromLocalStorage(action.payload); // حدث localStorage
      return updated;
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
