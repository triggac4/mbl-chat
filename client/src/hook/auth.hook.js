import { useMutation } from "@tanstack/react-query";
import api from "../services/apiService";
const url = "Users";
export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(`${url}/signIn`, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      //   localStorage.setItem("token", data.token);
    },
  });
  return mutation;
};
export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(`${url}/signUp`, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      //   localStorage.setItem("token", data.token);
    },
  });
  return mutation;
};

export const useLastView = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.put(`${url}/lastView`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      //   localStorage.setItem("token", data.token);
    },
  });
  return mutation;
};
