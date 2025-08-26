import axios from "axios";

const baseUrl = import.meta.env.VITE_APIBASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default apiClient;
