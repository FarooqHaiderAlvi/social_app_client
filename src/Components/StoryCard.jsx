import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function StoryCard({ story, onClick }) {
  const [storyModal, setStoryModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // const closeModal = () => {
  //   setStoryModal(false);
  // };

  console.log("mystory", story);
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5">
        <img
          src={
            story.storyUrl ||
            "https://res.cloudinary.com/dfhevuppu/image/upload/v1744663330/uq6lifwsbojzcantlaos.png"
          }
          alt="Story"
          className="w-full h-full rounded-full"
        />
      </div>
      <span className="text-xs mt-1 truncate w-16 text-center text-gray-300">
        {user._id == story._id ? "MyStory" : story.username || "user"}
      </span>
    </div>
  );
}
