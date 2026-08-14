import ExpenseCategoryChart from "../charts/ExpenseCategoryChart";
import MonthlyExpenseChart from "../charts/MonthlyExpenseChart";

const DashboardAnalytics = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Monthly Spending */}
      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="mb-5 border-b border-blue-50 pb-4">
          <h2 className="text-lg font-semibold text-blue-900">
            Monthly Spending
          </h2>

          <p className="mt-1 text-sm text-blue-600">
            Your spending throughout the year
          </p>
        </div>

        <MonthlyExpenseChart />
      </div>

      {/* Expense Categories */}
      <div className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="mb-5 border-b border-purple-50 pb-4">
          <h2 className="text-lg font-semibold text-purple-900">
            Expense Categories
          </h2>

          <p className="mt-1 text-sm text-purple-600">
            Where your money is going
          </p>
        </div>

        <ExpenseCategoryChart />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
