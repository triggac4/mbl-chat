import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/apiService";

const url = "messages";
export const useSendMessage = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message) => {
      const response = await api.post(`${url}`, message);
      return response.data;
    },
  });
};
export const useGetMessages = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await api.get(`${url}`);
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      return response.data;
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
