import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  fetchChatUsers,
  fetchUserMessages,
  sendChatMessage,
} from "../store/features/chat/chatThunk.js";
import { addMessage } from "../store/features/chat/chatSlice.js";

export default function Inbox() {
  const dispatch = useDispatch();
  const { users, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const location = useLocation();
  const socket = useRef();
  const messagesEndRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    console.log("[Socket.IO] Initializing connection...");

    socket.current = io("http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: {
        userId: user?._id,
      },
    });

    // Connection events
    socket.current.on("connect", () => {
      console.log("[Socket.IO] Connected with ID:", socket.current.id);
      setSocketStatus("connected");

      if (user?._id) {
        console.log("[Socket.IO] Joining user room:", user._id);
        socket.current.emit("add-user", user._id);
      }
    });

    socket.current.on("disconnect", (reason) => {
      console.log("[Socket.IO] Disconnected:", reason);
      setSocketStatus("disconnected");
    });

    socket.current.on("connect_error", (err) => {
      console.log("[Socket.IO] Connection error:", err);
      setSocketStatus("error");
    });

    // Debug all incoming events
    socket.current.onAny((event, ...args) => {
      console.log(`[Socket.IO] Received event '${event}':`, args);
    });

    socket.current.on("getOnlineUsers", (userIds) => {
      console.log("[Socket.IO] Online users received:", userIds);
      setOnlineUsers(userIds);
    });
    return () => {
      console.log("[Socket.IO] Cleaning up connection");
      socket.current?.disconnect();
    };
  }, [user?._id]);

  // Add user to online list when logged in
  useEffect(() => {
    if (user?._id) {
      socket.current?.emit("add-user", user._id);
    }
  }, [user]);

  // Listen for new messages
  useEffect(() => {
    if (!socket.current) return;

    console.log("[Socket.IO] Setting up message listener...");

    const handleNewMessage = (data) => {
      console.log("[Socket.IO] Processing new message:", data);

      // Normalize different data structures
      const messageData = data.message || data;

      // Verify message structure
      if (!messageData._id || !messageData.senderId) {
        console.warn("[Socket.IO] Invalid message format:", messageData);
        return;
      }

      // Check if message is relevant to current chat
      const isRelevant =
        messageData.senderId === selectedUser?._id ||
        messageData.receiverId === user?._id;

      if (isRelevant) {
        console.log("[Socket.IO] Adding relevant message to state");
        dispatch(addMessage(messageData));
      } else {
        console.log("[Socket.IO] Message not relevant to current chat");
      }
    };

    // Remove previous listeners to avoid duplicates
    socket.current.off("new-message", handleNewMessage);

    // Add new listener
    socket.current.on("new-message", handleNewMessage);

    return () => {
      socket.current?.off("new-message", handleNewMessage);
    };
  }, [selectedUser, user, dispatch]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    // Create temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: user._id,
      receiverId: selectedUser._id,
      msgText: newMessage,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Add to Redux immediately
    dispatch(addMessage(optimisticMessage));
    setNewMessage("");

    try {
      const result = await dispatch(
        sendChatMessage({
          receiverId: selectedUser._id,
          msgText: newMessage,
        })
      ).unwrap();

      console.log("[API] Message sent successfully:", result);
    } catch (error) {
      console.error("[API] Failed to send message:", error);
      // Optionally remove the optimistic message here
    }
  };

  // Fetch chat users on component mount
  useEffect(() => {
    dispatch(fetchChatUsers());
  }, [dispatch]);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchUserMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left sidebar - Conversation list */}
      <div className="w-96 border-r border-gray-900 hidden md:block">
        <div className="p-4 border-b border-gray-900">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Messages</h1>
            <button className="text-blue-400">New Message</button>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {console.log(users, "Users in Inbox", "current user", user)}
          {users
            .filter((chatUser) => chatUser._id !== user?._id) // Filter out current user
            .map((chatUser) => (
              <div
                key={chatUser._id}
                className={`flex items-center p-4 border-b border-gray-900 cursor-pointer hover:bg-gray-800 ${
                  selectedUser?._id === chatUser._id ? "bg-gray-800" : ""
                }`}
                onClick={() => setSelectedUser(chatUser)}
              >
                <div className="relative">
                  <img
                    src={
                      chatUser.avatar ||
                      "https://randomuser.me/api/portraits/men/1.jpg"
                    }
                    alt={chatUser.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {onlineUsers.includes(chatUser._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{chatUser.username}</h2>
                    <span className="text-xs text-gray-400">
                      {onlineUsers.includes(chatUser._id)
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">
                    {messages.find((m) => m.senderId === chatUser._id)
                      ?.msgText || "No messages yet2"}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right side - Chat area */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-900 flex items-center">
            <div className="flex items-center">
              <Link to="/inbox" className="md:hidden mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <img
                src={
                  selectedUser.avatar ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt={selectedUser.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <h2 className="font-semibold">{selectedUser.username}</h2>
                <p className="text-xs text-gray-400">
                  {onlineUsers.includes(selectedUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
            <div className="ml-auto flex space-x-4">
              <button>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.length ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.senderId === user._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <p>{message.msgText}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {new Date(message.createdAt).toLocaleString([], {
                        day: "2-digit",
                        month: "short", // or "2-digit" if you want numbers
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No messages yet1</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-900">
            <div className="flex items-center">
              <button className="text-white mr-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className={`ml-2 font-semibold ${
                  newMessage.trim() ? "text-blue-400" : "text-blue-300"
                }`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your Messages</h2>
            <p className="text-gray-400 mb-6">
              Send private messages to a friend or group.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
