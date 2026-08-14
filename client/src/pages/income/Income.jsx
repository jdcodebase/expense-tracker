import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { deleteIncome, getIncome } from "../../services/incomeServices";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await getIncome();

        setIncomes(response.data.data);
      } catch (error) {
        console.error("Failed to fetch income:", error);

        toast.error(error.response?.data?.message || "Failed to load income.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const handleDelete = async (id) => {
    if (deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this income?",
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await deleteIncome(id);

      setIncomes((prev) => prev.filter((income) => income._id !== id));

      toast.success("Income deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income.");

      console.error("Failed to delete income:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading income...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              INCOME
            </div>

            <h1 className="text-2xl font-bold text-slate-800">Income</h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage your income records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/income/add")}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <FaPlus />
            Add Income
          </button>
        </div>

        {/* Empty State */}
        {incomes.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-600">
              ₹
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No income records found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Start by adding your first income record.
            </p>

            <button
              type="button"
              onClick={() => navigate("/income/add")}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Add Income
            </button>
          </div>
        ) : (
          /* Income Table */
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="border-b border-emerald-100 bg-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Source
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Notes
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {incomes.map((income) => (
                    <tr
                      key={income._id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {income.title}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {income.source}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(income.date).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                        ₹{income.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-600">
                        {income.notes || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit income"
                            onClick={() =>
                              navigate(`/income/edit/${income._id}`)
                            }
                            className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                          >
                            <FaEdit />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete income"
                            onClick={() => handleDelete(income._id)}
                            disabled={deletingId === income._id}
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

export default Income;
