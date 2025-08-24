import React from "react";

import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { getSocket } from "../service/socket-io.service";
import StoryCard from "./StoryCard";
import { useSelector } from "react-redux";
import ShowStory from "./ShowStory";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [selectedStory, setSelectedStory] = useState(null);
  const socket = getSocket();
  const fetchStories = async () => {
    const response = await axiosInstance.get("/stories/get-story");
    return response.data;
  };

  const arrangeStories = (storyRes) => {
    return [
      ...storyRes.filter((story) => story._id === user._id), // current user story first
      ...storyRes.filter((story) => story._id !== user._id), // then all others
    ];
  };

  useEffect(() => {
    (async () => {
      const response = await fetchStories();
      console.log("stories data", response.data);
      const arrangedStories = arrangeStories(response.data);
      setStories(arrangedStories);
    })();
  }, []);

  useEffect(() => {
    const getStories = async (data) => {
      const response = await fetchStories();
      console.log("stories data", response.data);
      const arrangedStories = arrangeStories(response.data);
      setStories(arrangedStories);
    };
    socket.on("story-changed", getStories);
  }, [socket]);

  return (
    <>
      <div className="border border-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
        <div className="flex space-x-4">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onClick={() => setSelectedStory(story)}
            />
          ))}
          {selectedStory && (
            <ShowStory
              story={selectedStory}
              onClose={() => setSelectedStory(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}
