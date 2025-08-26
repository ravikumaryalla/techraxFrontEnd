import apiClient from "./apiClient";

export const login = async (email, password) => {
  const response = await apiClient.post("/login", { email, password });
  return response.data;
};

export const register = async (payload) => {
  const { firstName, lastName, email, password } = payload;
  const response = await apiClient.post("/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.get("/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("/me");
  return response.data;
};
