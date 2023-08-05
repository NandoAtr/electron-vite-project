import axios from "axios";
import { AuthResponse } from "../../@Types/Api";
import { memoizedRefreshToken } from "./refreshToken";
import CryptoJS from "crypto-js";
import { ClientJS } from "clientjs";
const { ipcRenderer: ipcRenderer$3 } = window.require('electron');

const client = new ClientJS();

const main = async () => {
  const plaintext = await ipcRenderer$3.invoke('userAgent');
  const key = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt the plaintext
  const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
  }).toString();

  const crypt = `${ciphertext}|${iv}|${key}`;

  axios.defaults.baseURL = "https://api.webspy.com.br";

  const storedAccessToken = localStorage.getItem("accessToken");
  axios.interceptors.request.use(
    async (config:any) => {
      if (storedAccessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${storedAccessToken}`,
          "Content-MD5": crypt,
        };
      } else {
        config.headers = {
          ...config.headers,
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

        // If you are using memoizedRefreshToken, provide its implementation here
        // const result = await memoizedRefreshToken();

        // if (result?.accessToken) {
        //   config.headers = {
        //     authorization: `Bearer ${result?.accessToken}`,
        //   };
        // }

        return axios(config);
      }
      return Promise.reject(error);
    }
  );
};

main();

export const axiosPrivate = axios;
