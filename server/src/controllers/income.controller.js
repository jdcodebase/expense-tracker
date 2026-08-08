import Income from "../models/income.model.js";
import ApiError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Income
export const createIncome = asyncHandler(async (req, res) => {
  const { title, amount, source, date, notes } = req.body;

  if (!title || amount === undefined || !source) {
    throw new ApiError(400, "Title, amount, and source are required.");
  }

  if (amount < 0) {
    throw new ApiError(400, "Amount cannot be negative.");
  }

  const income = await Income.create({
    userId: req.user._id,
    title: title.trim(),
    amount,
    source: source.trim(),
    date: date || Date.now(),
    notes: notes?.trim() || "",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, income, "Income added successfully."));
});

// Get All Income
export const getIncome = asyncHandler(async (req, res) => {
  const income = await Income.find({
    userId: req.user._id,
  }).sort({ date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, income, "Income fetched successfully."));
});

// Get Single Income
export const getIncomeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const income = await Income.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!income) {
    throw new ApiError(404, "Income not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, income, "Income fetched successfully."));
});

// Update Income
export const updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, amount, source, date, notes } = req.body;

  const income = await Income.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!income) {
    throw new ApiError(404, "Income not found.");
  }

  if (amount !== undefined && amount < 0) {
    throw new ApiError(400, "Amount cannot be negative.");
  }

  if (title !== undefined) {
    income.title = title.trim();
  }

  if (amount !== undefined) {
    income.amount = amount;
  }

  if (source !== undefined) {
    income.source = source.trim();
  }

  if (date !== undefined) {
    income.date = date;
  }

  if (notes !== undefined) {
    income.notes = notes.trim();
  }

  await income.save();

  return res
    .status(200)
    .json(new ApiResponse(200, income, "Income updated successfully."));
});

// Delete Income
export const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const income = await Income.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!income) {
    throw new ApiError(404, "Income not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Income deleted successfully."));
});
