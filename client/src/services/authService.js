import API from "./api";

export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};

export const getProfile = () => {
  return API.get("/auth/profile");
};

export const refreshToken = () => {
  return API.post("/auth/refresh-token");
};
