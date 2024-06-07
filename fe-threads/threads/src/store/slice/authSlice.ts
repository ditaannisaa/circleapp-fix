import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/UserType";
import { setAuthToken } from "../../libs/axios-threads";

const initialState: TUser = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  profile_picture: "",
  followers: [],
  following: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);
      console.log("terbaru:", payload);

      const user: TUser = {
        id: payload.user.id,
        full_name: payload.user.full_name,
        username: payload.user.username,
        email: payload.user.email,
        profile_picture: payload.user.profile_picture,
        followers: payload.user.followers,
        following: payload.user.following,
      };
      return user;
    },

    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user: TUser = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        profile_picture: payload.profile_picture,
        followers: payload.followers,
        following: payload.following,
      };
      return user;
    },

    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
