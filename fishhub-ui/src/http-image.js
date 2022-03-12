import axios from "axios";
axios.defaults.withCredentials = true;
export default axios.create({
  headers: {
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
