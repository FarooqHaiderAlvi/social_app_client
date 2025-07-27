import axiosInstance from "./axios";

export const addUserLike = async (postId) => {
  try {
    const response = await axiosInstance.post("/likes/toggle-like", {
      postId: postId,
    });
    return response?.data;
  } catch (error) {
    console.error("Error liking the post: ", error);
  }
};

export const getTotalLikes = async (postId) => {
  console.log("postid", postId);
  try {
    const response = await axiosInstance.get("/likes/total-likes", {
      params: { postId },
    });
    return response?.data;
  } catch (error) {
    console.error("Error getting total Likes::", error);
  }
};

export const hasUserLikedPost = async (postId) => {
  try {
    const response = await axiosInstance.get("/likes/has-user-liked", {
      params: { postId },
    });
    return response?.data;
  } catch (error) {
    console.error("Error getting user liked post::", error);
  }
};
