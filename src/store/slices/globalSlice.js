import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    isOpen: true, // toggle sidebar
  },
  navbar: {
    isProfileDropdownOpen: false,
  },
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setIsProfileDropdownOpen: (state, action) => {
      state.navbar.isProfileDropdownOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setIsProfileDropdownOpen } = globalSlice.actions;
export default globalSlice.reducer;
