import express from "express";

import {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
  getIncomeById,
} from "../controllers/income.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createIncome);

router.get("/", getIncome);

router.get("/:id", getIncomeById);

router.put("/:id", updateIncome);

router.delete("/:id", deleteIncome);

export default router;
