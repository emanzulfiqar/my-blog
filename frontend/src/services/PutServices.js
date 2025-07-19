import api from "../lib/api";


export const updatePost = async (id, data) => {
  const response = await api.put(`/posts/${id}`, data);
  return response.data.data?.post || response.data.post;
};