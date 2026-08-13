import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  addIncome,
  getIncomeById,
  updateIncome,
} from "../services/incomeServices";

const AddIncome = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    source: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingIncome, setFetchingIncome] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchIncome = async () => {
      setFetchingIncome(true);

      try {
        const response = await getIncomeById(id);
        const income = response.data.data;

        setFormData({
          title: income.title || "",
          amount: income.amount || "",
          date: income.date
            ? new Date(income.date).toISOString().split("T")[0]
            : "",
          source: income.source || "",
          notes: income.notes || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch income.");

        navigate("/income");
      } finally {
        setFetchingIncome(false);
      }
    };

    fetchIncome();
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

    const { title, amount, date, source, notes } = formData;

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!amount) {
      toast.error("Amount is required.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    setLoading(true);

    try {
      const incomeData = {
        title: title.trim(),
        amount: Number(amount),
        date,
        source: source.trim(),
        notes: notes.trim(),
      };

      if (isEditMode) {
        await updateIncome(id, incomeData);

        toast.success("Income updated successfully.");
      } else {
        await addIncome(incomeData);

        toast.success("Income added successfully.");
      }

      navigate("/income");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} income.`,
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingIncome) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading income...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/income")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Income
        </button>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Income" : "Add Income"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {isEditMode
                ? "Update your income record."
                : "Record a new source of income."}
            </p>
          </div>

          {/* Form */}
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
                placeholder="e.g. Monthly Salary"
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

            {/* Source */}
            <div>
              <label
                htmlFor="source"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Source
              </label>

              <input
                id="source"
                name="source"
                type="text"
                placeholder="e.g. Salary, Freelance, Business"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
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
                  ? "Updating Income..."
                  : "Adding Income..."
                : isEditMode
                  ? "Update Income"
                  : "Add Income"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
