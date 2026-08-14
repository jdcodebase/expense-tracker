import api from "./api";

export const addExpense = async (expenseData) => {
  const response = await api.post("/expense", expenseData);

  return response.data;
};

export const getExpenses = async () => {
  const response = await api.get("/expense");

  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await api.get(`/expense/${id}`);

  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expense/${id}`, expenseData);

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expense/${id}`);

  return response.data;
};
