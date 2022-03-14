import axios from "axios";
axios.defaults.withCredentials = false;
export default axios.create({
  headers: {
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
