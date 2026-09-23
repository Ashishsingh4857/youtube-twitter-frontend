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
    //for toggle the sidebar
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    //  added for ClickAwayListener to always close sidebar
    setSidebarOpen: (state, action) => {
      state.sidebar.isOpen = action.payload;
    },
    toggleStudioSidebar: (state) => {
      state.sidebar.isActive = !state.sidebar.isActive;
    },
    setIsProfileDropdownOpen: (state, action) => {
      state.navbar.isProfileDropdownOpen = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleStudioSidebar,
  setIsProfileDropdownOpen,
} = globalSlice.actions;
export default globalSlice.reducer;
