import API from "./api";

export const addExpense = (expenseData) => {
  return API.post("/expense", expenseData);
};

export const getExpenses = () => {
  return API.get("/expense");
};

export const getExpenseById = (id) => {
  return API.get(`/expense/${id}`);
};

export const updateExpense = (id, expenseData) => {
  return API.put(`/expense/${id}`, expenseData);
};

export const deleteExpense = (id) => {
  return API.delete(`/expense/${id}`);
};
