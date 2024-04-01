import { Gatito, UserInformation } from "@/models/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as UserInformation,
  gatitosFavoriteList: [] as Gatito[],
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
      state.gatitosFavoriteList = [...state.gatitosFavoriteList, ...payload];
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
