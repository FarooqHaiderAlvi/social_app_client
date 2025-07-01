// src/store/features/chat/chatThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios.js";

// Fetch users for chat
export const fetchChatUsers = createAsyncThunk(
  "chat/fetchChatUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/messages/get-users");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Fetch messages between the logged-in user and a selected user
export const fetchUserMessages = createAsyncThunk(
  "chat/fetchUserMessages",
  async (chatPartnerId, thunkAPI) => {
    try {
      console.log("Fetching messages for chat partner ID:", chatPartnerId);
      const res = await axiosInstance.post("/messages/user-messages", {
        chatPartnerId,
      });
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

// Send a message (text only or with file)
export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async ({ formData, config }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/messages/send-message",
        formData,
        config
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);
