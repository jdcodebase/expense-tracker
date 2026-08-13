import { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getMonthlyExpenseTrend } from "../../services/reportServices";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyExpenseChart = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyExpenseTrend = async () => {
      try {
        const year = new Date().getFullYear();

        const response = await getMonthlyExpenseTrend(year);

        setMonthlyExpenses(response.data.data.monthlyExpenses);
      } catch (error) {
        console.error("Failed to fetch monthly expense trend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpenseTrend();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: monthlyExpenses.map((item) => monthNames[item._id.month - 1]),

    datasets: [
      {
        label: "Expenses",
        data: monthlyExpenses.map((item) => item.totalExpenses),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyExpenseChart;
