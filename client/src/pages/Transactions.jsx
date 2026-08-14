import { useEffect, useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getIncome } from "../services/incomeServices";
import { getExpenses } from "../services/expense.service";

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          getIncome(),
          getExpenses(),
        ]);

        const incomes = incomeResponse.data.data || [];
        const expenses = expenseResponse.data || [];

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
        console.error(error);

        toast.error(
          error.response?.data?.message || "Failed to fetch transactions.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction History
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage all your income and expenses.
            </p>
          </div>
        </div>

        {/* Filters UI - functionality later */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Type */}
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            {/* Category */}
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>

            {/* Date */}
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Empty State */}
          {transactions.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">No transactions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Date
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Title
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Category
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Amount
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Type
                    </th>

                    <th className="px-5 py-4 text-right font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={`${transaction.type}-${transaction._id}`}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>

                      {/* Title */}
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {transaction.title}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 text-gray-600">
                        {transaction.type === "Income"
                          ? transaction.source
                          : transaction.category}
                      </td>

                      {/* Amount */}
                      <td
                        className={`whitespace-nowrap px-5 py-4 font-semibold ${
                          transaction.type === "Income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Income" ? "+" : "-"}₹
                        {transaction.amount}
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
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
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              transaction.type === "Income"
                                ? navigate(`/income/edit/${transaction._id}`)
                                : navigate(`/expense/edit/${transaction._id}`)
                            }
                            className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
