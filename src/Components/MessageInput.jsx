import {
  addMessage,
  replaceOptimisticMessage,
} from "../store/features/chat/chatSlice.js";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSocket } from "../service/socket-io.service.js";
import { sendChatMessage } from "../store/features/chat/chatThunk.js";

export default function MessageInput() {
  const [newMessage, setNewMessage] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    ``;

    if (validFiles.length) {
      setMediaFiles((prev) => [...prev, ...validFiles]);
    } else {
      alert("Please select only image or video files");
    }
  };

  const removeMediaFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && mediaFiles.length === 0) || !selectedUser)
      return;

    const tempId = `temp-${Date.now()}`;
    const blobUrls = mediaFiles.map((file) => URL.createObjectURL(file));

    // Optimistic update with blob URLs
    const optimisticMessage = {
      _id: tempId,
      senderId: user._id,
      receiverId: selectedUser._id,
      msgText: newMessage,
      msgFile: blobUrls[0] || null, // Using first file if available
      blobUrls, // Store all blob URLs
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    dispatch(addMessage(optimisticMessage));
    setNewMessage("");
    setMediaFiles([]);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Create FormData
      const formData = new FormData();
      formData.append("receiverId", selectedUser._id);
      if (newMessage.trim()) formData.append("msgText", newMessage);

      // Append all media files
      mediaFiles.forEach((file) => {
        formData.append("attachment", file);
      });

      // Configure axios for progress tracking
      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      };

      const result = await dispatch(
        sendChatMessage({ formData, config })
      ).unwrap();

      // Replace optimistic message with real one from server
      dispatch(
        replaceOptimisticMessage({
          tempId,
          message: result,
        })
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally show error to user
    } finally {
      setIsUploading(false);
      setUploadProgress(0);

      // Clean up blob URLs
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  };

  return (
    <div className="p-4 border-t border-gray-900 bg-gray-900">
      {/* Media preview area */}
      {mediaFiles.length > 0 && (
        <div className="relative mb-3 p-2 bg-gray-800 rounded-lg">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {mediaFiles.map((file, index) => (
              <div key={index} className="relative flex-shrink-0">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                )}
                <button
                  onClick={() => removeMediaFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload progress indicator */}
      {isUploading && (
        <div className="mb-2">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      <div className="flex items-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple
          className="hidden"
        />

        {/* Media attachment button */}
        <button
          className="text-white mr-2 p-2 hover:bg-gray-700 rounded-full"
          onClick={() => fileInputRef.current.click()}
          disabled={isUploading}
        >
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
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        {/* Camera button */}
        <button
          className="text-white mr-2 p-2 hover:bg-gray-700 rounded-full"
          disabled={isUploading}
        >
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
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Text input */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isUploading}
        />

        {/* Send button */}
        <button
          className={`ml-2 p-2 font-semibold rounded-full ${
            (newMessage.trim() || mediaFiles.length > 0) && !isUploading
              ? "text-blue-400 hover:bg-blue-900/20"
              : "text-blue-300"
          }`}
          onClick={handleSendMessage}
          disabled={
            (!newMessage.trim() && mediaFiles.length === 0) || isUploading
          }
        >
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
