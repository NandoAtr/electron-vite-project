import axios from "axios";
import os from "os";
import userStore from "../Storage/userStore";
// import CryptoJS from "crypto-js";
// import { ClientJS } from "clientjs";
// const client = new ClientJS();
// const plaintext = client.getUserAgent();
// const key = CryptoJS.lib.WordArray.random(16).toString(); // 32-character hex key for AES-128
// const iv = CryptoJS.lib.WordArray.random(16); // 16-byte initialization vector

// Encrypt the plaintext
// const ciphertext = CryptoJS.AES.encrypt(plaintext, key, {
//   iv: iv,
// }).toString();

// const crypt = `${ciphertext}|${iv}|${key}`;
axios.defaults.baseURL = "http://localhost:3004";

const redirectUri = "http://localhost/callback";

let auth = {
  accessToken: null,
  profile: null,
  refreshToken: null,
};

function getAccessToken() {
  return auth.accessToken;
}

function setAccessToken(newAccessToken: any) {
  auth.accessToken = newAccessToken;
  return auth.accessToken;
}

function setRefreshToken(newRefreshToken: any) {
  auth.refreshToken = newRefreshToken;
  return auth.refreshToken;
}
function getRefreshToken() {
  return auth.refreshToken;
}
function setProfile(newProfile: any) {
  auth.profile = newProfile;
  return auth.profile;
}

// async function refreshTokens() {
//   const refreshToken = await keytar.getPassword(keytarService, keytarAccount);

//   if (refreshToken) {
//     const refreshOptions = {
//       method: "POST",
//       url: `https://${auth0Domain}/oauth/token`,
//       headers: { "content-type": "application/json" },
//       data: {
//         grant_type: "refresh_token",
//         client_id: clientId,
//         refresh_token: refreshToken,
//       },
//     };

//     try {
//       const response = await axios(refreshOptions);

//       accessToken = response.data.access_token;
//       profile = jwtDecode(response.data.id_token);
//     } catch (error) {
//       await logout();

//       throw error;
//     }
//   } else {
//     throw new Error("No available refresh token.");
//   }
// }

async function setTokensBeforeRequest(config: any) {
  const token = getAccessToken(); // Assuming userStore is defined and working
  console.log("setTokensBeforeRequest", token);
  if (token) {
    config.headers = {
      ...config.headers,
      teste: "teste",
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
}

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://localhost:3004";
axiosInstance.interceptors.request.use(setTokensBeforeRequest);

// function getLogOutUrl() {
//   return `https://${auth0Domain}/v2/logout`;
// }

export {
  getAccessToken,
  setAccessToken,
  // getLogOutUrl,
  setRefreshToken,
  getRefreshToken,
  setTokensBeforeRequest,
};
