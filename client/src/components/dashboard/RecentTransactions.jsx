import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getExpenses } from "../../services/reportServices";
import { getIncome } from "../../services/incomeServices";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          getIncome(),
          getExpenses(),
        ]);

        const incomes = incomeResponse.data.data.map((income) => ({
          id: income._id,
          title: income.title,
          category: income.source,
          amount: income.amount,
          date: income.date,
          type: "income",
        }));

        const expenses = expenseResponse.data.data.map((expense) => ({
          id: expense._id,
          title: expense.title,
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
          type: "expense",
        }));

        const combinedTransactions = [...incomes, ...expenses]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setTransactions(combinedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.error("Unable to load recent transactions.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-400">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h2>

        <p className="mt-4 text-sm text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest income and expenses
          </p>
        </div>

        <button className="text-sm font-medium text-gray-700 hover:text-black">
          View All
        </button>
      </div>

      <div className="divide-y">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between px-5 py-4"
          >
            <div>
              <p className="font-medium text-gray-900">{transaction.title}</p>

              <p className="mt-1 text-sm text-gray-500">
                {transaction.category} ·{" "}
                {new Date(transaction.date).toLocaleDateString("en-IN")}
              </p>
            </div>

            <p
              className={`font-semibold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}₹
              {transaction.amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
