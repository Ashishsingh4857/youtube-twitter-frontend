import { configureStore } from "@reduxjs/toolkit";
//import slices
import authSliceReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
