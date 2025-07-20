import axiosInstance from "./axios";

export const postComment = async (postId, comment) => {
  try {
    const response = await axiosInstance.post(
      `/comments/create-comment/${postId}`,
      {
        content: comment,
      }
    );
    console.log("Comment added:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err; // rethrow the error for further handling
  }
};
