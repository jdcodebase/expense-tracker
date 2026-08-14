import Expense from "../models/expense.model.js";
import ApiError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create Expense
export const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, date, paymentMethod, notes } = req.body;

  if (!title || amount === undefined || !category || !paymentMethod) {
    throw new ApiError(
      400,
      "Title, amount, category, and payment method are required.",
    );
  }

  if (amount < 0) {
    throw new ApiError(400, "Amount cannot be negative.");
  }

  const expense = await Expense.create({
    userId: req.user._id,
    title: title.trim(),
    amount,
    category,
    date: date || Date.now(),
    paymentMethod,
    notes: notes?.trim() || "",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense added successfully."));
});

// Get All Expenses
export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({
    userId: req.user._id,
  }).sort({ date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully."));
});

export const getExpenseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense fetched successfully."));
});

// Update Expense
export const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, amount, category, date, paymentMethod, notes } = req.body;

  const expense = await Expense.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  if (amount !== undefined && amount < 0) {
    throw new ApiError(400, "Amount cannot be negative.");
  }

  if (title !== undefined) {
    expense.title = title.trim();
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (date !== undefined) {
    expense.date = date;
  }

  if (paymentMethod !== undefined) {
    expense.paymentMethod = paymentMethod;
  }

  if (notes !== undefined) {
    expense.notes = notes.trim();
  }

  await expense.save();

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully."));
});

// Delete Expense
export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Expense deleted successfully."));
});
