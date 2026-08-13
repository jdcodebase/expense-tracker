import ExpenseCategoryChart from "../charts/ExpenseCategoryChart";
import MonthlyExpenseChart from "../charts/MonthlyExpenseChart";

const DashboardAnalytics = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Spending
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your spending throughout the year
          </p>
        </div>

        <MonthlyExpenseChart />
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Expense Categories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Where your money is going
          </p>
        </div>

        <ExpenseCategoryChart />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
