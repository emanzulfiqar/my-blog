
import api from "../lib/api";

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data?.post || response.data.post;
};

export const fetchPostsPaginated = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`);
  const responseData = response.data;

  const posts = responseData.data?.posts || responseData.posts || [];
  const pagination = responseData.data?.pagination || responseData.pagination || null;

  return { posts, pagination };
};
