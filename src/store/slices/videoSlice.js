import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    //docs for video documents
    docs: [],
    // manage pagination of videoData
    hasNextPage: false,
  },
  //use to store the single video being edited
  video: null,
  publishToggled: false,
};
//videoSlice
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },

    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
  },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;
export default videoSlice.reducer;
