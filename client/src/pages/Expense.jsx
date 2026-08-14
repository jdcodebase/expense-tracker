import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deleteExpense, getExpenses } from "../services/expense.service";

const Expense = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await getExpenses();

      setExpenses(response.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch expenses.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) return;

    try {
      await deleteExpense(id);

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));

      toast.success("Expense deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense.");

      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your expenses.</p>
          </div>

          <button
            onClick={() => navigate("/expense/add")}
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Add Expense
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">No expenses found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Title
                    </th>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Category
                    </th>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Payment Method
                    </th>
                    <th className="px-5 py-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id} className="border-b last:border-b-0">
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {expense.title}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {expense.category}
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-900">
                        ₹{expense.amount}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {expense.paymentMethod}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/expense/edit/${expense._id}`)
                            }
                            className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(expense._id)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
