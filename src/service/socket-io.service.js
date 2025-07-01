import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  //   console.log("first connectSocket called with userId:", userId);
  if (!socket) {
    socket = io("http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket"],
      query: { userId },
    });

    socket.on("connect", () => {
      //   console.log("[Socket.IO] Connected with ID:", socket.id);

      if (userId) {
        console.log("[Socket.IO] Joining user room:", userId);
        socket.emit("add-user", userId);
      }
    });

    socket.on("disconnect", () => {
      console.log("[Socket.IO] Disconnected");
    });

    socket.onAny((event, ...args) => {
      console.log(`[Socket.IO] Event '${event}':`, args);
    });
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
