/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gatitosConfigSlice from "./gatitosConfigSlice";
import userConfigSlice from "./userConfigSlice";

// Reducer root
const rootReducer = combineReducers({
  gatitosConfig: gatitosConfigSlice,
  userConfig: userConfigSlice,
});

// Función para obtener el estado inicial desde el almacenamiento local del navegador
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Función para guardar el estado en el almacenamiento local del navegador
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // ignore write errors
  }
};

// Creación del store con estado inicial y suscripción para guardar el estado
const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;

export type IRootState = ReturnType<typeof rootReducer>;
