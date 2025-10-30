import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    isOpen: true, // toggle sidebar
  },
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
  },
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
