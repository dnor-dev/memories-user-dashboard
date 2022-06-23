import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = "https://memories-core-service.herokuapp.com";

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create({ ...defaultConfig });

api.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token =
      cookies.get("memories_app") || sessionStorage.getItem("memories_app");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err),
);

export default api;
