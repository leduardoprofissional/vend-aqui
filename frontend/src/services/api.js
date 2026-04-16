import axios from "axios";
import { getUser } from "./auth";

const api = axios.create({
  baseURL: "https://vend-aqui.onrender.com"
});

api.interceptors.request.use(config => {
  const user = getUser();

  if (user?.token) {
    config.headers.Authorization = user.token;
  }

  return config;
});

export default api;
