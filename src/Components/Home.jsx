import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons component with pure black/white styling
const Icons = {
  Home: ({ active }) => (
    <svg
      aria-label="Home"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d={
          active
            ? "M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
            : "M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997h0A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
        }
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  Search: ({ active }) => (
    <svg
      aria-label="Search"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  ),
  Messages: ({ active }) => (
    <svg
      aria-label="Direct"
      className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d={
          active
            ? "M22.5 2.5h-21a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1v-18a1 1 0 0 0-1-1ZM12 7.5a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 12 7.5Z"
            : "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        }
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  Create: () => (
    <svg
      aria-label="New post"
      className="w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="6.545"
        x2="17.455"
        y1="12.001"
        y2="12.001"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12.003"
        x2="12.003"
        y1="6.545"
        y2="17.455"
      ></line>
    </svg>
  ),
  Profile: () => (
    <svg
      aria-label="Profile"
      className="w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        d="M17.5 17.5A6.5 6.5 0 0 0 12 11a6.5 6.5 0 0 0-5.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <circle
        cx="12"
        cy="8"
        fill="none"
        r="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
    </svg>
  ),
};

export default function Home() {
  const { user, isLoadingUser } = useSelector((state) => state.auth);
  const location = useLocation();

  // Sample posts data
  const posts = [
    {
      id: 1,
      username: "user1",
      userImage: "https://randomuser.me/api/portraits/women/44.jpg",
      image: "https://picsum.photos/id/1018/800/600",
      caption: "Beautiful day at the beach! #summer #vacation",
      likes: 124,
      comments: 23,
      time: "2 hours ago",
    },
    {
      id: 2,
      username: "user2",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      image: "https://picsum.photos/id/1025/800/600",
      caption: "Working on some new projects #coding #developer",
      likes: 89,
      comments: 12,
      time: "5 hours ago",
    },
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
      {/* Sidebar - Pure Black */}

      {/* Main Content - Pure Black */}
      <div
        className="flex-1 md:ml-64 pb-16 md:pb-0"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      >
        {location.pathname === "/" && (
          <div className="max-w-xl mx-auto py-4 px-2">
            {/* Stories */}
            <div
              className="border border-gray-900 rounded-lg p-4 mb-4 overflow-x-auto"
              style={{ backgroundColor: "rgb(0, 0, 0)" }}
            >
              <div className="flex space-x-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5">
                      <img
                        src={`https://randomuser.me/api/portraits/${
                          i % 2 === 0 ? "women" : "men"
                        }/${i + 10}.jpg`}
                        alt="Story"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <span className="text-xs mt-1 truncate w-16 text-center text-gray-300">
                      user{i}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-900 rounded-lg mb-4"
                style={{ backgroundColor: "rgb(0, 0, 0)" }}
              >
                {/* Post Header */}
                <div className="flex items-center p-3">
                  <img
                    src={post.userImage}
                    alt={post.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-3 font-semibold text-white">
                    {post.username}
                  </span>
                  <span className="ml-auto text-gray-500">•••</span>
                </div>

                {/* Post Image */}
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full object-cover"
                />

                {/* Post Actions */}
                <div className="p-3">
                  <div className="flex space-x-4">
                    <button>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </button>
                    <button>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                    </button>
                    <button>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </button>
                    <button className="ml-auto">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* Likes */}
                  <div className="mt-2 font-semibold text-white">
                    {post.likes} likes
                  </div>

                  {/* Caption */}
                  <div className="mt-1 text-white">
                    <span className="font-semibold">{post.username}</span>{" "}
                    {post.caption}
                  </div>

                  {/* Comments */}
                  <div className="mt-1 text-gray-400">
                    View all {post.comments} comments
                  </div>

                  {/* Time */}
                  <div className="mt-1 text-xs text-gray-500">{post.time}</div>
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-900 p-3 flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none bg-transparent text-white placeholder-gray-500"
                  />
                  <button className="text-blue-400 font-semibold">Post</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {location.pathname === "/messages" && (
          <div className="max-w-xl mx-auto py-4 px-2">
            <div
              className="border border-gray-900 rounded-lg p-4"
              style={{ backgroundColor: "rgb(0, 0, 0)" }}
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Messages
              </h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-2 rounded-lg cursor-pointer"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        i % 2 === 0 ? "women" : "men"
                      }/${i + 20}.jpg`}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <div className="font-semibold text-white">
                        user{i + 20}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Last message preview...
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-gray-500">2h</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
