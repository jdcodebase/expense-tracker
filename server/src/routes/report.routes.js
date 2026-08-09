import express from "express";

import {
  getExpenseByCategory,
  getMonthlyExpenseTrend,
  getMonthlyReport,
} from "../controllers/report.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all report routes
router.use(authenticateToken);

// Monthly financial report
router.get("/monthly", getMonthlyReport);
router.get("/expense-by-category", getExpenseByCategory);
router.get("/monthly-expense-trend", getMonthlyExpenseTrend);

export default router;
