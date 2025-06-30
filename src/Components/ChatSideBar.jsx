import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../store/features/chat/chatSlice";
import { useEffect } from "react";
export default function ChatSideBar() {
  const { users } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { onlineUsers, selectedUser, messages } = useSelector(
    (state) => state.chat
  );

  return (
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
        {users
          .filter((chatUser) => chatUser._id !== user?._id) // Filter out current user
          .map((chatUser) => (
            <div
              key={chatUser._id}
              className={`flex items-center p-4 border-b border-gray-900 cursor-pointer hover:bg-gray-800 ${
                selectedUser?._id === chatUser._id ? "bg-gray-800" : ""
              }`}
              onClick={() => dispatch(setSelectedUser(chatUser))}
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
                    {onlineUsers.includes(chatUser._id) ? "Online" : "Offline"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate">
                  {messages.find((m) => m.senderId === chatUser._id)?.msgText ||
                    "No messages yet2"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
