import mem from "mem";
import { AuthResponse } from "../../@Types/Api";

import { axiosPublic } from "./axios";
const { ipcRenderer } = window.require("electron");
const refreshTokenFn = async () => {
  const storedAccessToken = localStorage.getItem("accessToken");
  const refreshTokenToken = localStorage.getItem("refreshToken");
  try {
    const { data: refreshResponse, status } = await axiosPublic.post(
      "/auth/refresh",
      refreshTokenToken,
      {
        headers: { Authorization: `Bearer ${storedAccessToken}` },
      }
    );

    if (status === 201) {
      localStorage.setItem("accessToken", refreshResponse.accessToken);
      localStorage.setItem("refreshToken", refreshResponse.refreshToken);
    }

    return refreshResponse;
    return {} as AuthResponse;
  } catch (error) {}
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
