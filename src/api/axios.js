import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // change to your backend URL
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // use if your backend uses cookies (e.g., auth sessions)
});

export default axiosInstance;
