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
