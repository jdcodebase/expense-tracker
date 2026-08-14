import express from "express";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseById,
} from "../controllers/expense.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all expense routes
router.use(authenticateToken);

// Create expense
router.post("/", createExpense);

// Get all expenses
router.get("/", getExpenses);

router.get("/:id", getExpenseById);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

export default router;
