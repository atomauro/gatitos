import { Gatito } from "@/models/Gatito/Gatito";
import { UserInformation } from "@/models/UserInformation/UserInformation";
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
      // Verificamos si el gatito ya está en la lista
      const existingIndex = state.gatitosFavoriteList.findIndex(
        (item) => item.id === payload.id
      );

      // Si el gatito no existe en la lista, lo agregamos
      if (existingIndex === -1) {
        state.gatitosFavoriteList.push(payload);
      } else {
        // Si el gatito ya existe en la lista, lo eliminamos
        state.gatitosFavoriteList.splice(existingIndex, 1);
      }
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
