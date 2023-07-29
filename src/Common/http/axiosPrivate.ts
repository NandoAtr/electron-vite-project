import axios from "axios";
import { AuthResponse } from "../../@Types/Api";
import { memoizedRefreshToken } from "./refreshToken";
import CryptoJS from "crypto-js";
import { ClientJS } from "clientjs";
const { ipcRenderer } = window.require("electron");
const client = new ClientJS();
const plaintext = client.getUserAgent();
const key = CryptoJS.lib.WordArray.random(16).toString(); // 32-character hex key for AES-128
const iv = CryptoJS.lib.WordArray.random(16); // 16-byte initialization vector

// Encrypt the plaintext
const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
  iv: iv,
}).toString();

const crypt = `${ciphertext}|${iv}|${key}`;
axios.defaults.baseURL = "http://localhost:3004";
// const message = await ipcRenderer.invoke("user", "Hello second window!!!!!");

// console.log(message.token);
const storedAccessToken = localStorage.getItem("accessToken");
axios.interceptors.request.use(
  async (config: any) => {
    if (storedAccessToken) {
      config.headers = {
        authorization: `Bearer ${storedAccessToken}`,
        "Content-MD5": crypt,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (
      error?.response?.status === 401 &&
      !config?.sent &&
      error?.response?.data?.message === "Invalid or expired token"
    ) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
