import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import chatReducer from "./features/chat/chatSlice.js";
import notificationReducer from "./features/notification/notificationSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
});

export default store;
