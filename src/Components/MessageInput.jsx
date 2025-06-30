import { addMessage } from "../store/features/chat/chatSlice.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSocket } from "../service/socket-io.service.js";
import { sendChatMessage } from "../store/features/chat/chatThunk.js";
export default function MessageInput() {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const socket = getSocket();
  const { messages, onlineUsers, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!socket) return;

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
    socket.off("new-message", handleNewMessage);

    // Add new listener
    socket.on("new-message", handleNewMessage);

    return () => {
      socket?.off("new-message", handleNewMessage);
    };
  }, [selectedUser, user, dispatch]);

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

  return (
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
  );
}
