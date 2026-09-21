import { configureStore } from "@reduxjs/toolkit";
//import slices
import authSliceReducer from "./slices/authSlice.js";
import globalSliceReducer from "./slices/globalSlice.js";
import videoSliceReducer from "./slices/videoSlice.js";
import userSliceReducer from "./slices/userSlice.js";
import reactionSliceReducer from "./slices/reactionSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    global: globalSliceReducer,
    video: videoSliceReducer,
    user: userSliceReducer,
    reaction: reactionSliceReducer,
  },
});

export default store;
