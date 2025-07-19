import { create } from "zustand";

export const useBlogStore = create((set) => ({
  posts: [],
  pagination: null,
  isLoading: false,
  error: null,
  setPosts: (posts, pagination) => set({ posts, pagination, error: null }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? updatedPost : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
