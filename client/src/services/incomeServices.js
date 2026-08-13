import API from "./api";

export const addIncome = (incomeData) => {
  return API.post("/income", incomeData);
};

export const getIncome = () => {
  return API.get("/income");
};

export const getIncomeById = (id) => {
  return API.get(`/income/${id}`);
};

export const updateIncome = (id, incomeData) => {
  return API.put(`/income/${id}`, incomeData);
};

export const deleteIncome = (id) => {
  return API.delete(`/income/${id}`);
};
