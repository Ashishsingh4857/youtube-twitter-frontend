import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  statusLoading: false,
  subscribedMap: {},
  channelSubscribers: [],
  subscribersCount: 0,
  mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk(
  "subscription/toggle",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`subscriptions/c/${channelId}`);
      const data = response.data.data;
      return {
        channelId,
        isSubscribed: data.isSubscribed ?? data.subscribed,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle subscription"
      );
    }
  }
);

export const checkSubscriptionStatus = createAsyncThunk(
  "subscription/checkStatus",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `subscriptions/c/${channelId}/status`
      );
      return { channelId, isSubscribed: response.data.data.isSubscribed };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check status"
      );
    }
  }
);

export const fetchMySubscriptions = createAsyncThunk(
  "subscription/mySubscriptions",
  async (subscriberId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `subscriptions/u/${subscriberId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscriptions"
      );
    }
  }
);

// Fetch channel subscribers
export const fetchChannelSubscribers = createAsyncThunk(
  "subscription/fetchChannelSubscribers",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`subscriptions/c/${channelId}`);
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subscribers"
      );
    }
  }
);

// Remove subscriber (studio owner)
export const removeSubscriber = createAsyncThunk(
  "subscription/removeSubscriber",
  async (subscriberId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `subscriptions/remove/${subscriberId}`
      );

      return subscriberId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove subscriber"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionState: (state) => {
      state.subscribedMap = {};
      state.channelSubscribers = [];
      state.mySubscriptions = [];
      state.subscribersCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedMap[action.payload.channelId] =
          action.payload.isSubscribed;
      })
      .addCase(toggleSubscription.rejected, (state) => {
        state.loading = false;
      })

      .addCase(checkSubscriptionStatus.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.subscribedMap[action.payload.channelId] =
          action.payload.isSubscribed;
      })
      .addCase(checkSubscriptionStatus.rejected, (state) => {
        state.statusLoading = false;
      })

      .addCase(fetchMySubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMySubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.mySubscriptions = list;

        list.forEach((channel) => {
          const id = channel?._id;
          if (id) state.subscribedMap[id] = true;
        });
      })
      .addCase(fetchMySubscriptions.rejected, (state) => {
        state.loading = false;
      })

      // channel subscribers
      .addCase(fetchChannelSubscribers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.channelSubscribers = action.payload.subscribers || [];
        state.subscribersCount = action.payload.subscribersCount || 0;
      })
      .addCase(fetchChannelSubscribers.rejected, (state) => {
        state.loading = false;
      })

      // remove subscriber
      .addCase(removeSubscriber.fulfilled, (state, action) => {
        state.channelSubscribers = state.channelSubscribers.filter(
          (s) => s._id !== action.payload
        );
        state.subscribersCount = Math.max(0, state.subscribersCount - 1);
      });
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
