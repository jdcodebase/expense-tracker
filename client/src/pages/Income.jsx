import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { deleteIncome, getIncome } from "../services/incomeServices";

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
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading income...</p>
      </div>
    );
  }

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

      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Income</h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage your income records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/income/add")}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <FaPlus />
            Add Income
          </button>
        </div>

        {/* Empty State */}
        {incomes.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">
              No income records found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first income record.
            </p>

            <button
              type="button"
              onClick={() => navigate("/income/add")}
              className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add Income
            </button>
          </div>
        ) : (
          /* Income Table */
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5 text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Source
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Amount
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
                  {incomes.map((income) => (
                    <tr
                      key={income._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {income.title}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {income.source}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(income.date).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        ₹{income.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">
                        {income.notes || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
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
