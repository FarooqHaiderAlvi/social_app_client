import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket"],
      query: { userId },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      // console.log("[Socket.IO] Connected with ID:", socket.id);
      if (userId) {
        // console.log("[Socket.IO] Joining user room:", userId);
        socket.emit("add-user", userId);
      }
    });

    socket.on("reconnect", () => {
      console.log("[Socket.IO] Reconnected");
      if (userId) {
        socket.emit("add-user", userId);
      }
    });

    socket.on("disconnect", () => {
      console.log("[Socket.IO] Disconnected");
    });
  } else if (userId && socket.connected) {
    // If socket exists and is connected, ensure user is added
    socket.emit("add-user", userId);
  }

  return socket;
};

export const getSocket = () => socket;

export const isSocketConnected = () => socket?.connected ?? false;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
