import axios from "axios";

const API_URL = "http://localhost:8000/api";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Accept"] = "application/json";

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

export const deleteProfile = async () => {
  try {
    const response = await axios.delete(API_URL + "/profile", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL + "/transactions", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL + "/budgets", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getGoals = async () => {
  try {
    const response = await axios.get(API_URL + "/goals", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
