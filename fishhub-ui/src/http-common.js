import axios from "axios";
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
