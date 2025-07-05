import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, fetchLoggedInUser } from "./authThunk.js";
import { connectSocket } from "../../../service/socket-io.service.js";
const initialState = {
  user: null,
  isLoadingUser: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoadingUser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        console.log("Login payload:", action.payload.data.user); // Debugging line
        state.user = action.payload.data.user;
        connectSocket(state.user._id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload;
        connectSocket(state.user._id);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })

      // 🔁 Fetch Logged In User
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload;
        connectSocket(state.user._id);
      })
      .addCase(fetchLoggedInUser.rejected, (state) => {
        state.isLoadingUser = false;
        state.user = null; // clear user on error (e.g. not logged in)
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
