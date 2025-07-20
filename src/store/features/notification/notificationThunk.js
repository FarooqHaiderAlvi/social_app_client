import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";

export const fetchUserNotifications = createAsyncThunk(
  "notification/fetchUserNotifications",
  async (_, thunkApi) => {
    try {
      console.log("fetcing notifications");
      const res = await axiosInstance.get("/notifications/user-notifications");
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch User notifications"
      );
    }
  }
);
