import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {/* Add Income */}
      <button
        onClick={() => navigate("/income/add")}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        + Add Income
      </button>

      {/* View Income */}
      <button
        onClick={() => navigate("/income")}
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
      >
        View Income
      </button>

      {/* Add Expense */}
      <button
        onClick={() => navigate("/expense/add")}
        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
      >
        + Add Expense
      </button>

      {/* View Expense */}
      <button
        onClick={() => navigate("/expense")}
        className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
      >
        View Expense
      </button>

      {/* View All Transactions */}
      <button
        onClick={() => navigate("/transactions")}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        View All Transactions
      </button>
    </div>
  );
};

export default QuickActions;
