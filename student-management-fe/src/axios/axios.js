import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7231/api",
});

export default api;
