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
    },
    {
      title: "Total Expense",
      value: summary.totalExpenses,
    },
    {
      title: "Total Savings",
      value: summary.savings,
    },
    {
      title: "Current Balance",
      value: summary.currentBalance,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">{card.title}</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "Loading..." : `₹${card.value.toLocaleString("en-IN")}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
