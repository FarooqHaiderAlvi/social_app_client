import spinner from "../assets/Spinner2.gif";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(true);
  const { notifications } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.auth); // Get current user

  // Generate notification message based on type and user context
  const getNotificationMessage = (notification) => {
    const senderName = notification.sender?.username;
    const isCurrentUserReceiver = notification.receiver?._id === user._id;

    switch (notification.action) {
      case "like":
        return isCurrentUserReceiver
          ? `${senderName} liked your post`
          : `You liked ${notification.receiver?.username}'s post`;

      case "comment":
        return isCurrentUserReceiver
          ? `${senderName} commented on your post`
          : `You commented on ${notification.receiver?.username}'s post`;

      case "follow":
        return `${senderName} started following you`;

      default:
        return notification.action;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!notifications) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <img
          src={spinner}
          style={{ height: "100px", width: "100px" }}
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        Notifications
      </motion.h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex items-center space-x-3 p-3 rounded-lg bg-gray-900"
            >
              <div className="rounded-full bg-gray-700 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {notifications.map((notification) => (
              <motion.li
                key={notification._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  notification.isRead ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                {/* Avatar */}
                <img
                  src={
                    notification.sender?.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt={"no photo"}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />

                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-sm">
                    {getNotificationMessage(notification)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* Post Preview (if available) */}
                {notification.postId && (
                  <div className="ml-4 w-14 h-14 bg-gray-700 rounded-md overflow-hidden">
                    {/* You would replace this with actual post image */}
                    <img src={notification.postUrl} />
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
}
