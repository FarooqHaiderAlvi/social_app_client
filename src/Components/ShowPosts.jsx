import { useState } from "react";
import { postComment } from "../api/comment.js"; // Adjust the import based on your API structure
import { addUserLike } from "../api/like.js";
import { useSelector, useDispatch } from "react-redux";
import { updateNotificationCount } from "../store/features/notification/notificationSlice.js";
export default function ShowPosts({ post }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const addComment = async (postId) => {
    if (!comment.trim()) {
      return; // Prevent empty comments
    }
    try {
      // Assuming you have an API endpoint to add comments
      const response = await postComment(postId, comment);
      dispatch(updateNotificationCount());
      console.log("Comment added:", response.data);

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addLike = async (postId) => {
    console.log("hit add like");
    try {
      setIsLiked(true);
      // Assuming you have an API endpoint to add comments
      const response = await addUserLike(postId);
      // dispatch(updateNotificationCount());
      console.log("Comment added:", response.data.isLiked);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      setIsLiked(false);
      console.error("Error adding like comment:", error);
    }
  };
  const [comment, setComment] = useState("");
  return (
    <>
      <div key={post._id} className="border border-gray-900 rounded-lg mb-4">
        {/* Post Header */}
        <div className="flex items-center p-3">
          <img
            src={post.owner.avatar}
            alt={post.owner.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-3 font-semibold text-white">
            {post.owner.username}
          </span>
          <span className="ml-auto text-gray-500">•••</span>
        </div>

        {/* Post Image */}
        <img src={post.postUrl} alt="Post" className="w-full object-cover" />

        {/* Post Actions */}
        <div className="p-3">
          <div className="flex space-x-4">
            <button
              className="hover:cursor-pointer"
              onClick={() => addLike(post._id)}
            >
              {isLiked ? (
                <svg
                  aria-label="Unlike"
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  width="24"
                  height="24"
                >
                  <title>Unlike</title>
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
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
              )}
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

          <div className="mt-2 font-semibold text-white">
            {post.totalLikes} likes
          </div>

          <div className="mt-1 text-white">
            <span className="font-semibold">{post.owner.username}</span>{" "}
            {post.description}
          </div>

          <div className="mt-1 text-gray-400">
            View all {post.commentsCount} comments
          </div>

          <div className="mt-1 text-xs text-gray-500">{post.createdAt}</div>
        </div>

        <div className="border-t border-gray-900 p-3 flex">
          <input
            type="text"
            value={comment}
            placeholder="Add a comment..."
            className="flex-1 outline-none bg-transparent text-white placeholder-gray-500"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="text-blue-400 font-semibold"
            onClick={() => addComment(post._id)}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
