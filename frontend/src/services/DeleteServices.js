import api from "../lib/api";

export const deletePostById = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};