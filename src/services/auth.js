import axios from "axios";

export const baseURL = "http://localhost:240";
export const apiUrl = `${baseURL}/api/v1`;

export const login = (email, password) => {
  return axios.post(`${apiUrl}/auth/login`, { email, password });
};

export const register = (data) => {
  return axios.post(`${apiUrl}/auth/register`, data);
};

export const activate = (token) => {
  return axios.get(`${apiUrl}/auth/activate/${token}`);
};

export const forgotPassword = (email) => {
  return axios.post(`${apiUrl}/auth/forgot-password`, { email });
};

export const resetPassword = (token, password) => {
  return axios.post(`${apiUrl}/auth/reset-password/${token}`, { password });
};
