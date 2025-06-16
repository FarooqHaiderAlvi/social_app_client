// src/store/features/chat/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChatUsers,
  fetchUserMessages,
  sendChatMessage,
} from "./chatThunk.js";

const initialState = {
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSending: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearChatState: (state) => {
      state.users = [];
      state.messages = [];
      state.selectedUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(fetchChatUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchChatUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchChatUsers.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.error = action.payload;
      })

      // Messages
      .addCase(fetchUserMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchUserMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchUserMessages.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.error = action.payload;
      })

      // Send Message
      .addCase(sendChatMessage.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isSending = false;
        state.messages.push(action.payload);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedUser, clearChatState } = chatSlice.actions;

export default chatSlice.reducer;
