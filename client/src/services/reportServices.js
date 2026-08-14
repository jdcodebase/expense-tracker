import API from "./api";

export const getMonthlyReport = (month, year) => {
  return API.get("/reports/monthly", {
    params: {
      month,
      year,
    },
  });
};

export const getExpenseByCategory = (month, year) => {
  return API.get("/reports/expense-by-category", {
    params: {
      month,
      year,
    },
  });
};

export const getMonthlyExpenseTrend = (year) => {
  return API.get("/reports/monthly-expense-trend", {
    params: {
      year,
    },
  });
};
