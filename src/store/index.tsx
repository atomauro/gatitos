import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gatitosConfigSlice from "./gatitosConfigSlice";
import userConfigSlice from "./userConfigSlice";

const rootReducer = combineReducers({
  gatitosConfig: gatitosConfigSlice,
  userConfig: userConfigSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
