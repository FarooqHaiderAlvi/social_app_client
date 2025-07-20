import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios.js";

export const loginUser = createAsyncThunk(
  "/users/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/users/login", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "/users/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/users/register", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ Add this new thunk:
export const fetchLoggedInUser = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/users/get-user");
      // console.log("Fetched user data:", data.data); // Debugging line
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);
