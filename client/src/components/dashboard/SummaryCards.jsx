import { useEffect, useState } from "react";
import { getMonthlyReport } from "../../services/reportServices";

const SummaryCards = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    currentBalance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const currentDate = new Date();

        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const response = await getMonthlyReport(month, year);

        const report = response.data.data;

        setSummary({
          totalIncome: report.totalIncome,
          totalExpenses: report.totalExpenses,
          savings: report.savings,
          currentBalance: report.totalIncome - report.totalExpenses,
        });
      } catch (error) {
        console.error("Failed to fetch monthly report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReport();
  }, []);

  const cards = [
    {
      title: "Total Income",
      value: summary.totalIncome,
      className: "border-emerald-200 bg-emerald-50",
      titleClass: "text-emerald-700",
      valueClass: "text-emerald-900",
    },
    {
      title: "Total Expense",
      value: summary.totalExpenses,
      className: "border-red-200 bg-red-50",
      titleClass: "text-red-700",
      valueClass: "text-red-900",
    },
    {
      title: "Total Savings",
      value: summary.savings,
      className: "border-blue-200 bg-blue-50",
      titleClass: "text-blue-700",
      valueClass: "text-blue-900",
    },
    {
      title: "Current Balance",
      value: summary.currentBalance,
      className: "border-indigo-200 bg-indigo-50",
      titleClass: "text-indigo-700",
      valueClass: "text-indigo-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${card.className}`}
        >
          <p className={`text-sm font-semibold ${card.titleClass}`}>
            {card.title}
          </p>

          <p className={`mt-2 text-2xl font-bold ${card.valueClass}`}>
            {loading ? "Loading..." : `₹${card.value.toLocaleString("en-IN")}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
