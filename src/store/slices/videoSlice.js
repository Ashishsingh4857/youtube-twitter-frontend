import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants.js";

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);

  try {
    const response = await axiosInstance.post("/videos", formData);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});
export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      //video url
      const url = new URL(`${BASE_URL}/videos`);

      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }

      const response = await axiosInstance.get(url);

      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    if (data.title) {
      formData.append("title", data.title);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    try {
      const response = await axiosInstance.patch(
        `/videos/${videoId}`,
        formData
      );
      toast.success(response?.data?.message);
      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteAVideo = createAsyncThunk(
  "deleteAVideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/videos/${videoId}`);
      toast.success(response?.data?.message);
      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

//video details page
export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.get(`/videos/${videoId}`);
      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/videos/toggle/publish/${videoId}`
      );
      toast.success(response.data?.message);
      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const updateVideoState = (state, videoId, update) => {
  state.videos.docs = state.videos.docs.map((video) =>
    video._id === videoId ? { ...video, ...update } : video
  );
  state.userVideos.docs = state.userVideos.docs.map((video) =>
    video._id === videoId ? { ...video, ...update } : video
  );
};
export const getVideosByUser = createAsyncThunk(
  "getVideosByUser",
  async (username) => {
    try {
      const response = await axiosInstance.get(`/videos/user/${username}`);
      toast.success(response.data?.message);

      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const initialState = {
  status: { loading: false, uploading: false, uploaded: false, error: null },
  // all user videos
  videos: {
    docs: [],
    hasNextPage: false,
  },
  //logged in user videos
  userVideos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.status.uploading = false;
      state.status.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
    makeUserVideosNull: (state) => {
      state.userVideos.docs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllVideos
      .addCase(getAllVideos.pending, (state) => {
        state.status.loading = true;
        state.status.error = null;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.status.loading = false;
        state.videos.docs = [...state.videos.docs, ...action.payload.videos];
        state.videos.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = action.error.message;
      })

      // publishAvideo
      .addCase(publishAvideo.pending, (state) => {
        state.status.uploading = true;
        state.status.error = null;
      })
      .addCase(publishAvideo.fulfilled, (state) => {
        state.status.uploading = false;
        state.status.uploaded = true;
      })
      .addCase(publishAvideo.rejected, (state, action) => {
        state.status.uploading = false;
        state.status.error = action.error.message;
      })

      // updateAVideo
      .addCase(updateAVideo.pending, (state) => {
        state.status.uploading = true;
        state.status.error = null;
      })
      .addCase(updateAVideo.fulfilled, (state, action) => {
        state.status.uploading = false;
        state.status.uploaded = true;
        const updatedVideo = action.payload;
        updateVideoState(state, updatedVideo._id, updatedVideo);
      })
      .addCase(updateAVideo.rejected, (state, action) => {
        state.status.uploading = false;
        state.status.error = action.error.message;
      })

      // deleteAVideo
      .addCase(deleteAVideo.pending, (state) => {
        state.status.loading = true;
        state.status.error = null;
      })
      .addCase(deleteAVideo.fulfilled, (state, action) => {
        state.status.loading = false;
        const deletedVideoId = action.payload._id;
        state.videos.docs = state.videos.docs.filter(
          (video) => video._id !== deletedVideoId
        );
        state.userVideos.docs = state.userVideos.docs.filter(
          (video) => video._id !== deletedVideoId
        );
      })
      .addCase(deleteAVideo.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = action.error.message;
      })

      // getVideoById
      .addCase(getVideoById.pending, (state) => {
        state.status.loading = true;
        state.status.error = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.status.loading = false;
        state.video = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = action.error.message;
      })

      // togglePublishStatus
      .addCase(togglePublishStatus.pending, (state) => {
        state.status.loading = true;
        state.status.error = null;
      })
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        state.status.loading = false;
        updateVideoState(state, action.payload._id, action.payload);
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = action.error.message;
      })

      // getVideosByUser
      .addCase(getVideosByUser.pending, (state) => {
        state.status.loading = true;
        state.status.error = null;
      })
      .addCase(getVideosByUser.fulfilled, (state, action) => {
        state.status.loading = false;
        state.userVideos.docs = action.payload;
      })
      .addCase(getVideosByUser.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = action.error.message;
      });
  },
});

export const { updateUploadState, makeVideosNull, makeUserVideosNull } =
  videoSlice.actions;
export default videoSlice.reducer;
