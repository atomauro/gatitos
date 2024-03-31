import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gatitosList: [],
};

const cardsConfigSlice = createSlice({
  name: "gatitos",
  initialState: initialState,
  reducers: {
    setGatitos(state, { payload }) {
      state.gatitosList = payload;
    },
    resetAllGatitos(state) {
      state.gatitosList = [];
    },
  },
});

export const { setGatitos, resetAllGatitos } = cardsConfigSlice.actions;

export default cardsConfigSlice.reducer;
