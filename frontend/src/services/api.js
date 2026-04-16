import axios from "axios";

const api = axios.create({
  baseURL: "https://vend-aqui.onrender.com"
});

export default api;