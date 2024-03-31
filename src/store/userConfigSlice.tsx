import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  gatitosFavoriteList: [],
};

const userConfigSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    resetUser(state) {
      console.log("RESETING");
      state.user = initialState.user;
    },
    setGatitosFavorites(state, { payload }) {
      state.gatitosFavoriteList = payload;
    },
    resetAllGatitosFavorites(state) {
      state.gatitosFavoriteList = [];
    },
  },
});

export const {
  setUser,
  resetUser,
  setGatitosFavorites,
  resetAllGatitosFavorites,
} = userConfigSlice.actions;

export default userConfigSlice.reducer;
