import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";

const initialState = {
  reactions: {},
};

export const toggleVideoReaction = createAsyncThunk(
  "toggleVideoReaction",
  async ({ videoId, reactionType }) => {
    try {
      const response = await axiosInstance.post(
        `/reaction/toggle-reaction/v/${videoId}`,
        { reactionType }
      );
      return { videoId, data: response.data.data };
    } catch (error) {
      throw error;
    }
  }
);

const reactionSlice = createSlice({
  name: "reaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleVideoReaction.pending, (state, action) => {
        const videoId = action.meta.arg;
        if (!state.reactions[videoId]) {
          state.reactions[videoId] = { loading: true };
        } else {
          state.reactions[videoId].loading = true;
        }
      })
      .addCase(toggleVideoReaction.fulfilled, (state, action) => {
        const { videoId, data } = action.payload;
        const { likeCount, dislikeCount, userReaction } = data;
        state.reactions[videoId] = {
          likeCount,
          dislikeCount,
          userReaction,
          loading: false,
        };
      })
      .addCase(toggleVideoReaction.rejected, (state, action) => {
        const videoId = action.meta.arg;
        if (state.reactions[videoId]) {
          state.reactions[videoId].loading = false;
        }
      });
  },
});

export default reactionSlice.reducer;
