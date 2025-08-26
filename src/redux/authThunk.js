import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register, getUser } from "../service/authService";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const user = await getUser();
  console.log(user, "user in async thunk");
  return user;
});

export const loginThunk = createAsyncThunk("auth/login", async (payload) => {
  const user = await login(payload.email, payload.password);
  return user;
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const user = await logout();
  return user;
});

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload) => {
    const user = await register(payload);
    return user;
  }
);
