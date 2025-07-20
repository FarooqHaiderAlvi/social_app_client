import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPosts } from "../api/posts.js"; // Adjust the import based on your API structure
import Stories from "./Stories.jsx";
import { postComment } from "../api/comment.js";
import ShowPosts from "./ShowPosts.jsx";
import { use } from "react";
export default function Home() {
  const { user, isLoadingUser } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation();
  useEffect(() => {
    document.title = "Home - Social App";
  }, []);

  useEffect(() => {
    // Fetch user posts when the component mounts
    const fetchUserPosts = async () => {
      try {
        const response = await getAllPosts();
        console.log("User Posts:", response.data.data);
        setUserPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Main Content - Take full space after sidebar */}
      <div
        className="flex-1 pb-16 flex justify-center"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      >
        {location.pathname === "/" && (
          <div className="w-full max-w-xl py-4 px-2">
            {/* Stories */}
            <Stories />

            {/* Posts */}
            {userPosts.map((post) => (
              <ShowPosts key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
