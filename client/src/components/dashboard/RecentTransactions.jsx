import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getIncome } from "../../services/incomeServices";
import { getExpenses } from "../../services/expense.service";

const RecentTransactions = () => {
  const navigate = useNavigate();

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
        toast.error("Unable to load recent transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-400">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Transactions
        </h2>

        <p className="mt-4 text-sm text-slate-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest income and expenses
          </p>
        </div>

        <button
          onClick={() => navigate("/transactions")}
          className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
        >
          View All
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.map((transaction) => (
          <div
            key={`${transaction.type}-${transaction.id}`}
            className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                  transaction.type === "income"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  {transaction.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {transaction.category} ·{" "}
                  {new Date(transaction.date).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            <p
              className={`font-semibold ${
                transaction.type === "income"
                  ? "text-emerald-600"
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
