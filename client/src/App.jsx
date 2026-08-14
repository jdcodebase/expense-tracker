import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Income from "./pages/Income";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Expense from "./pages/Expense";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/income/add" element={<AddIncome />} />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />

        <Route path="/income/edit/:id" element={<AddIncome />} />

        <Route path="/expense/add" element={<AddExpense />} />

        <Route path="/expense" element={<Expense />} />

        <Route path="/expense/edit/:id" element={<AddExpense />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
