import axios from "axios";

const API_URL = "http://localhost:8000/api";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.post["Accept"] = "application/json";

// Authentication

export const register = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(API_URL + "/register", formData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const login = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
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
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(API_URL + "/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// User Profile

export const updateProfile = async (
  formData: FormData,
  id: FormDataEntryValue
) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, formData, {
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

// Transactions

export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL + "/transactions", {
      withCredentials: true,
    });
    return response.data.transactions;
  } catch (error: any) {
    return error.response;
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const updateTransaction = async (id: string, formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.put(
      `${API_URL}/transactions/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.delete(`${API_URL}/transactions/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// Budgets

export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL + "/budgets", {
      withCredentials: true,
    });
    return response.data.budgets;
  } catch (error: any) {
    return error.response;
  }
};

export const getBudget = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/budgets/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const updateBudget = async (id: string, formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.put(`${API_URL}/budgets/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteBudget = async (id: string) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.delete(`${API_URL}/budgets/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// Goals

export const getGoals = async () => {
  try {
    const response = await axios.get(API_URL + "/goals", {
      withCredentials: true,
    });
    return response.data.goals;
  } catch (error: any) {
    return error.response;
  }
};

export const getGoal = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/goals/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const updateGoal = async (id: string, formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.put(`${API_URL}/goals/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteGoal = async (id: string) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.delete(`${API_URL}/goals/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// Categories

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories", {
      withCredentials: true,
    });
    return response.data.categories;
  } catch (error: any) {
    return error.response;
  }
};
