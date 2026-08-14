import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  addExpense,
  updateExpense,
  getExpenseById,
} from "../services/expense.service";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingExpense, setFetchingExpense] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchExpense = async () => {
      setFetchingExpense(true);

      try {
        const response = await getExpenseById(id);
        const expense = response.data;

        if (!expense) {
          toast.error("Expense not found.");
          navigate("/expense");
          return;
        }

        setFormData({
          title: expense.title || "",
          amount: expense.amount || "",
          category: expense.category || "",
          date: expense.date
            ? new Date(expense.date).toISOString().split("T")[0]
            : "",
          paymentMethod: expense.paymentMethod || "",
          notes: expense.notes || "",
        });
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message || "Failed to fetch expense.",
        );

        navigate("/expense");
      } finally {
        setFetchingExpense(false);
      }
    };

    fetchExpense();
  }, [id, isEditMode, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const { title, amount, category, date, paymentMethod, notes } = formData;

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!amount) {
      toast.error("Amount is required.");
      return;
    }

    if (!category) {
      toast.error("Category is required.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Payment method is required.");
      return;
    }

    setLoading(true);

    try {
      const expenseData = {
        title: title.trim(),
        amount: Number(amount),
        category,
        date,
        paymentMethod,
        notes: notes.trim(),
      };

      if (isEditMode) {
        await updateExpense(id, expenseData);

        toast.success("Expense updated successfully.");
      } else {
        await addExpense(expenseData);

        toast.success("Expense added successfully.");
      }

      navigate("/expense");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} expense.`,
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingExpense) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading expense...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/expense")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Expense
        </button>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Expense" : "Add Expense"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {isEditMode
                ? "Update your expense record."
                : "Record a new expense."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Train Ticket"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Amount
              </label>

              <div className="relative">
                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>

              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="4"
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? isEditMode
                  ? "Updating Expense..."
                  : "Adding Expense..."
                : isEditMode
                  ? "Update Expense"
                  : "Add Expense"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
