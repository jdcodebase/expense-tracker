import Income from "../models/income.model.js";
import ApiError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Expense from "../models/expense.model.js";

export const getMonthlyReport = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    throw new ApiError(400, "Month and year are required.");
  }

  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (
    monthNumber < 1 ||
    monthNumber > 12 ||
    !Number.isInteger(monthNumber) ||
    !Number.isInteger(yearNumber)
  ) {
    throw new ApiError(400, "Invalid month or year.");
  }

  const startDate = new Date(yearNumber, monthNumber - 1, 1);
  const endDate = new Date(yearNumber, monthNumber, 1);

  const result = await Income.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalIncome = result[0]?.totalIncome || 0;

  const expenseResult = await Expense.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalExpenses: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalExpenses = expenseResult[0]?.totalExpenses || 0;

  const savings = totalIncome - totalExpenses;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        month: monthNumber,
        year: yearNumber,
        totalIncome,
        totalExpenses,
        savings,
      },
      "Monthly report fetched successfully.",
    ),
  );
});

export const getExpenseByCategory = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    throw new ApiError(400, "Month and year are required.");
  }

  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (
    monthNumber < 1 ||
    monthNumber > 12 ||
    !Number.isInteger(monthNumber) ||
    !Number.isInteger(yearNumber)
  ) {
    throw new ApiError(400, "Invalid month or year.");
  }

  const startDate = new Date(yearNumber, monthNumber - 1, 1);
  const endDate = new Date(yearNumber, monthNumber, 1);

  const result = await Expense.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        month: monthNumber,
        year: yearNumber,
        categories: result,
      },
      "Expense category report fetched successfully.",
    ),
  );
});

export const getMonthlyExpenseTrend = asyncHandler(async (req, res) => {
  const { year } = req.query;

  if (!year) {
    throw new ApiError(400, "Year is required.");
  }

  const yearNumber = Number(year);

  if (!Number.isInteger(yearNumber)) {
    throw new ApiError(400, "Invalid year.");
  }

  const startDate = new Date(yearNumber, 0, 1);
  const endDate = new Date(yearNumber + 1, 0, 1);

  const result = await Expense.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalExpenses: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        year: yearNumber,
        monthlyExpenses: result,
      },
      "Monthly expense trend fetched successfully.",
    ),
  );
});
