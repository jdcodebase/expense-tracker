import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import env from "./config/env.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRoutes from "./routes/auth.route.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/reports", reportRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
