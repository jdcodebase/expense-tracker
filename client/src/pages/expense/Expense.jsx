import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { deleteExpense, getExpenses } from "../../services/expense.service";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();

        setExpenses(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);

        toast.error(
          error.response?.data?.message || "Failed to fetch expenses.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await deleteExpense(id);

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));

      toast.success("Expense deleted successfully.");
    } catch (error) {
      console.error("Failed to delete expense:", error);

      toast.error(error.response?.data?.message || "Failed to delete expense.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage your expense records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/expense/add")}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <FaPlus />
            Add Expense
          </button>
        </div>

        {/* Empty State */}
        {expenses.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">
              No expense records found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first expense record.
            </p>

            <button
              type="button"
              onClick={() => navigate("/expense/add")}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Add Expense
            </button>
          </div>
        ) : (
          /* Expense Table */
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Payment Method
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Notes
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {expenses.map((expense) => (
                    <tr
                      key={expense._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Title */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {expense.title}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {expense.category}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(expense.date).toLocaleDateString("en-IN")}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-sm font-semibold text-red-600">
                        ₹{expense.amount.toLocaleString("en-IN")}
                      </td>

                      {/* Payment Method */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {expense.paymentMethod}
                      </td>

                      {/* Notes */}
                      <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">
                        {expense.notes || "-"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit expense"
                            onClick={() =>
                              navigate(`/expense/edit/${expense._id}`)
                            }
                            className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                          >
                            <FaEdit />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete expense"
                            onClick={() => handleDelete(expense._id)}
                            disabled={deletingId === expense._id}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
