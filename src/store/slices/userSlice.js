import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  profileData: null,
};

export const userChannelProfile = createAsyncThunk(
  "getUserChannelProfile",
  async (username) => {
    try {
      const response = await axiosInstance.get(`/users/c/${username}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userChannelProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userChannelProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    });
  },
});

export default userSlice.reducer;
