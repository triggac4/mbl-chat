import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/apiService";

const url = "messages";
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message) => {
      const response = await api.post(`${url}`, message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
};
export const useGetMessages = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await api.get(`${url}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
};

export const useGetUnreadMessageCount = () => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: async () => {
      const response = await api.get(`${url}/unreadCount`);
      return response.data;
    },
  });
};
