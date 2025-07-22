import { createSlice } from "@reduxjs/toolkit";

import { fetchUserNotifications } from "./notificationThunk.js";

const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: true,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotificationCount: (state, action) => {
      console.log("updating notification count...");
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.length;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { updateNotificationCount } = notificationSlice.actions;

export default notificationSlice.reducer;
