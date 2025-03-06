import { useMutation } from "@tanstack/react-query";
import api from "../services/apiService";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "Users";

// Sign in hook with Zustand integration
export const useSignIn = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(`${BASE_URL}/signIn`, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
    },
  });
};

// Register hook with Zustand integration
export const useRegister = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(`${BASE_URL}/signUp`, credentials);
      return response.data;
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
  const { token, username, email, _id } = useAuthStore();

  return {
    isAuthenticated: !!token && !!_id,
    username,
    email,
    _id,
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

export const useRedirectToDashboard = () => {
  const { isAuthenticated } = useCheckAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
};

export default {
  useSignIn,
  useRegister,
  useLastView,
  useCheckAuth,
  useLogout,
  useRedirectToDashboard,
};
