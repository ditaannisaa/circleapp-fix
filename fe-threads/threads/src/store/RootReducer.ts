import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../store/slice/authSlice";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

const RootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default RootReducer;
