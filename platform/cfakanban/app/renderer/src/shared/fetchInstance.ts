import axios from "axios";

const fetchInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false,
});

export default fetchInstance;
