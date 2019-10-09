import axios from "axios";
import { baseURL } from "../constants";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
    Authorization: localStorage.getItem("token")
      ? `token ${localStorage.getItem("token")}`
      : ""
  }
});

export default api;
