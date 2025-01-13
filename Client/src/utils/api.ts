import axios from "axios";

const API_URL = "http://localhost:8000/api";

axios.defaults.withCredentials = true;

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL + "/register", formData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const login = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL + "/login", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await axios.get(API_URL + "/login/status", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return { isLoggedIn: false, user: null };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(API_URL + "/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
