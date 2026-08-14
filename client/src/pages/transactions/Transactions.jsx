import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getIncome } from "../../services/incomeServices";
import { getExpenses } from "../../services/expense.service";

import TransactionFilters from "../../components/transactions/TransactionFilters";
import useTransactionFilters from "../../hooks/useTransactionFilters";

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const {
    search,
    setSearch,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    filteredTransactions,
    clearFilters,
  } = useTransactionFilters(transactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          getIncome(),
          getExpenses(),
        ]);

        const incomes = incomeResponse.data.data || [];
        const expenses = expenseResponse.data.data || [];

        const incomeTransactions = incomes.map((income) => ({
          ...income,
          type: "Income",
        }));

        const expenseTransactions = expenses.map((expense) => ({
          ...expense,
          type: "Expense",
        }));

        const combinedTransactions = [
          ...incomeTransactions,
          ...expenseTransactions,
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(combinedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);

        toast.error(
          error.response?.data?.message || "Failed to fetch transactions.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleEdit = (transaction) => {
    if (transaction.type === "Income") {
      navigate(`/income/edit/${transaction._id}`);
      return;
    }

    navigate(`/expense/edit/${transaction._id}`);
  };

  const handleDelete = async (transaction) => {
    if (deletingId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete this ${transaction.type.toLowerCase()}?`,
    );

    if (!confirmed) return;

    const deleteKey = `${transaction.type}-${transaction._id}`;

    setDeletingId(deleteKey);

    try {
      if (transaction.type === "Income") {
        await deleteIncome(transaction._id);
      } else {
        await deleteExpense(transaction._id);
      }

      setTransactions((prev) =>
        prev.filter(
          (item) =>
            !(item._id === transaction._id && item.type === transaction.type),
        ),
      );

      toast.success(`${transaction.type} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete transaction:", error);

      toast.error(
        error.response?.data?.message ||
          `Failed to delete ${transaction.type.toLowerCase()}.`,
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading transactions...</p>
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
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction History
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View all your income and expense records.
            </p>
          </div>
        </div>

        {/* Filters */}
        <TransactionFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          clearFilters={clearFilters}
        />

        {/* Empty State */}
        {filteredTransactions.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">
              {transactions.length === 0
                ? "No transactions found"
                : "No matching transactions"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {transactions.length === 0
                ? "Your income and expenses will appear here."
                : "Try changing your filters or search term."}
            </p>

            {transactions.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          /* Transactions Table */
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredTransactions.map((transaction) => {
                    const deleteKey = `${transaction.type}-${transaction._id}`;

                    return (
                      <tr
                        key={deleteKey}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-IN",
                          )}
                        </td>

                        {/* Title */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {transaction.title}
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {transaction.category}
                        </td>

                        {/* Amount */}
                        <td
                          className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                            transaction.type === "Income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "Income" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString("en-IN")}
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              transaction.type === "Income"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              title={`Edit ${transaction.type.toLowerCase()}`}
                              onClick={() =>
                                transaction.type === "Income"
                                  ? navigate(`/income/edit/${transaction._id}`)
                                  : navigate(`/expense/edit/${transaction._id}`)
                              }
                              className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              title={`Delete ${transaction.type.toLowerCase()}`}
                              onClick={() => handleDelete(transaction)}
                              disabled={deletingId === deleteKey}
                              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Result Count */}
        {filteredTransactions.length > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
