import axios from "axios";

const apiClient = axios.create({
  baseURL: "/admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
