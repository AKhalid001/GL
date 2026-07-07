import axios from "axios";

export const taskApi = axios.create({
    baseURL : "http://localhost:8080/tasks"
});

taskApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});