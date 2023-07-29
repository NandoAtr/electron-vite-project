import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://api.webspy.com.br/",
  headers: {
    "Content-Type": "application/json",
  },
});