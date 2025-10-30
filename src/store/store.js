import { configureStore } from "@reduxjs/toolkit";
//import slices
import authSliceReducer from "./slices/authSlice.js";
import globalSliceReducer from "./slices/globalSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    global: globalSliceReducer,
  },
});

export default store;
