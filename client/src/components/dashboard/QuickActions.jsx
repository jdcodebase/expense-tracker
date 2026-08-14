import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        onClick={() => navigate("/income/add")}
        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        + Add Income
      </button>

      <button
        onClick={() => navigate("/income")}
        className="rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        View Income
      </button>

      <button
        onClick={() => navigate("/expense/add")}
        className="rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        + Add Expense
      </button>

      <button
        onClick={() => navigate("/expense")}
        className="rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        View Expense
      </button>
    </div>
  );
};

export default QuickActions;
