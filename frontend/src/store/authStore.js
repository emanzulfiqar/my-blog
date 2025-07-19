import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: true,
      login: (user, token) => set({ user, token, isLoading: false }),
      logout: () => set({ user: null, token: null, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
