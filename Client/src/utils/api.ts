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

export const updateProfile = async (id: string, formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.put(`${API_URL}/user/${id}`, formData, {
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

export const changePassword = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/change-password`,
      {
        oldPassword: formData.get("oldPassword"),
        newPassword: formData.get("newPassword"),
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error("Change password error:", error.response);
    throw error;
  }
};
// Transactions

export const getTransactions = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/transactions?page=${page}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${id}`, {
      withCredentials: true,
    });
    return response.data.transaction;
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

export const createTransaction = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(`${API_URL}/transactions`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createBudget = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(`${API_URL}/budgets`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createCategory = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(`${API_URL}/categories`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const createGoal = async (formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.post(`${API_URL}/goals`, formData, {
      withCredentials: true,
    });
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

export const getMonthlySpending = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/monthly-spending`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const getDailyBalances = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions/daily-balances`, {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error: any) {
    return error.response;
  }
};

// Budgets

export const getBudgets = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/budgets?page=${page}`, {
      withCredentials: true,
    });
    return response.data.data;
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

export const getGoals = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/goals?page=${page}`, {
      withCredentials: true,
    });
    return response.data.data;
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

export const getCategories = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/categories?page=${page}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`, {
      withCredentials: true,
    });
    return response.data.category;
  } catch (error: any) {
    return error.response;
  }
};

export const updateCategory = async (id: string, formData: FormData) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.put(`${API_URL}/categories/${id}`, formData, {
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

export const deleteCategory = async (id: string) => {
  try {
    await axios.get(API_URL + "/sanctum/csrf-cookie");
    const response = await axios.delete(`${API_URL}/categories/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// Notifications

export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL + "/notifications", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const getUnreadNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications/unread`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    const response = await axios.put(`${API_URL}/notifications/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const toggleNotifications = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/user/toggle-notifications`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
