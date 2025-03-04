import { useMutation } from "@tanstack/react-query";
import api from "../services/apiService";
import useAuthStore from "../store/authStore";

const BASE_URL = "Users";

// Sign in hook with Zustand integration
export const useSignIn = () => {
  const { setUser, setError, setLoading, clearError } = useAuthStore();
  
  return useMutation({
    mutationFn: async (credentials) => {
      setLoading(true);
      clearError();
      try {
        const response = await api.post(`${BASE_URL}/signIn`, credentials);
        return response.data;
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
    },
  });
};

// Register hook with Zustand integration
export const useRegister = () => {
  const { setUser, setError, setLoading, clearError } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      setLoading(true);
      clearError();
      try {
        const response = await api.post(`${BASE_URL}/signUp`, credentials);
        return response.data;
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
    },
  });
};

// Update last viewed timestamp
export const useLastView = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.put(`${BASE_URL}/lastView`);
      return response.data;
    },
  });
};

// Check if user is authenticated
export const useCheckAuth = () => {
  const { isLoggedIn, token } = useAuthStore();
  
  return {
    isAuthenticated: isLoggedIn && !!token,
    token
  };
};

// Logout hook
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  
  return () => {
    localStorage.removeItem("token");
    logout();
  };
};

export default {
  useSignIn,
  useRegister,
  useLastView,
  useCheckAuth,
  useLogout,
};