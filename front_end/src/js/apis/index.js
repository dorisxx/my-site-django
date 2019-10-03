import axios from "axios";
import { baseURL } from "../constants";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "X-CSRFToken": window.reactStuff.csrftoken,
    Authorization: localStorage.getItem("token")
      ? `token ${localStorage.getItem("token")}`
      : ""
  }
});

export default api;
