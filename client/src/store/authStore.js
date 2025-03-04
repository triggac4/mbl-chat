import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
      
      // Set user after successful login/registration
      setUser: (userData) => set({
        user: userData.user,
        token: userData.token,
        isLoggedIn: true,
        error: null
      }),
      
      // Clear user data on logout
      logout: () => set({
        user: null,
        token: null,
        isLoggedIn: false,
        error: null
      }),
      
      // Set errors
      setError: (error) => set({ error }),
      
      // Set loading state
      setLoading: (isLoading) => set({ isLoading }),
      
      // Reset errors
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
    }
  )
);

export default useAuthStore;