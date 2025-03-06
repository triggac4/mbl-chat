import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      username: null,
      _id: null,
      token: null,
      email: false,
      error: null,

      // Set user after successful login/registration
      setUser: (userData) =>
        set({
          username: userData.username,
          token: userData.token,
          email: userData.email,
          _id: userData._id,
          error: null,
        }),

      // Clear user data on logout
      logout: () =>
        set({
          username: null,
          token: null,
          email: false,
          _id: null,
          error: null,
        }),
    }),
    {
      name: "auth-storage", // name of the item in localStorage
    }
  )
);

export default useAuthStore;
