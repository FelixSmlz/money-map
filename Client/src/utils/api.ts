import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL + "/register", formData);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const login = async (formData: any) => {
  try {
    const response = await axios.post(API_URL + "/login", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await axios.get(API_URL + "/login/status", {
      withCredentials: true,
    });
    const { loggedIn }: { loggedIn: boolean } = response.data;
    return loggedIn;
  } catch (error: any) {
    return error;
  }
};
