import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:8080",
});

baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});
