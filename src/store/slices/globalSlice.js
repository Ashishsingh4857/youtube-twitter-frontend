import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    isOpen: true, // toggle sidebar
    isActive: true, // toggle studio sidebar
  },
  navbar: {
    isProfileDropdownOpen: false, //avatar dropdown
  },
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    toggleStudioSidebar: (state) => {
      state.sidebar.isActive = !state.sidebar.isActive;
    },
    setIsProfileDropdownOpen: (state, action) => {
      state.navbar.isProfileDropdownOpen = action.payload;
    },
  },
});

export const { toggleSidebar, toggleStudioSidebar, setIsProfileDropdownOpen } =
  globalSlice.actions;
export default globalSlice.reducer;
