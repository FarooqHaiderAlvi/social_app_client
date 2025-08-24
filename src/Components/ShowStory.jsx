import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ShowStory({ story, onClose }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  // If no story is provided, don't render anything
  if (!story) return null;

  const currentStory = story.storyList[currentStoryIndex];
  const totalStories = story.storyList.length;

  // Determine if current story is a video
  useEffect(() => {
    if (currentStory && currentStory.storyUrl) {
      const url = currentStory.storyUrl.toLowerCase();
      if (
        url.endsWith(".mp4") ||
        url.endsWith(".mov") ||
        url.endsWith(".avi") ||
        url.includes("video") ||
        url.includes("mp4")
      ) {
        setMediaType("video");
      } else {
        setMediaType("image");
      }
    }
  }, [currentStoryIndex, currentStory]);

  // Start the progress bar
  useEffect(() => {
    if (paused) return;

    // For videos, we don't use the interval-based progress
    if (mediaType === "video" && videoRef.current) {
      // Video progress is handled by the video's timeupdate event
      return;
    }

    // For images, use the interval-based progress
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + 100 / 300; // 30s = 300 * 100ms intervals
      });
    }, 100);

    return () => clearInterval(progressInterval.current);
  }, [paused, currentStoryIndex, mediaType]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
    setPaused(false);
  }, [currentStoryIndex]);

  // Handle video events
  useEffect(() => {
    if (mediaType === "video" && videoRef.current) {
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        if (video.duration) {
          const percent = (video.currentTime / video.duration) * 100;
          setProgress(percent);
        }
      };

      const handleEnded = () => {
        handleNextStory();
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleEnded);

      // Auto-play video
      if (!paused) {
        video.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      } else {
        video.pause();
      }

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [mediaType, paused, currentStoryIndex]);

  const handleNextStory = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const togglePause = () => {
    setPaused(!paused);

    // Pause or play video if it's a video story
    if (mediaType === "video" && videoRef.current) {
      if (paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Format time for display (seconds)
  const formatTime = (seconds) => {
    return `${Math.floor(seconds)}s`;
  };

  // Calculate duration based on media type
  const getDuration = () => {
    if (
      mediaType === "video" &&
      videoRef.current &&
      videoRef.current.duration
    ) {
      return videoRef.current.duration;
    }
    return 30; // Default 30 seconds for images
  };

  // Mark story as viewed
  const markAsViewed = async (storyId) => {
    try {
      // Add your API call here to mark the story as viewed
      // await axiosInstance.post(`/stories/view-story/${storyId}`);

      // For now, we'll just update the local state to show it's viewed
      if (!currentStory.viewerId.includes(user._id)) {
        currentStory.viewerId.push(user._id);
      }
    } catch (error) {
      console.error("Error marking story as viewed:", error);
    }
  };

  // Mark the current story as viewed when it's displayed
  useEffect(() => {
    if (currentStory && !currentStory.viewerId.includes(user._id)) {
      markAsViewed(currentStory._id);
    }
  }, [currentStory]);

  // Handle keyboard events for better UX
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNextStory();
      } else if (e.key === "ArrowLeft") {
        handlePrevStory();
      } else if (e.key === " ") {
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStoryIndex, paused]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md mx-auto">
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
          {story.storyList.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-gray-700 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{
                  width:
                    index === currentStoryIndex
                      ? `${progress}%`
                      : index < currentStoryIndex
                      ? "100%"
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Media content */}
        <div className="w-full h-full flex items-center justify-center">
          {mediaType === "image" ? (
            <img
              src={currentStory.storyUrl}
              alt="Story"
              className="max-h-full max-w-full object-contain"
              onClick={togglePause}
            />
          ) : (
            <video
              ref={videoRef}
              src={currentStory.storyUrl}
              className="max-h-full max-w-full object-contain"
              onClick={togglePause}
              playsInline
              preload="metadata"
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
          onClick={handlePrevStory}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-2/3 cursor-pointer"
          onClick={handleNextStory}
        />

        {/* Control buttons */}
        <div className="mt-3 absolute top-4 right-4 flex space-x-2 z-10">
          {/* Pause/Play button */}
          <button
            className="text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={togglePause}
          >
            {paused ? (
              <svg
                aria-label="Play"
                fill="currentColor"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Play</title>
                <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
              </svg>
            ) : (
              <svg
                aria-label="Pause"
                fill="currentColor"
                height="16"
                role="img"
                viewBox="0 0 48 48"
                width="16"
              >
                <title>Pause</title>
                <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
              </svg>
            )}
          </button>

          {/* Close button */}
          <button
            className="text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Story info */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <div className="flex items-center space-x-2">
            <img
              src={
                story.avatar ||
                "https://res.cloudinary.com/dfhevuppu/image/upload/v1744663330/uq6lifwsbojzcantlaos.png"
              }
              alt={story.username}
              className="w-8 h-8 rounded-full"
            />
            <span>{story.username}</span>
            <span className="text-gray-400">
              {new Date(currentStory.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Media type and duration indicator */}
        <div className="absolute top-14 right-4 text-white text-xs bg-black bg-opacity-50 rounded px-2 py-1 z-10">
          {mediaType === "image" ? "30s" : formatTime(getDuration())}
        </div>
      </div>
    </div>
  );
}
