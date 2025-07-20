import axiosInstance from "./axios";

export const getAllPosts = async () => {
  try {
    const posts = await axiosInstance.get("/posts/getAllUsersPosts");
    console.log("posts fetched", posts.data.data);

    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err; // rethrow the error for further handling
  }
};

export const addUserComment = async (postId, comment) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/comments`, {
      text: comment,
    });
    console.log("Comment added:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err; // rethrow the error for further handling
  }
};
