import spinner from "../assets/Spinner2.gif";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";
import { fetchUserNotifications } from "../store/features/notification/notificationThunk";
export default function Notifications() {
  // const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!notifications) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <img
          src={spinner}
          style={{ height: "100px", width: "100px" }}
          alt="Loading..."
          className="h-10 w-10"
        />
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-4 bg-black bg-dark-800 text-white rounded-lg shadow-lg">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        Notifications{" "}
        {/* {unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2 py-1">
            {unreadCount} new
          </span>
        )} */}
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
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  notification.isRead ? "bg-gray-900" : "bg-gray-800"
                }`}
                onClick={() => markAsRead(notification._id)}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={notification.sender?.avatar}
                    alt={notification.sender?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {notification.sender?.username}
                      </span>
                      <span className="mx-1">•</span>

                      {!notification.isRead && (
                        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-gray-300">{notification.action}</p>
                  </div>
                  {notification?.postPreview && (
                    <img
                      src={notification.postPreview}
                      alt="Post preview"
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
}
