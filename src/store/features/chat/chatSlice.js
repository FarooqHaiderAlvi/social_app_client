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
  onlineUsers: [], // New state to track online users
  selectedUser: null,
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
    // Add these new reducers
    addMessage: (state, action) => {
      // Check if message already exists to prevent duplicates
      const messageExists = state.messages.some(
        (msg) => msg._id === action.payload._id
      );

      if (!messageExists) {
        state.messages.push(action.payload);
      }
    },
    addOptimisticMessage: (state, action) => {
      // Add temporary message while waiting for server response
      state.messages.push({
        ...action.payload,
        isOptimistic: true,
      });
    },
    replaceOptimisticMessage: (state, action) => {
      // Replace temporary message with real one from server
      state.messages = state.messages.map((msg) =>
        msg._id === action.payload.tempId ? action.payload.message : msg
      );
    },
    removeOptimisticMessage: (state, action) => {
      // Remove temporary message if sending failed
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload
      );
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
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
        // Don't push here since we're handling it via optimistic updates
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
      });
  },
});

// Export all actions including the new ones
export const {
  setSelectedUser,
  clearChatState,
  addMessage,
  addOptimisticMessage,
  replaceOptimisticMessage,
  removeOptimisticMessage,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
