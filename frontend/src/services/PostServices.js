import api from "../lib/api";

export const createPost = async (post) => {
  const response = await api.post("/posts", post);
  return response.data.data?.post || response.data.post;
};


