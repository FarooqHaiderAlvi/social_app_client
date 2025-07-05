import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSocket } from "../service/socket-io.service.js";
import MessageInput from "./MessageInput.jsx";
import ChatSideBar from "./ChatSideBar.jsx";
import {
  setOnlineUsers,
  setSelectedUser,
  addMessage,
} from "../store/features/chat/chatSlice.js";
import {
  fetchChatUsers,
  fetchUserMessages,
} from "../store/features/chat/chatThunk.js";

export default function Inbox() {
  const dispatch = useDispatch();
  const { messages, onlineUsers, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const socket = getSocket();
  const messagesEndRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!socket) return;

    // Online users listener
    const handleOnlineUsers = (userIds) => {
      dispatch(setOnlineUsers(userIds));
    };

    // New message listener
    const handleNewMessage = (data) => {
      if (
        data.message.senderId === selectedUser?._id ||
        data.message.receiverId === user._id
      ) {
        dispatch(addMessage(data.message));
        if (data.message.senderId === selectedUser?._id) {
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 100);
        }
      }
    };

    socket.on("getOnlineUsers", handleOnlineUsers);
    socket.on("new-message", handleNewMessage);

    if (socket.connected) {
      socket.emit("requestOnlineUsers");
    }

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, dispatch, selectedUser?._id, user._id]);

  // Scroll to bottom of messages
  useEffect(() => {
    // console.log("[Inbox] Messages updated, scrolling to bottom");
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Changed from default 'start' to 'nearest'
      });
    }
  }, [messages]);

  useEffect(() => {
    console.log(user._id, " selected user");
    dispatch(setSelectedUser(null));
  }, []);

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
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Left sidebar - Conversation list */}
      <ChatSideBar />
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
                    {message.msgFile && (
                      <div className="mt-2">
                        <img
                          src={message.msgFile}
                          alt=""
                          className="max-w-full h-auto rounded-lg"
                          onLoad={() => {
                            // Clean up blob URLs after real image loads
                            if (message.isOptimistic && message.blobUrls) {
                              message.blobUrls.forEach((url) =>
                                URL.revokeObjectURL(url)
                              );
                            }
                          }}
                        />
                        {message.isOptimistic && (
                          <p className="text-xs text-gray-300 mt-1">
                            Uploading...
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {new Date(message.createdAt).toLocaleString([], {
                        day: "2-digit",
                        month: "short",
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
          <MessageInput />
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
